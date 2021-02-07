import { combineReducers } from 'redux';
import { BraaiState } from './braai/models';
import { braaiReducer } from './braai/reducer';
import { DevicesState } from './devices/models';
import { devicesReducer } from './devices/reducer';
import { TemperatureState } from './temperature/models';
import { temperatureReducer } from './temperature/reducer';

export interface ApplicationState {
  braai: BraaiState;
  devices: DevicesState;
  temperature: TemperatureState;
}

export const rootReducer = combineReducers({
  braai: braaiReducer,
  devices: devicesReducer,
  temperature: temperatureReducer,
});

export const initialState = rootReducer(undefined, { type: '' });

export default rootReducer;
