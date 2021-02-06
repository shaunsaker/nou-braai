import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { TemperatureActionTypes, TemperatureState } from './models';

export const initialState: TemperatureState = {
  data: {},
};

export const temperatureReducer: Reducer<TemperatureState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.temperature,
      };
    }
    case TemperatureActionTypes.SET_LATEST_TEMPERATURE_READING: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.timestamp]: action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
};
