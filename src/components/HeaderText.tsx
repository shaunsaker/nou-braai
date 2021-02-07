import React from 'react';
import styled from 'styled-components/native';
import { RHYTHM } from '../constants';

interface Props {
  children: string;
}

export const HeaderText = ({ children }: Props) => {
  return <StyledText>{children}</StyledText>;
};

const StyledText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-bottom: ${RHYTHM}px;
`;
