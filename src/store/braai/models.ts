export enum BraaiActionTypes {
  SET_STEAK_RARITY = '@@braai/SET_STEAK_RARITY',
  SET_GRILL_HEIGHT = '@@braai/SET_GRILL_HEIGHT',
  SET_STEAK_THICKNESS = '@@braai/SET_STEAK_THICKNESS',
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
}
