import { SnackbarActionTypes } from './models';
import { showSnackbar } from './actions';
import { takeLatest, fork } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { SagaIterator } from 'redux-saga';
import { Snackbar } from '../../components/Snackbar';

function* onShowSnackbarFlow(
  action: ActionType<typeof showSnackbar>,
): SagaIterator {
  Snackbar.show(action.payload.text);
}

function* watchShowSnackbarFlow(): SagaIterator {
  yield takeLatest(SnackbarActionTypes.SHOW_SNACKBAR, onShowSnackbarFlow);
}

export function* snackbarFlow(): SagaIterator {
  yield fork(watchShowSnackbarFlow);
}
