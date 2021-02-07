import React from 'react';
import styled from 'styled-components/native';

interface Props {
  children: string;
}

export const ParagraphText = ({ children }: Props) => {
  return <StyledText>{children}</StyledText>;
};

const StyledText = styled.Text`
  font-size: 14px;
  color: black;
`;
