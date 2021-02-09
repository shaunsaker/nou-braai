export enum BraaiActionTypes {
  SET_STEAK_RARITY = '@@braai/SET_STEAK_RARITY',
  SET_GRILL_HEIGHT = '@@braai/SET_GRILL_HEIGHT',
  SET_STEAK_THICKNESS = '@@braai/SET_STEAK_THICKNESS',
  START_BRAAI = '@@braai/START_BRAAI',
  SET_START_TIME = '@@braai/SET_START_TIME',
  SET_FLIP_TIMES = '@@braai/SET_FLIP_TIMES',
  SET_END_TIME = '@@braai/SET_END_TIME',
  END_BRAAI = '@@braai/END_BRAAI',
  SET_BRAAI_PHASE = '@@braai/SET_BRAAI_PHASE',
  SET_IS_FLIPPING = '@@braai/SET_IS_FLIPPING',
}

export enum SteakRarity {
  'bleu' = 'Bleu',
  'rare' = 'Rare',
  'mediumRare' = 'Medium Rare',
  'medium' = 'Medium',
  'mediumWell' = 'Medium Well',
  'wellDone' = 'Well Done',
}

export enum BraaiPhases {
  'firstSeal' = 'First Seal',
  'secondSeal' = 'Second Seal',
  'firstChar' = 'First Char',
  'secondChar' = 'Second Char',
  'end' = 'End',
}

export const FLIP_DURATION = 10; // s

export interface BraaiState {
  steakRarity: SteakRarity;
  grillHeight: string;
  steakThickness: string;
  startTime: string;
  flipTimes: string[];
  endTime: string;
  braaiPhase: BraaiPhases;
  isFlipping: boolean;
}
