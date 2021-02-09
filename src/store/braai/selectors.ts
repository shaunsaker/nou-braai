import moment from 'moment';
import { ApplicationState } from '../reducers';
import { BraaiPhases } from './models';

export const selectSteakRarity = (state: ApplicationState) =>
  state.braai.steakRarity;

export const selectGrillHeight = (state: ApplicationState) =>
  state.braai.grillHeight;

export const selectSteakThickness = (state: ApplicationState) =>
  state.braai.steakThickness;

export const selectIsBraaing = (state: ApplicationState) =>
  state.braai.startTime;

export const selectDurationUntilNextBraaiPhase = (state: ApplicationState) => {
  // get the duration of the next flip/removal based on the braaiPhase
  const now = moment();
  let initialTime;
  let finalTime;

  if (state.braai.braaiPhase === BraaiPhases.firstSeal) {
    initialTime = moment(state.braai.startTime);
    finalTime = moment(state.braai.flipTimes[0]);
  } else if (state.braai.braaiPhase === BraaiPhases.secondSeal) {
    initialTime = moment(state.braai.flipTimes[0]);
    finalTime = moment(state.braai.flipTimes[1]);
  } else if (state.braai.braaiPhase === BraaiPhases.firstChar) {
    initialTime = moment(state.braai.flipTimes[1]);
    finalTime = moment(state.braai.flipTimes[2]);
  } else if (state.braai.braaiPhase === BraaiPhases.secondChar) {
    initialTime = moment(state.braai.flipTimes[2]);
    finalTime = moment(state.braai.endTime);
  }

  if (initialTime && finalTime) {
    const initialTimeToUse = initialTime.isAfter(now) ? initialTime : now;
    const duration = finalTime.diff(initialTimeToUse.toISOString(), 'seconds');

    return duration;
  }

  return 0;
};

export const selectBraaiPhase = (state: ApplicationState) =>
  state.braai.braaiPhase;

export const selectBraaiDuration = (state: ApplicationState) =>
  moment(state.braai.endTime).diff(moment(state.braai.startTime), 'minutes');

export const selectNextBraaiPhase = (state: ApplicationState) => {
  if (state.braai.braaiPhase === BraaiPhases.firstSeal) {
    return BraaiPhases.secondSeal;
  }

  if (state.braai.braaiPhase === BraaiPhases.secondSeal) {
    return BraaiPhases.firstChar;
  }

  if (state.braai.braaiPhase === BraaiPhases.firstChar) {
    return BraaiPhases.secondChar;
  }

  if (state.braai.braaiPhase === BraaiPhases.secondChar) {
    return BraaiPhases.end;
  }

  return;
};

export const selectIsFlipping = (state: ApplicationState) =>
  state.braai.isFlipping;
