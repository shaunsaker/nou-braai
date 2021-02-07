export enum BraaiActionTypes {
  SET_STEAK_RARITY = '@@braai/SET_STEAK_RARITY',
  SET_GRILL_HEIGHT = '@@braai/SET_GRILL_HEIGHT',
  SET_STEAK_THICKNESS = '@@braai/SET_STEAK_THICKNESS',
  START_BRAAI = '@@braai/START_BRAAI',
  SET_START_TIME = '@@braai/SET_START_TIME',
  SET_FLIP_TIMES = '@@braai/SET_FLIP_TIMES',
  SET_FLIPPED_COUNT = '@@braai/SET_FLIPPED_COUNT',
  SET_END_TIME = '@@braai/SET_END_TIME',
  END_BRAAI = '@@braai/END_BRAAI',
}

export enum SteakRarity {
  'bleu' = 'Bleu',
  'rare' = 'Rare',
  'mediumRare' = 'Medium Rare',
  'medium' = 'Medium',
  'mediumWell' = 'Medium Well',
  'wellDone' = 'Well Done',
}

export interface BraaiState {
  steakRarity: SteakRarity;
  grillHeight: string;
  steakThickness: string;
  startTime: string;
  flipTimes: string[];
  flippedCount: number;
  endTime: string;
}
