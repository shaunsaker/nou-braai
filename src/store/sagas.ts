import { fork } from 'redux-saga/effects';
import { devicesFlow } from './devices/flow';
import { temperatureFlow } from './temperature/flow';

function* omnipresentFlows() {
  yield fork(devicesFlow);
  yield fork(temperatureFlow);
}

function* rootSaga() {
  yield fork(omnipresentFlows);
}

export default rootSaga;
