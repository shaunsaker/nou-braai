import { action } from 'typesafe-actions';
import { RouteStackParamList } from '../../Router';
import { NavigateActionTypes } from './models';

export const navigateBack = () => action(NavigateActionTypes.NAVIGATE_BACK);

export const navigate = <K extends keyof RouteStackParamList>(
  screen?: K,
  props?: RouteStackParamList[K],
) =>
  action(NavigateActionTypes.NAVIGATE, {
    screen,
    props,
  });
