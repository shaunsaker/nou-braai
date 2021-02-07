import { action } from 'typesafe-actions';

import { BraaiActionTypes } from './models';

export const startBraai = () => action(BraaiActionTypes.START_BRAAI);

export const setSteakRarity = (steakRarity: string) =>
  action(BraaiActionTypes.SET_STEAK_RARITY, { steakRarity });

export const setGrillHeight = (grillHeight: string) =>
  action(BraaiActionTypes.SET_GRILL_HEIGHT, { grillHeight });

export const setSteakThickness = (steakThickness: string) =>
  action(BraaiActionTypes.SET_STEAK_THICKNESS, { steakThickness });

export const setStartTime = (startTime: string) =>
  action(BraaiActionTypes.SET_START_TIME, { startTime });

export const setFlipTimes = (flipTimes: string[]) =>
  action(BraaiActionTypes.SET_FLIP_TIMES, { flipTimes });

export const setFlipedCount = (flippedCount: number) =>
  action(BraaiActionTypes.SET_FLIPPED_COUNT, { flippedCount });

export const setEndTime = (endTime: string) =>
  action(BraaiActionTypes.SET_END_TIME, { endTime });

export const endBraai = () => action(BraaiActionTypes.END_BRAAI);
