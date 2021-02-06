import { BluetoothDevice } from 'react-native-bluetooth-classic';

export enum DevicesActionTypes {
  REQUEST_LOCATION_PERMISSION_ANDROID = '@devices/REQUEST_LOCATION_PERMISSION_ANDROID',
  SET_IS_LOCATION_PERMISSION_GRANTED = '@devices/SET_IS_LOCATION_PERMISSION_GRANTED',
  CHECK_BLUETOOTH_STATE = '@devices/CHECK_BLUETOOTH_STATE',
  LISTEN_FOR_BLUETOOTH_STATE_CHANGES = '@devices/LISTEN_FOR_BLUETOOTH_STATE_CHANGES',
  SET_IS_BLUETOOTH_ENABLED = '@devices/SET_IS_BLUETOOTH_ENABLED',
  SCAN_FOR_DEVICES = '@devices/SCAN_FOR_DEVICES',
  SET_IS_SCANNING = '@devices/SET_IS_SCANNING',
  SET_DEVICES = '@devices/SET_DEVICES',
  STOP_SCANNING_FOR_DEVICES = '@devices/STOP_SCANNING_FOR_DEVICES',
  CONNECT_TO_DEVICE = '@devices/CONNECT_TO_DEVICE',
  CONNECT_TO_DEVICE_SUCCESS = '@devices/CONNECT_TO_DEVICE_SUCCESS',
  SET_DEVICE_CONNECTING = '@devices/SET_DEVICE_CONNECTING',
  SET_DEVICE_CONNECTED = '@devices/SET_DEVICE_CONNECTED',
  DISCONNECT_FROM_DEVICE = '@devices/DISCONNECT_FROM_DEVICE',
}

export interface Device extends BluetoothDevice {
  connected?: boolean;
  connecting?: boolean;
}

export type DeviceId = string;

export type Devices = Record<DeviceId, Device>;

export interface DevicesState {
  isLocationPermissionGranted: boolean;
  isBluetoothEnabled: boolean;
  isScanning: boolean;
  list: Devices;
}
