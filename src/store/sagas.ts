import { fork } from 'redux-saga/effects';
import { devicesFlow } from './devices/flow';

function* omnipresentFlows() {
  yield fork(devicesFlow);
}

function* rootSaga() {
  yield fork(omnipresentFlows);
}

export default rootSaga;
