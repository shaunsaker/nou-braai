import { objectToArray } from '../../utils/objectToArray';
import { sortArrayOfObjectsByKey } from '../../utils/sortArrayOfObjectsByKey';
import { ApplicationState } from '../reducers';

export const selectLatestTemperatureReading = (state: ApplicationState) => {
  // convert data to array
  const array = objectToArray(state.temperature.data);

  // sort by key
  const sortedArray = sortArrayOfObjectsByKey(array, 'timestamp', true);

  // latest key is the latest temperature reading
  const latestTemperatureReading = sortedArray[0]?.value ?? '-';

  return latestTemperatureReading;
};
