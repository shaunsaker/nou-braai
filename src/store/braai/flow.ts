import moment from 'moment';
import { SagaIterator } from 'redux-saga';
import { fork, put, takeLatest } from 'redux-saga/effects';
import { setEndTime, setFlipTimes, setStartTime } from './actions';
import { BraaiActionTypes, FLIP_DURATION } from './models';

function* onStartBraaiFlow(): SagaIterator {
  yield takeLatest(BraaiActionTypes.START_BRAAI, function* () {
    // TODO: these are calculated once we have enough data and based on braai input
    const SEAL_1_TIME = 2.5;
    const SEAL_2_TIME = 2.5;
    const CHAR_1_TIME = 1.5;
    const CHAR_2_TIME = 1.5;
    const FLIP_TIME = FLIP_DURATION / 1000 / 60; // 5 seconds

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
  });
}

export function* braaiFlow(): SagaIterator {
  yield fork(onStartBraaiFlow);
}
