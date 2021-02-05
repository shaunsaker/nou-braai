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
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};
