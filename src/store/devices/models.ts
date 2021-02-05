import { BluetoothDevice } from 'react-native-bluetooth-classic';

export enum DevicesActionTypes {
  REQUEST_LOCATION_PERMISSION_ANDROID = '@devices/REQUEST_LOCATION_PERMISSION_ANDROID',
  SET_IS_LOCATION_PERMISSION_GRANTED = '@devices/SET_IS_LOCATION_PERMISSION_GRANTED',
  CHECK_BLUETOOTH_ENABLED = '@devices/CHECK_BLUETOOTH_ENABLED',
  SET_IS_BLUETOOTH_ENABLED = '@devices/SET_IS_BLUETOOTH_ENABLED',
  SCAN_FOR_DEVICES = '@devices/SCAN_FOR_DEVICES',
  SET_IS_SCANNING = '@devices/SET_IS_SCANNING',
  SET_DEVICES = '@devices/SET_DEVICES',
  STOP_SCANNING_FOR_DEVICES = '@devices/STOP_SCANNING_FOR_DEVICES',
  CONNECT_TO_DEVICE = '@devices/CONNECT_TO_DEVICE',
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
