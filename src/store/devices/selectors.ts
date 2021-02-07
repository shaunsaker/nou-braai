import { objectToArray } from '../../utils/objectToArray';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';
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
  const connectingDevices = sortArrayOfObjectsByKey(
    array.filter((device) => device.connecting),
    'name',
  );
  const connectedDevices = sortArrayOfObjectsByKey(
    array.filter((device) => device.connected && !device.connecting),
    'name',
  );
  const bondedDevices = sortArrayOfObjectsByKey(
    array.filter(
      (device) => device.bonded && !device.connecting && !device.connected,
    ),
    'name',
  );
  const otherDevices = sortArrayOfObjectsByKey(
    array.filter(
      (device) => !device.bonded && !device.connecting && !device.connected,
    ),
    'name',
  );

  const newArray = [
    ...connectingDevices,
    ...connectedDevices,
    ...bondedDevices,
    ...otherDevices,
  ];

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

export const selectConnectingDevice = (state: ApplicationState) =>
  state.devices.list[
    Object.keys(state.devices.list).filter(
      (deviceId: DeviceId) => state.devices.list[deviceId].connecting,
    )[0]
  ];
