import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import {
  BraaiActionTypes,
  BraaiPhases,
  BraaiState,
  SteakRarity,
} from './models';

export const initialState: BraaiState = {
  steakRarity: SteakRarity.mediumRare,
  grillHeight: '10',
  steakThickness: '3',
  startTime: '',
  flipTimes: [],
  flippedCount: 0,
  endTime: '',
  phase: BraaiPhases.firstSeal,
};

export const braaiReducer: Reducer<BraaiState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload?.braai,
      };
    }
    case BraaiActionTypes.SET_STEAK_RARITY: {
      return {
        ...state,
        steakRarity: action.payload.steakRarity,
      };
    }
    case BraaiActionTypes.SET_GRILL_HEIGHT: {
      return {
        ...state,
        grillHeight: action.payload.grillHeight,
      };
    }
    case BraaiActionTypes.SET_STEAK_THICKNESS: {
      return {
        ...state,
        steakThickness: action.payload.steakThickness,
      };
    }
    case BraaiActionTypes.SET_START_TIME: {
      return {
        ...state,
        startTime: action.payload.startTime,
      };
    }
    case BraaiActionTypes.SET_FLIP_TIMES: {
      return {
        ...state,
        flipTimes: action.payload.flipTimes,
      };
    }
    case BraaiActionTypes.SET_FLIPPED_COUNT: {
      return {
        ...state,
        flippedCount: action.payload.flippedCount,
      };
    }
    case BraaiActionTypes.SET_END_TIME: {
      return {
        ...state,
        endTime: action.payload.endTime,
      };
    }
    case BraaiActionTypes.END_BRAAI: {
      return {
        ...state,
        startTime: initialState.startTime,
        flipTimes: initialState.flipTimes,
        flippedCount: initialState.flippedCount,
        endTime: initialState.endTime,
      };
    }

    default: {
      return state;
    }
  }
};
