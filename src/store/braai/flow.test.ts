import rootReducer from '../reducers';
import { configureTestStore } from '../testStore';
import { setBraaiPhase, setIsFlipping } from './actions';
import { startBraaiSaga, timerSaga } from './flow';
import { BraaiPhases, FLIP_DURATION } from './models';
import {
  selectDurationUntilNextBraaiPhase,
  selectNextBraaiPhase,
} from './selectors';
import * as sinon from 'sinon';

describe('timerSaga', () => {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    sinon.restore();
  });

  const setupTimerSaga = (initialBraaiPhase: BraaiPhases) => {
    const initialState = rootReducer(
      undefined,
      setBraaiPhase(initialBraaiPhase),
    );

    const { store, sagas } = configureTestStore(initialState);

    sagas.run(startBraaiSaga);

    sagas.run(timerSaga);

    // clear the setup calls from dispatch
    // @ts-expect-error
    store.dispatch.mockClear();

    return store;
  };

  it('works correctly from the firstSeal phase', async () => {
    const store = setupTimerSaga(BraaiPhases.firstSeal);
    const state = store.getState();
    const durationUntilNextBraaiPhase = selectDurationUntilNextBraaiPhase(
      state,
    );

    await clock.tickAsync(durationUntilNextBraaiPhase * 1000);

    expect(store.dispatch).toHaveBeenCalledWith(setIsFlipping(true));

    await clock.tickAsync(FLIP_DURATION * 1000);

    expect(store.dispatch).toHaveBeenCalledWith(setIsFlipping(false));

    const nextBraaiPhase = selectNextBraaiPhase(state);

    expect(store.dispatch).toHaveBeenCalledWith(setBraaiPhase(nextBraaiPhase));
  });

  it('works correctly from the secondSeal phase', async () => {
    const store = setupTimerSaga(BraaiPhases.secondSeal);
    const state = store.getState();
    const durationUntilNextBraaiPhase = selectDurationUntilNextBraaiPhase(
      state,
    );

    await clock.tickAsync(durationUntilNextBraaiPhase * 1000);

    expect(store.dispatch).toHaveBeenCalledWith(setIsFlipping(true));

    await clock.tickAsync(FLIP_DURATION * 1000);

    expect(store.dispatch).toHaveBeenCalledWith(setIsFlipping(false));

    const nextBraaiPhase = selectNextBraaiPhase(state);

    expect(store.dispatch).toHaveBeenCalledWith(setBraaiPhase(nextBraaiPhase));
  });

  it('works correctly from the fristChar phase', async () => {
    const store = setupTimerSaga(BraaiPhases.firstChar);
    const state = store.getState();
    const durationUntilNextBraaiPhase = selectDurationUntilNextBraaiPhase(
      state,
    );

    await clock.tickAsync(durationUntilNextBraaiPhase * 1000);

    expect(store.dispatch).toHaveBeenCalledWith(setIsFlipping(true));

    await clock.tickAsync(FLIP_DURATION * 1000);

    expect(store.dispatch).toHaveBeenCalledWith(setIsFlipping(false));

    const nextBraaiPhase = selectNextBraaiPhase(state);

    expect(store.dispatch).toHaveBeenCalledWith(setBraaiPhase(nextBraaiPhase));
  });

  it('works correctly from the secondChar phase', async () => {
    const store = setupTimerSaga(BraaiPhases.secondChar);
    const state = store.getState();
    const durationUntilNextBraaiPhase = selectDurationUntilNextBraaiPhase(
      state,
    );

    await clock.tickAsync(durationUntilNextBraaiPhase * 1000);

    expect(store.dispatch).toHaveBeenCalledWith(setIsFlipping(true));

    await clock.tickAsync(FLIP_DURATION * 1000);

    expect(store.dispatch).toHaveBeenCalledWith(setIsFlipping(false));

    const nextBraaiPhase = selectNextBraaiPhase(state);

    expect(store.dispatch).toHaveBeenCalledWith(setBraaiPhase(nextBraaiPhase));
  });

  it('works correctly from the end phase', async () => {
    const store = setupTimerSaga(BraaiPhases.end);

    // nothing should happen once the end has been reached
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
