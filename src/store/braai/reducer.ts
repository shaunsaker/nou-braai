import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import { BraaiActionTypes, BraaiState, SteakRarity } from './models';

export const initialState: BraaiState = {
  steakRarity: SteakRarity.mediumRare,
  grillHeight: '10',
  steakThickness: '3',
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

    default: {
      return state;
    }
  }
};
