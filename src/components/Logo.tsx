import React from 'react';
import styled from 'styled-components/native';

interface Props {}

export const Logo = ({}: Props) => {
  return <StyledText>🔥 Nou Braai</StyledText>;
};

const StyledText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
