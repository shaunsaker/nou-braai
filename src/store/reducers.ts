import { combineReducers } from 'redux';
import { DevicesState } from './devices/models';
import { devicesReducer } from './devices/reducer';
import { TemperatureState } from './temperature/models';
import { temperatureReducer } from './temperature/reducer';

export interface ApplicationState {
  devices: DevicesState;
  temperature: TemperatureState;
}

export const rootReducer = combineReducers({
  devices: devicesReducer,
  temperature: temperatureReducer,
});

export const initialState = rootReducer(undefined, { type: '' });

export default rootReducer;
