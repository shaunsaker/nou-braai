import { objectToArray } from '../../utils/objectToArray';
import { ApplicationState } from '../reducers';
import { DeviceId } from './models';

export const selectIsLocationPermissionGranted = (state: ApplicationState) =>
  state.devices.isLocationPermissionGranted;

export const selectIsBluetoothEnabled = (state: ApplicationState) =>
  state.devices.isBluetoothEnabled;

export const selectIsScanning = (state: ApplicationState) =>
  state.devices.isScanning;

export const selectDevicesList = (state: ApplicationState) => {
  // return a sorted array of devices
  const array = objectToArray(state.devices.list);

  // sort by connecting => connected => bonded => name
  const newArray = [...array].sort((a, b) => {
    if (a.connecting) {
      return 1;
    }

    if (a.connected) {
      return 1;
    }

    if (a.bonded) {
      return 1;
    }

    return a.name < b.name ? 1 : -1;
  });

  return newArray;
};

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
