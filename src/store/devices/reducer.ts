import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { Device, DevicesActionTypes, DevicesState } from './models';

export const initialState: DevicesState = {
  isLocationPermissionGranted: false,
  isBluetoothEnabled: false,
  isScanning: false,
  list: {},
};

export const devicesReducer: Reducer<DevicesState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.devices,
        loading: false,
      };
    }
    case DevicesActionTypes.SET_IS_LOCATION_PERMISSION_GRANTED: {
      return {
        ...state,
        isLocationPermissionGranted: action.payload.isLocationPermissionGranted,
      };
    }
    case DevicesActionTypes.SET_IS_BLUETOOTH_ENABLED: {
      return {
        ...state,
        isBluetoothEnabled: action.payload.isBluetoothEnabled,
      };
    }
    case DevicesActionTypes.SET_IS_SCANNING: {
      return {
        ...state,
        isScanning: action.payload.isScanning,
      };
    }
    case DevicesActionTypes.SET_DEVICES: {
      const newList = { ...state.list };

      // add unique devices
      action.payload.devices.forEach((device: Device) => {
        if (!newList[device.id]) {
          newList[device.id] = device;
        }
      });

      return {
        ...state,
        list: newList,
      };
    }
    case DevicesActionTypes.SET_DEVICE_CONNECTING: {
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.deviceId]: {
            ...state.list[action.payload.deviceId],
            connecting: action.payload.connecting,
          },
        },
      };
    }
    case DevicesActionTypes.SET_DEVICE_CONNECTED: {
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.deviceId]: {
            ...state.list[action.payload.deviceId],
            connected: action.payload.connected,
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};
