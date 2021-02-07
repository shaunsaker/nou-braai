import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

interface Props {
  children: ReactNode;
}

export const JumboText = ({ children }: Props) => {
  return <StyledText>{children}</StyledText>;
};

const StyledText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: black;
`;
