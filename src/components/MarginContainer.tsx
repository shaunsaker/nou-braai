import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { RHYTHM } from '../constants';

interface Props {
  small?: boolean;
  large?: boolean;
  children: ReactNode;
}

export const MarginContainer = ({ small, large, children }: Props) => {
  return (
    <Container small={small} large={large}>
      {children}
    </Container>
  );
};

interface ContainerProps {
  small?: boolean;
  large?: boolean;
}

const Container = styled.View<ContainerProps>`
  margin-bottom: ${({ small, large }) =>
    large ? RHYTHM * 2 : small ? RHYTHM / 2 : RHYTHM}px;
`;
