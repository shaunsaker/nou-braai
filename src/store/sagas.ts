import { fork } from 'redux-saga/effects';
import { braaiFlow } from './braai/flow';
import { devicesFlow } from './devices/flow';
import { navigationFlow } from './navigation/flow';
import { snackbarFlow } from './snackbar/flow';

function* omnipresentFlows() {
  yield fork(braaiFlow);
  yield fork(devicesFlow);
  yield fork(navigationFlow);
  yield fork(snackbarFlow);
}

function* rootSaga() {
  yield fork(omnipresentFlows);
}

export default rootSaga;
