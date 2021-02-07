import { action } from 'typesafe-actions';

import { BraaiActionTypes } from './models';

export const setSteakRarity = (steakRarity: string) =>
  action(BraaiActionTypes.SET_STEAK_RARITY, { steakRarity });

export const setGrillHeight = (grillHeight: string) =>
  action(BraaiActionTypes.SET_GRILL_HEIGHT, { grillHeight });

export const setSteakThickness = (steakThickness: string) =>
  action(BraaiActionTypes.SET_STEAK_THICKNESS, { steakThickness });
