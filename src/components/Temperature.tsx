import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { HeaderText } from './HeaderText';
import {
  selectConnectedDevice,
  selectConnectingDevice,
} from '../store/devices/selectors';
import { DEFAULT_TEMPERATURE_VALUE } from '../store/temperature/models';
import { selectLatestTemperatureReading } from '../store/temperature/selectors';
import { navigate } from '../store/navigation/actions';
import { Screens } from '../Router';
import { colors } from '../colors';
import { Touchable } from './Touchable';
import { ActivityIndicator } from 'react-native';
import LinkIcon from '../icons/link.svg';

export const Temperature = () => {
  const dispatch = useDispatch();
  const connectedDevice = useSelector(selectConnectedDevice);
  const connectingDevice = useSelector(selectConnectingDevice);
  const latestTemperatureReading = useSelector(selectLatestTemperatureReading);
  const temperature = connectedDevice
    ? latestTemperatureReading
    : DEFAULT_TEMPERATURE_VALUE;

  const onConnectDevicePress = useCallback(() => {
    dispatch(navigate(Screens.connectDevice));
  }, [dispatch]);

  return (
    <Touchable
      disabled={Boolean(connectingDevice)}
      onPress={onConnectDevicePress}>
      <Container>
        {connectingDevice ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : connectedDevice ? (
          <HeaderText>{temperature}°C</HeaderText>
        ) : (
          <LinkIcon width={24} height={24} fill={colors.black} />
        )}
      </Container>
    </Touchable>
  );
};

const SIZE = 50;

const Container = styled.View`
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  background-color: ${colors.primary};
  justify-content: center;
  align-items: center;
`;
