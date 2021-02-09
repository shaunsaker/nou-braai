import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { RHYTHM } from '../constants';
import { BraaiPhases, FLIP_DURATION } from '../store/braai/models';
import {
  selectBraaiDuration,
  selectBraaiPhase,
  selectDurationUntilNextBraaiPhase,
  selectIsFlipping,
} from '../store/braai/selectors';
import { HeaderText } from './HeaderText';
import { MarginContainer } from './MarginContainer';
import { SmallText } from './SmallText';

const SOME_CONSTANT_KEY = '1';

export const BraaiTimer = () => {
  const braaiPhase = useSelector(selectBraaiPhase);
  const durationUntilNextFlip = useSelector(selectDurationUntilNextBraaiPhase);
  const braaiDuration = useSelector(selectBraaiDuration);
  const isFlipping = useSelector(selectIsFlipping);
  const timerDuration = isFlipping ? FLIP_DURATION : durationUntilNextFlip;

  return (
    <Container>
      <MarginContainer large>
        <HeaderText>Phase: {braaiPhase}</HeaderText>
      </MarginContainer>

      <CountdownCircleTimer
        key={isFlipping ? SOME_CONSTANT_KEY : braaiPhase}
        rotation={isFlipping ? 'counterclockwise' : 'clockwise'}
        size={240}
        isPlaying
        duration={timerDuration}
        initialRemainingTime={
          isFlipping ? FLIP_DURATION : durationUntilNextFlip
        }
        colors={
          isFlipping
            ? colors.transBlack
            : [
                [colors.success, 0.4],
                [colors.primary, 0.4],
                [colors.danger, 0.2],
              ]
        }>
        {
          // @ts-expect-error animatedColor does exist
          ({ remainingTime, animatedColor }) => (
            <TextContainer>
              <Animated.Text style={[styles.text, { color: animatedColor }]}>
                {remainingTime}
              </Animated.Text>

              <SmallText>
                {braaiPhase === BraaiPhases.end && remainingTime === 0
                  ? `Now let those puppies rest for ${braaiDuration}min and you're good to go! Enjoy 😋`
                  : isFlipping
                  ? 'Flip those babies... 👀'
                  : remainingTime && remainingTime <= 10 && remainingTime > 0
                  ? 'Get ready to flip! 🥩'
                  : ''}
              </SmallText>
            </TextContainer>
          )
        }
      </CountdownCircleTimer>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
`;

const TextContainer = styled.View`
  margin: ${RHYTHM}px;
  align-items: center;
`;

const styles = StyleSheet.create({
  text: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
