import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { BraaiPhases, FLIP_DURATION } from '../store/braai/models';
import {
  selectBraaiPhase,
  selectDurationUntilNextFlipOrEnd,
} from '../store/braai/selectors';
import { HeaderText } from './HeaderText';
import { MarginContainer } from './MarginContainer';
import { SmallText } from './SmallText';

export const BraaiTimer = () => {
  const braaiPhase = useSelector(selectBraaiPhase);
  const durationUntilNextFlip = useSelector(selectDurationUntilNextFlipOrEnd);
  const isFlipping = braaiPhase === BraaiPhases.flipping;
  const timerDuration = isFlipping ? FLIP_DURATION : durationUntilNextFlip;

  return (
    <Container>
      <MarginContainer large>
        <HeaderText>Phase: {braaiPhase}</HeaderText>
      </MarginContainer>

      <CountdownCircleTimer
        key={braaiPhase}
        rotation={isFlipping ? 'counterclockwise' : 'clockwise'}
        size={240}
        isPlaying
        duration={timerDuration}
        initialRemainingTime={durationUntilNextFlip}
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
            <>
              <Animated.Text style={[styles.text, { color: animatedColor }]}>
                {remainingTime}
              </Animated.Text>

              <SmallText>
                {isFlipping
                  ? 'Flip those babies...'
                  : remainingTime && remainingTime <= 10 && remainingTime > 0
                  ? 'Get ready to flip!'
                  : ''}
              </SmallText>
            </>
          )
        }
      </CountdownCircleTimer>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
`;

const styles = StyleSheet.create({
  text: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
