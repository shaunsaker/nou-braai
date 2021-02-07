import React from 'react';
import styled from 'styled-components/native';
import { TouchableIcon } from './TouchableIcon';
import CloseIcon from '../icons/close.svg';
import { colors } from '../colors';

const CloseButtonContainer = styled(TouchableIcon)``;

interface CloseButtonProps {
  onPress: () => void;
}

export const CloseButton = ({ onPress }: CloseButtonProps) => {
  return (
    <CloseButtonContainer onPress={onPress}>
      <CloseIcon width={24} height={24} fill={colors.black} />
    </CloseButtonContainer>
  );
};
