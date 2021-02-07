import React, { ReactNode, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { RHYTHM } from '../constants';
import { navigateBack } from '../store/navigation/actions';
import { CloseButton } from './CloseButton';

interface Props {
  showClose?: boolean;
  children: ReactNode;
}

export const Page = ({ showClose, children }: Props) => {
  const dispatch = useDispatch();

  const onClosePress = useCallback(() => {
    dispatch(navigateBack());
  }, [dispatch]);

  return (
    <StyledSafeAreaView>
      {children}

      {showClose && (
        <CloseButtonContainer>
          <CloseButton onPress={onClosePress} />
        </CloseButtonContainer>
      )}
    </StyledSafeAreaView>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
  padding: ${RHYTHM}px;
`;

const CloseButtonContainer = styled.View`
  position: absolute;
  top: ${RHYTHM}px;
  right: ${RHYTHM}px;
`;
