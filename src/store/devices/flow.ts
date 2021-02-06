import { PermissionsAndroid } from 'react-native';
import { eventChannel, SagaIterator } from 'redux-saga';
import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
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
import { DevicesActionTypes } from './models';
import { flattenArray } from '../../utils/flattenArray';
import { selectDevicesList } from './selectors';
import { select } from '../../utils/typedSelect';
import { StateChangeEvent } from 'react-native-bluetooth-classic/lib/BluetoothEvent';

function* requestLocationPermissionFlow(): SagaIterator {
  yield takeLatest(
    DevicesActionTypes.REQUEST_LOCATION_PERMISSION_ANDROID,
    function* () {
      const granted = yield call(async () => {
        // TODO: check if we need to resolve promise here
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'We need permission to access your location.',
            message:
              'This allows us to scan for the bluetooth temperature sensor.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
      });

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        yield put(setIsLocationPermissionGranted(true));
      } else {
        yield put(setIsLocationPermissionGranted(false));
      }
    },
  );
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

    const devices = yield call(async () => {
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

const stopScanningFlow = function* () {
  yield call(async () => await RNBluetoothClassic.cancelDiscovery());

  yield put(setIsScanning(false));
};

function* stopScanningForDevicesFlow(): SagaIterator {
  yield takeLatest(DevicesActionTypes.STOP_SCANNING_FOR_DEVICES, function* () {
    yield call(stopScanningFlow);
  });
}

function* connectToDeviceFlow(): SagaIterator {
  yield takeLatest(
    DevicesActionTypes.CONNECT_TO_DEVICE,
    function* (action: ReturnType<typeof connectToDevice>) {
      const { deviceId } = action.payload;
      yield put(setDeviceConnecting(deviceId, true));

      yield call(stopScanningFlow);

      const devices = yield* select(selectDevicesList);

      try {
        // if the user has not already paired to the device, pair and then connect
        if (!devices[deviceId].bonded) {
          console.log(`Pairing to: ${deviceId}...`);
          yield call(async () => await RNBluetoothClassic.pairDevice(deviceId));
        }

        console.log(`Connecting to: ${deviceId}...`);
        yield call(
          async () =>
            await RNBluetoothClassic.connectToDevice(deviceId, {
              delimiter: ';',
            }),
        );

        yield put(setDeviceConnected(deviceId, true));
      } catch (error) {
        console.log(error);
      }

      // set connecting to false regardless of error
      yield put(setDeviceConnecting(deviceId, false));
    },
  );
}

function* disconnectFromDeviceFlow(): SagaIterator {
  yield takeLatest(
    DevicesActionTypes.DISCONNECT_FROM_DEVICE,
    function* (action: ReturnType<typeof disconnectFromDevice>) {
      yield call(stopScanningFlow);

      const { deviceId } = action.payload;

      try {
        yield call(async () => {
          await RNBluetoothClassic.disconnectFromDevice(deviceId);
        });
      } catch (error) {
        console.log(error);
      }

      // set connecting to false regardless of error
      yield put(setDeviceConnected(deviceId, false));
    },
  );
}

export function* devicesFlow(): SagaIterator {
  yield fork(requestLocationPermissionFlow);
  yield fork(checkBluetoothStateFlow);
  yield fork(listenForBluetoothStateChangesFlow);
  yield fork(scanForDevicesFlow);
  yield fork(stopScanningForDevicesFlow);
  yield fork(connectToDeviceFlow);
  yield fork(disconnectFromDeviceFlow);
}
