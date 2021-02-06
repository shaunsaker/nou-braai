import { action } from 'typesafe-actions';

import { TemperatureActionTypes, TemperatureReading } from './models';

export const setLatestTemperatureReading = (data: TemperatureReading) =>
  action(TemperatureActionTypes.SET_LATEST_TEMPERATURE_READING, data);
