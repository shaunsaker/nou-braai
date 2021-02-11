import moment from 'moment';
import { SagaIterator } from 'redux-saga';
import { delay, fork, put, takeLatest } from 'redux-saga/effects';
import { select } from '../../utils/typedSelect';
import {
  setBraaiPhase,
  setEndTime,
  setFlipTimes,
  setIsFlipping,
  setStartTime,
} from './actions';
import { BraaiActionTypes, BraaiPhases, FLIP_DURATION } from './models';
import {
  selectBraaiPhase,
  selectDurationUntilNextBraaiPhase,
  selectNextBraaiPhase,
} from './selectors';

export function* startBraaiSaga(): SagaIterator {
  // TODO: these are calculated once we have enough data and based on braai input
  const SEAL_1_TIME = 2.5;
  const SEAL_2_TIME = 2.5;
  const CHAR_1_TIME = 1.5;
  const CHAR_2_TIME = 1.5;
  const FLIP_TIME = FLIP_DURATION / 60; // 5 seconds in minutes

  const startTime = moment();
  const flip1Time = startTime.clone().add(SEAL_1_TIME, 'minutes');
  const flip2Time = flip1Time.clone().add(SEAL_2_TIME + FLIP_TIME, 'minutes');
  const flip3Time = flip2Time.clone().add(CHAR_1_TIME + FLIP_TIME, 'minutes');
  const endTime = flip3Time.clone().add(CHAR_2_TIME + FLIP_TIME, 'minutes');

  const flipTimes = [
    flip1Time.toISOString(),
    flip2Time.toISOString(),
    flip3Time.toISOString(),
  ];

  yield put(setStartTime(startTime.toISOString()));

  yield put(setFlipTimes(flipTimes));

  yield put(setEndTime(endTime.toISOString()));

  // this will initiate the timerFlow
  yield put(setBraaiPhase(BraaiPhases.firstSeal));
}

function* onStartBraaiFlow(): SagaIterator {
  yield takeLatest(BraaiActionTypes.START_BRAAI, startBraaiSaga);
}

export function* timerSaga(): SagaIterator {
  // check which phase we're in
  const braaiPhase = yield* select(selectBraaiPhase);

  // get the next time that we need to do something
  const durationUntilNextBraaiPhase = yield* select(
    selectDurationUntilNextBraaiPhase,
  );

  // yield until that time
  yield delay(durationUntilNextBraaiPhase * 1000);

  if (braaiPhase !== BraaiPhases.end) {
    // if the braai is not about to end, change to isFlipping and delay for FLIP_DURATION
    if (braaiPhase !== BraaiPhases.secondChar) {
      yield put(setIsFlipping(true));

      yield delay(FLIP_DURATION * 1000);

      yield put(setIsFlipping(false));
    }

    // change to the next braai phase
    const nextBraaiPhase = yield* select(selectNextBraaiPhase);

    if (nextBraaiPhase) {
      yield put(setBraaiPhase(nextBraaiPhase));
    }
  }
}

function* timerFlow(): SagaIterator {
  yield takeLatest(BraaiActionTypes.SET_BRAAI_PHASE, timerSaga);
}

// TODO: call timerFlow on appState change

export function* braaiFlow(): SagaIterator {
  console.log('HERE');
  yield fork(onStartBraaiFlow);
  yield fork(timerFlow);
}
