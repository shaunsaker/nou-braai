import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { RHYTHM } from '../constants';

interface Props {
  children: ReactNode;
}

export const Page = ({ children }: Props) => {
  return <StyledSafeAreaView>{children}</StyledSafeAreaView>;
};

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
  padding: ${RHYTHM}px;
`;
