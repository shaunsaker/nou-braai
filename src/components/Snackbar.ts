import RNSnackbar from 'react-native-snackbar';
import { colors } from '../colors';

export const Snackbar = {
  show: (text: string) => {
    RNSnackbar.show({
      textColor: colors.white,
      backgroundColor: colors.black,
      duration: 4000,
      text,
      // fontFamily: FONT_BOLD, // TODO:
    });
  },
};
