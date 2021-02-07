import { PermissionsAndroid } from 'react-native';
import { eventChannel, SagaIterator } from 'redux-saga';
import {
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import {
  connectToDevice,
  setDeviceConnected,
  setDeviceConnecting,
  setDevices,
  setIsBluetoothEnabled,
  setIsLocationPermissionGranted,
  setIsScanning,
  disconnectFromDevice,
} from './actions';
import { Device, DeviceId, DevicesActionTypes } from './models';
import { flattenArray } from '../../utils/flattenArray';
import {
  selectConnectedDevice,
  selectDeviceById,
  selectDevicesList,
  selectIsScanning,
} from './selectors';
import { select } from '../../utils/typedSelect';
import { StateChangeEvent } from 'react-native-bluetooth-classic/lib/BluetoothEvent';
import { setLatestTemperatureReading } from '../temperature/actions';
import { REHYDRATE } from 'redux-persist';
import { ApplicationState } from '../reducers';
import { showSnackbar } from '../snackbar/actions';

function* requestLocationPermissionFlow(): SagaIterator {
  yield takeLatest(REHYDRATE, function* () {
    const granted = yield call(
      async () =>
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'We need permission to access your location.',
            message:
              'This allows us to scan for the bluetooth temperature sensor.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        ),
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      yield put(setIsLocationPermissionGranted(true));
    } else {
      yield put(setIsLocationPermissionGranted(false));
    }
  });
}

function* checkBluetoothStateFlow(): SagaIterator {
  yield takeLatest(DevicesActionTypes.CHECK_BLUETOOTH_STATE, function* () {
    const enabled = yield call(async () => {
      return await RNBluetoothClassic.isBluetoothEnabled();
    });

    yield put(setIsBluetoothEnabled(enabled));
  });
}

const bluetoothStateChangeChannel = () => {
  return eventChannel((emit): any => {
    const bluetoothStateChangeListener = RNBluetoothClassic.onStateChanged(
      (event: StateChangeEvent) => {
        emit(event.enabled);
      },
    );

    // The subscriber must return an unsubscribe function
    return () => bluetoothStateChangeListener.remove();
  });
};

function* listenForBluetoothStateChangesFlow(): SagaIterator {
  yield takeLatest(
    DevicesActionTypes.LISTEN_FOR_BLUETOOTH_STATE_CHANGES,
    function* () {
      const channel = yield call(bluetoothStateChangeChannel);

      while (true) {
        const isBluetoothEnabled = yield take(channel);

        yield put(setIsBluetoothEnabled(isBluetoothEnabled));
      }
    },
  );
}

function* scanForDevicesFlow(): SagaIterator {
  yield takeLatest(DevicesActionTypes.SCAN_FOR_DEVICES, function* () {
    yield put(setIsScanning(true));

    const devices: Device[] = yield call(async () => {
      const unpaired = await RNBluetoothClassic.startDiscovery();
      const paired = await RNBluetoothClassic.getBondedDevices();
      const connected = await RNBluetoothClassic.getConnectedDevices();

      // unpaired, paired and connected can be BluetoothDevice || BluetoothDevice[] so flatten them in case
      const allDevices = [
        ...flattenArray(unpaired),
        ...flattenArray(paired),
        ...flattenArray(connected),
      ] as BluetoothDevice[];

      return allDevices;
    });

    yield put(setDevices(devices));
    yield put(setIsScanning(false));
  });
}

const stopScanningForDevicesSaga = function* () {
  yield call(async () => await RNBluetoothClassic.cancelDiscovery());

  yield put(setIsScanning(false));
};

function* stopScanningForDevicesFlow(): SagaIterator {
  yield takeLatest(DevicesActionTypes.STOP_SCANNING_FOR_DEVICES, function* () {
    yield call(stopScanningForDevicesSaga);
  });
}

const deviceDataChannel = (device: BluetoothDevice) => {
  return eventChannel((emit): any => {
    device.onDataReceived((event) => {
      emit(event);
    });

    // The subscriber must return an unsubscribe function
    return () => {};
  });
};

const BLUETOOTH_EVENT_DATA_DELIMITER = ';';

function* listenForDeviceDataChannel(device: BluetoothDevice): SagaIterator {
  const channel = yield call(deviceDataChannel, device);

  yield takeEvery(
    channel,
    function* (event: { timestamp: string; data: string }) {
      yield put(
        setLatestTemperatureReading({
          timestamp: event.timestamp,
          value: parseInt(
            event.data.replace(BLUETOOTH_EVENT_DATA_DELIMITER, ''),
            10,
          ), // remove delimiter
          deviceId: device.id,
        }),
      );
    },
  );

  // close the channel when we disconnect from the device
  yield take(DevicesActionTypes.DISCONNECT_FROM_DEVICE);

  channel.close();
}

function* connectToDeviceSaga(deviceId: DeviceId): SagaIterator {
  yield put(setDeviceConnecting(deviceId, true));

  // if scanning, stop
  const isScanning = yield* select(selectIsScanning);

  if (isScanning) {
    yield call(stopScanningForDevicesSaga);
  }

  const selectedDevice = yield* select((state: ApplicationState) =>
    selectDeviceById(state, deviceId),
  );

  try {
    // if the user has not already paired to the device, pair and then connect
    if (!selectedDevice.bonded) {
      yield call(async () => await RNBluetoothClassic.pairDevice(deviceId));
    }

    const device: BluetoothDevice = yield call(
      async () =>
        await RNBluetoothClassic.connectToDevice(deviceId, {
          delimiter: BLUETOOTH_EVENT_DATA_DELIMITER,
        }),
    );

    yield put(setDeviceConnecting(deviceId, false));

    yield put(setDeviceConnected(deviceId, true));

    // listen for data changes (do everything before this call otherwise it won't be reached)
    yield call(listenForDeviceDataChannel, device);
  } catch (error) {
    // this type of error is trying to connect but it's already connected, which causes a disconnect, so we need to retry
    if (error.message.includes('read failed')) {
      yield put(setDeviceConnected(deviceId, false));

      yield call(connectToDeviceSaga, deviceId);
    } else {
      yield put(showSnackbar(error.message));

      yield put(setDeviceConnecting(deviceId, false));
    }
  }
}

function* connectToDeviceFlow(): SagaIterator {
  yield takeLatest(
    DevicesActionTypes.CONNECT_TO_DEVICE,
    function* (action: ReturnType<typeof connectToDevice>) {
      yield call(connectToDeviceSaga, action.payload.deviceId);
    },
  );
}

function* disconnectFromDeviceFlow(): SagaIterator {
  yield takeLatest(
    DevicesActionTypes.DISCONNECT_FROM_DEVICE,
    function* (action: ReturnType<typeof disconnectFromDevice>) {
      // if scanning, stop
      const isScanning = yield* select(selectIsScanning);

      if (isScanning) {
        yield call(stopScanningForDevicesSaga);
      }

      const { deviceId } = action.payload;

      try {
        yield call(async () => {
          await RNBluetoothClassic.disconnectFromDevice(deviceId);
        });
      } catch (error) {
        yield put(showSnackbar(error.message));
      }

      // set connecting to false regardless of error
      yield put(setDeviceConnected(deviceId, false));
    },
  );
}

function* onRehydrateFlow(): SagaIterator {
  yield takeLatest(REHYDRATE, function* () {
    // on rehydrate, if there is a connected device, try and connect to it
    const connectedDevice = yield* select(selectConnectedDevice);

    if (connectedDevice) {
      yield call(connectToDeviceSaga, connectedDevice.id);
    }
  });
}

export function* devicesFlow(): SagaIterator {
  yield fork(requestLocationPermissionFlow);
  yield fork(checkBluetoothStateFlow);
  yield fork(listenForBluetoothStateChangesFlow);
  yield fork(scanForDevicesFlow);
  yield fork(stopScanningForDevicesFlow);
  yield fork(connectToDeviceFlow);
  yield fork(disconnectFromDeviceFlow);
  yield fork(onRehydrateFlow);
}
