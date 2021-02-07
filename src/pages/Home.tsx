import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import Button, { ButtonKinds } from '../components/Button';
import { Logo } from '../components/Logo';
import { Page } from '../components/Page';
import { Screens } from '../Router';
import { endBraai } from '../store/braai/actions';
import { selectIsBraaing } from '../store/braai/selectors';
import { navigate } from '../store/navigation/actions';

export const Home = () => {
  const dispatch = useDispatch();
  const isBraaing = useSelector(selectIsBraaing);

  const onButtonPress = useCallback(() => {
    if (isBraaing) {
      dispatch(endBraai());
    } else {
      dispatch(navigate(Screens.braaiInput));
    }
  }, [dispatch, isBraaing]);

  return (
    <Page>
      <Container>
        <Logo />

        <ContentContainer>
          <Button kind={ButtonKinds.primary} onPress={onButtonPress}>
            {isBraaing ? 'END BRAAI' : 'LETS BRAAI'}
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
