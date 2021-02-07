import tinycolor from 'tinycolor2';

const BLACK = '#0A1C21';
const WHITE = '#FFFFFF';
const PRIMARY = '#D9A01F';
const SECONDARY = '#D9A01F';
const ACCENT = '#8C4C10';
const SUCCESS = '#419268';
const DANGER = '#D13F00';
const LIGHT = '#E9D59C';

export const colors = {
  // input colors
  black: BLACK,
  white: WHITE,
  primary: PRIMARY,
  secondary: SECONDARY,
  accent: ACCENT,
  success: SUCCESS,
  danger: DANGER,

  // calculated colors
  transBlack: tinycolor(BLACK).setAlpha(0.5).toString(),
  transWhite: tinycolor(LIGHT).setAlpha(0.5).toString(),
  darkTransWhite: tinycolor(LIGHT).setAlpha(0.8).toString(),
  lightTransWhite: tinycolor(LIGHT).setAlpha(0.17).toString(),
  veryLightTransWhite: tinycolor(LIGHT).setAlpha(0.05).toString(),
  lightPrimary: tinycolor(PRIMARY).setAlpha(0.33).toString(),
  lightAccent: tinycolor(ACCENT).setAlpha(0.33).toString(),
  grey: tinycolor(BLACK).setAlpha(0.33).toString(),
  lightSuccess: tinycolor(SUCCESS).setAlpha(0.33).toString(),
  lightDanger: tinycolor(DANGER).setAlpha(0.33).toString(),
};
