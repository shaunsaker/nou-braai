import React, { ReactNode } from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';

interface Props extends TextProps {
  children: ReactNode;
}

export const ParagraphText = ({ children, ...props }: Props) => {
  return <StyledText {...props}>{children}</StyledText>;
};

const StyledText = styled.Text`
  font-size: 14px;
  color: black;
`;
