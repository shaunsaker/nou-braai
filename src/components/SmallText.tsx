import React, { ReactNode } from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';

interface Props extends TextProps {
  children: ReactNode;
}

export const SmallText = ({ children, ...props }: Props) => {
  return <StyledText {...props}>{children}</StyledText>;
};

const StyledText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: black;
  text-align: center;
`;
