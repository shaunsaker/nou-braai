import { action } from 'typesafe-actions';

import { SnackbarActionTypes } from './models';

export const showSnackbar = (text: string) =>
  action(SnackbarActionTypes.SHOW_SNACKBAR, {
    text,
  });
