import { Action, applyMiddleware, createStore } from 'redux';
import createSagaMiddleware, { END, runSaga, Saga } from 'redux-saga';
import reducers, { ApplicationState } from './reducers';

export const configureTestStore = (initialState?: ApplicationState) => {
  // add the middlewares
  const middlewares = [];

  // add the saga middleware
  const sagas = createSagaMiddleware();

  middlewares.push(sagas);

  // apply the middleware
  const middleware = applyMiddleware(...middlewares);

  const store = createStore(reducers, initialState, middleware);

  // @ts-expect-error
  store.close = () => store.dispatch(END);
  const originalDispatch = store.dispatch;

  // @ts-expect-error
  store.dispatch = jest.fn((action: Action) => originalDispatch(action));

  // @ts-expect-error
  sagas.run = (saga: Saga) => runSaga(store, saga);

  return { store, sagas };
};
