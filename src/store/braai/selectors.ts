import moment from 'moment';
import { ApplicationState } from '../reducers';

export const selectSteakRarity = (state: ApplicationState) =>
  state.braai.steakRarity;

export const selectGrillHeight = (state: ApplicationState) =>
  state.braai.grillHeight;

export const selectSteakThickness = (state: ApplicationState) =>
  state.braai.steakThickness;

export const selectIsBraaing = (state: ApplicationState) =>
  state.braai.startTime;

export const selectDurationUntilNextFlipOrEnd = (state: ApplicationState) => {
  // get the duration of the next flip/removal based on flippedCount
  let initialTime;
  let finalTime;

  if (state.braai.flippedCount === 0) {
    // first flip incoming
    initialTime = moment(state.braai.startTime);
    finalTime = moment(state.braai.flipTimes[0]);
  } else if (state.braai.flippedCount === 1) {
    // second flip incoming
    initialTime = moment(state.braai.flipTimes[0]);
    finalTime = moment(state.braai.flipTimes[1]);
  } else if (state.braai.flippedCount === 2) {
    // third flip incoming
    initialTime = moment(state.braai.flipTimes[1]);
    finalTime = moment(state.braai.flipTimes[2]);
  } else if (state.braai.flippedCount === 3) {
    // end incoming
    initialTime = moment(state.braai.flipTimes[2]);
    finalTime = moment(state.braai.flipTimes[3]);
  } else {
    initialTime = moment(state.braai.flipTimes[3]);
    finalTime = moment(state.braai.endTime);
  }

  if (finalTime) {
    const duration = finalTime.diff(initialTime, 'seconds');

    return duration;
  }

  return 0;
};

export const selectBraaiPhase = (state: ApplicationState) => state.braai.phase;
