import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { DevicesActionTypes, DevicesState } from './models';

export const initialState: DevicesState = {
  isLocationPermissionGranted: false,
  isBluetoothEnabled: false,
  isScanning: false,
  devices: {},
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

    default: {
      return state;
    }
  }
};
