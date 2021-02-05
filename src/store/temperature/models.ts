import { DeviceId } from '../devices/models';

export enum TemperatureActionTypes {}

export interface TemperatureState {
  data: Record<
    string,
    {
      timestamp: string;
      value: string;
      deviceId: DeviceId;
    }
  >;
}
