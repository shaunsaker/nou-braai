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
  endTime: '',
  braaiPhase: BraaiPhases.firstSeal,
  isFlipping: false,
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
    case BraaiActionTypes.SET_END_TIME: {
      return {
        ...state,
        endTime: action.payload.endTime,
      };
    }
    case BraaiActionTypes.SET_BRAAI_PHASE: {
      return {
        ...state,
        braaiPhase: action.payload.braaiPhase,
      };
    }
    case BraaiActionTypes.SET_IS_FLIPPING: {
      return {
        ...state,
        isFlipping: action.payload.isFlipping,
      };
    }
    case BraaiActionTypes.END_BRAAI: {
      return {
        ...initialState,

        // fields to keep
        steakRarity: state.steakRarity,
        grillHeight: state.grillHeight,
        steakThickness: state.steakThickness,
      };
    }

    default: {
      return state;
    }
  }
};
