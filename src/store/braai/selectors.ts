import { ApplicationState } from '../reducers';

export const selectSteakRarity = (state: ApplicationState) =>
  state.braai.steakRarity;

export const selectGrillHeight = (state: ApplicationState) =>
  state.braai.grillHeight;

export const selectSteakThickness = (state: ApplicationState) =>
  state.braai.steakThickness;
