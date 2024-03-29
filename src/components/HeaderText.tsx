import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

interface Props {
  children: ReactNode;
}

export const HeaderText = ({ children }: Props) => {
  return <StyledText>{children}</StyledText>;
};

const StyledText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: black;
`;
