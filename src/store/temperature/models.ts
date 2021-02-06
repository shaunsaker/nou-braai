import { DeviceId } from '../devices/models';

export enum TemperatureActionTypes {
  SET_LATEST_TEMPERATURE_READING = '@temperature/SET_LATEST_TEMPERATURE_READING',
}

export interface TemperatureReading {
  timestamp: string;
  value: number;
  deviceId: DeviceId;
}

export interface TemperatureState {
  data: Record<string, TemperatureReading>;
}

export const DEFAULT_TEMPERATURE_VALUE = '-';
