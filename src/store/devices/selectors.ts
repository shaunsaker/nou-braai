import { ApplicationState } from '../reducers';
import { DeviceId } from './models';

export const selectIsLocationPermissionGranted = (state: ApplicationState) =>
  state.devices.isLocationPermissionGranted;

export const selectIsBluetoothEnabled = (state: ApplicationState) =>
  state.devices.isBluetoothEnabled;

export const selectIsScanning = (state: ApplicationState) =>
  state.devices.isScanning;

export const selectDevicesList = (state: ApplicationState) =>
  state.devices.list;

export const selectDeviceById = (state: ApplicationState, deviceId: DeviceId) =>
  state.devices.list[deviceId];

export const selectIsDeviceConnected = (state: ApplicationState) =>
  Object.keys(state.devices.list).some(
    (deviceId: DeviceId) => state.devices.list[deviceId].connected,
  );

export const selectConnectedDevice = (state: ApplicationState) =>
  state.devices.list[
    Object.keys(state.devices.list).filter(
      (deviceId: DeviceId) => state.devices.list[deviceId].connected,
    )[0]
  ];
