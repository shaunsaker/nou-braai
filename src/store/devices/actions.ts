import { action } from 'typesafe-actions';

import { Device, DeviceId, DevicesActionTypes } from './models';

export const requestLocationPermissionAndroid = () =>
  action(DevicesActionTypes.REQUEST_LOCATION_PERMISSION_ANDROID);

export const setIsLocationPermissionGranted = (
  isLocationPermissionGranted: boolean,
) =>
  action(DevicesActionTypes.SET_IS_LOCATION_PERMISSION_GRANTED, {
    isLocationPermissionGranted,
  });

export const checkBluetoothState = () =>
  action(DevicesActionTypes.CHECK_BLUETOOTH_STATE);

export const listenForBluetoothStateChanges = () =>
  action(DevicesActionTypes.LISTEN_FOR_BLUETOOTH_STATE_CHANGES);

export const setIsBluetoothEnabled = (isBluetoothEnabled: boolean) =>
  action(DevicesActionTypes.SET_IS_BLUETOOTH_ENABLED, {
    isBluetoothEnabled,
  });

export const scanForDevices = () => action(DevicesActionTypes.SCAN_FOR_DEVICES);

export const setIsScanning = (isScanning: boolean) =>
  action(DevicesActionTypes.SET_IS_SCANNING, {
    isScanning,
  });

export const setDevices = (devices: Device[]) =>
  action(DevicesActionTypes.SET_DEVICES, {
    devices,
  });

export const stopScanningForDevices = () =>
  action(DevicesActionTypes.STOP_SCANNING_FOR_DEVICES);

export const connectToDevice = (deviceId: DeviceId) =>
  action(DevicesActionTypes.CONNECT_TO_DEVICE, { deviceId });

export const setDeviceConnecting = (deviceId: DeviceId, connecting: boolean) =>
  action(DevicesActionTypes.SET_DEVICE_CONNECTING, { deviceId, connecting });

export const setDeviceConnected = (deviceId: DeviceId, connected: boolean) =>
  action(DevicesActionTypes.SET_DEVICE_CONNECTED, { deviceId, connected });

export const disconnectFromDevice = (deviceId: DeviceId) =>
  action(DevicesActionTypes.DISCONNECT_FROM_DEVICE, { deviceId });
