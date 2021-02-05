import { PermissionsAndroid } from 'react-native';
import { SagaIterator } from 'redux-saga';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import {
  connectToDevice,
  setDevices,
  setIsBluetoothEnabled,
  setIsLocationPermissionGranted,
  setIsScanning,
  stopScanningForDevices,
} from './actions';
import { DevicesActionTypes } from './models';
import { flattenArray } from '../../utils/flattenArray';

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

function* checkBluetoothEnabledFlow(): SagaIterator {
  yield takeLatest(DevicesActionTypes.CHECK_BLUETOOTH_ENABLED, function* () {
    const enabled = yield call(async () => {
      return await RNBluetoothClassic.isBluetoothEnabled();
    });

    yield put(setIsBluetoothEnabled(enabled));
  });
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

function* stopScanningForDevicesFlow(): SagaIterator {
  yield takeLatest(DevicesActionTypes.STOP_SCANNING_FOR_DEVICES, function* () {
    yield call(async () => {
      await RNBluetoothClassic.cancelDiscovery();
    });

    yield put(setIsScanning(false));
  });
}

function* connectToDeviceFlow(): SagaIterator {
  yield takeLatest(
    DevicesActionTypes.CONNECT_TO_DEVICE,
    function* (action: typeof connectToDevice) {
      // cancel any active scans
      yield call(stopScanningForDevicesFlow);
    },
  );
}

export function* devicesFlow(): SagaIterator {
  yield fork(requestLocationPermissionFlow);
  yield fork(checkBluetoothEnabledFlow);
  yield fork(scanForDevicesFlow);
  yield fork(stopScanningForDevicesFlow);
  yield fork(connectToDeviceFlow);
}
