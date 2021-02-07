import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { Touchable } from './Touchable';
import { ActivityIndicator } from 'react-native';
import { FONT_BOLD, RHYTHM } from '../constants';

export enum ButtonKinds {
  primary,
  secondary,
  accent,
  disabled,
  danger,
}

interface ButtonProps {
  kind: ButtonKinds;
  small?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: string;
  onPress: () => void;
}

export const Button = ({
  kind,
  small,
  loading,
  disabled,
  fullWidth,
  onPress,
  children,
}: ButtonProps) => {
  const childComponent = loading ? (
    <ActivityIndicator size="small" color={colors.black} />
  ) : (
    <ButtonText kind={kind} small={small}>
      {children}
    </ButtonText>
  );

  return (
    <ButtonContainer
      kind={kind}
      small={small}
      disabled={disabled}
      fullWidth={fullWidth}
      onPress={onPress}>
      {childComponent}
    </ButtonContainer>
  );
};

export default Button;

interface ButtonContainerProps {
  kind: ButtonKinds;
  small?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}

const WIDTH = 180;
const SMALL_WIDTH = 100;
const HEIGHT = 45;
export const SMALL_BUTTON_HEIGHT = 30;

const ButtonContainer = styled(Touchable)<ButtonContainerProps>`
  min-width: ${({ small, fullWidth }) =>
    small ? `${SMALL_WIDTH}px` : fullWidth ? 'auto' : `${WIDTH}px`};
  height: ${({ small }) => (small ? SMALL_BUTTON_HEIGHT : HEIGHT)}px;
  border-radius: ${({ small }) =>
    small ? SMALL_BUTTON_HEIGHT / 2 : HEIGHT / 2}px;
  background-color: ${colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: ${HEIGHT / 2}px;
  padding: 0 ${RHYTHM / 2}px;
  opacity: ${({ disabled }) => (disabled ? 0.33 : 1)};
`;

interface ButtonTextProps {
  kind: ButtonKinds;
  small?: boolean;
  disabled?: boolean;
}

const ButtonText = styled.Text<ButtonTextProps>`
  font-size: ${({ small }) => (small ? 12 : 16)}px;
  font-family: ${FONT_BOLD};
  font-weight: bold;
  color: ${colors.black};
`;
