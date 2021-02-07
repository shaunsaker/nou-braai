import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import Button, { ButtonKinds } from '../components/Button';
import { Input } from '../components/Input';
import { InputContainer } from '../components/InputContainer';
import { Logo } from '../components/Logo';
import { Page } from '../components/Page';
import { ParagraphText } from '../components/ParagraphText';
import { RHYTHM } from '../constants';
import {
  setGrillHeight,
  setSteakRarity,
  setSteakThickness,
} from '../store/braai/actions';
import {
  selectGrillHeight,
  selectSteakRarity,
  selectSteakThickness,
} from '../store/braai/selectors';
import { navigateBack } from '../store/navigation/actions';

export const BraaiInput = () => {
  const dispatch = useDispatch();
  const steakRarity = useSelector(selectSteakRarity);
  const grillHeight = useSelector(selectGrillHeight);
  const steakThickness = useSelector(selectSteakThickness);

  const onChangeSteakRarity = useCallback(
    (value: string) => {
      dispatch(setSteakRarity(value));
    },
    [dispatch],
  );

  const onChangeGrillHeight = useCallback(
    (value: string) => {
      dispatch(setGrillHeight(value));
    },
    [dispatch],
  );

  const onChangeSteakThickness = useCallback(
    (value: string) => {
      dispatch(setSteakThickness(value));
    },
    [dispatch],
  );

  const onStartPress = useCallback(() => {
    // TODO: start timer

    dispatch(navigateBack());
  }, [dispatch]);

  return (
    <Page showClose>
      <Container>
        <Logo />

        <InputContainer>
          <FormInputContainer>
            <FormInputLabelContainer>
              <ParagraphText>How do you like your steak?</ParagraphText>
            </FormInputLabelContainer>

            <Input
              placeholder="E.g. Medium Rare"
              value={steakRarity}
              onChangeText={onChangeSteakRarity}
            />
          </FormInputContainer>

          <FormInputContainer>
            <FormInputLabelContainer>
              <ParagraphText>
                How high is your grill from the coals (in cm)?
              </ParagraphText>
            </FormInputLabelContainer>

            <Input
              placeholder="E.g. 10 cm"
              value={grillHeight}
              onChangeText={onChangeGrillHeight}
            />
          </FormInputContainer>

          <FormInputContainer>
            <FormInputLabelContainer>
              <ParagraphText>How thick is your steak (in cm)?</ParagraphText>
            </FormInputLabelContainer>

            <Input
              placeholder="E.g. 3 cm"
              value={steakThickness}
              onChangeText={onChangeSteakThickness}
            />
          </FormInputContainer>

          <SubmitButtonContainer>
            <Button kind={ButtonKinds.primary} onPress={onStartPress}>
              START
            </Button>
          </SubmitButtonContainer>
        </InputContainer>
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

const FormInputContainer = styled.View`
  margin-bottom: ${RHYTHM * 2}px;
`;

const FormInputLabelContainer = styled.View`
  margin-bottom: ${RHYTHM / 2}px;
`;

const SubmitButtonContainer = styled.View`
  align-items: center;
`;