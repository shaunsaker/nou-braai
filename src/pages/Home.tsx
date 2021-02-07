import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import Button, { ButtonKinds } from '../components/Button';
import { Logo } from '../components/Logo';
import { Page } from '../components/Page';
import { Screens } from '../Router';
import { navigate } from '../store/navigation/actions';

export const Home = () => {
  const dispatch = useDispatch();

  const onStartBraaiPress = useCallback(() => {
    dispatch(navigate(Screens.braaiInput));
  }, [dispatch]);

  return (
    <Page>
      <Container>
        <Logo />

        <ContentContainer>
          <Button kind={ButtonKinds.primary} onPress={onStartBraaiPress}>
            LETS BRAAI
          </Button>
        </ContentContainer>
      </Container>
    </Page>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
