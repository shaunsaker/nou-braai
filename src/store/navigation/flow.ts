import { SagaIterator } from 'redux-saga';
import { fork, takeLatest } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { navigate as _navigate } from '../../Router';
import { navigate } from './actions';
import { NavigateActionTypes } from './models';

export function* onNavigateBackFlow(): SagaIterator {
  _navigate();
}

export function* onNavigateFlow(
  action: ActionType<typeof navigate>,
): SagaIterator {
  _navigate(action.payload.screen, action.payload.props);
}

export function* watchNavigateBackFlow(): SagaIterator {
  yield takeLatest(NavigateActionTypes.NAVIGATE_BACK, onNavigateBackFlow);
}

export function* watchNavigateFlow(): SagaIterator {
  yield takeLatest(NavigateActionTypes.NAVIGATE, onNavigateFlow);
}

export function* navigationFlow(): SagaIterator {
  yield fork(watchNavigateBackFlow);
  yield fork(watchNavigateFlow);
}
