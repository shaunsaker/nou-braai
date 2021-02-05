import { action } from 'typesafe-actions';

import { DeviceId, Devices, DevicesActionTypes } from './models';

export const requestLocationPermissionAndroid = () =>
  action(DevicesActionTypes.REQUEST_LOCATION_PERMISSION_ANDROID);

export const setIsLocationPermissionGranted = (
  isLocationPermissionGranted: boolean,
) =>
  action(DevicesActionTypes.SET_IS_LOCATION_PERMISSION_GRANTED, {
    isLocationPermissionGranted,
  });

export const checkBluetoothEnabled = () =>
  action(DevicesActionTypes.CHECK_BLUETOOTH_ENABLED);

export const setIsBluetoothEnabled = (isBluetoothEnabled: boolean) =>
  action(DevicesActionTypes.SET_IS_BLUETOOTH_ENABLED, {
    isBluetoothEnabled,
  });

export const scanForDevices = () => action(DevicesActionTypes.SCAN_FOR_DEVICES);

export const setIsScanning = (isScanning: boolean) =>
  action(DevicesActionTypes.SET_IS_SCANNING, {
    isScanning,
  });

export const setDevices = (devices: Devices) =>
  action(DevicesActionTypes.SET_DEVICES, {
    devices,
  });

export const stopScanningForDevices = () =>
  action(DevicesActionTypes.STOP_SCANNING_FOR_DEVICES);

export const connectToDevice = (deviceId: DeviceId) =>
  action(DevicesActionTypes.CONNECT_TO_DEVICE, { deviceId });
