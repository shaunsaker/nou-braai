import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { HeaderText } from '../components/HeaderText';
import { JumboText } from '../components/JumboText';
import { Logo } from '../components/Logo';
import { Page } from '../components/Page';
import {
  selectConnectedDevice,
  selectConnectingDevice,
} from '../store/devices/selectors';
import { DEFAULT_TEMPERATURE_VALUE } from '../store/temperature/models';
import { selectLatestTemperatureReading } from '../store/temperature/selectors';
import { Button, ButtonKinds } from '../components/Button';
import { navigate } from '../store/navigation/actions';
import { Screens } from '../Router';

export const Home = () => {
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
    <Page>
      <Container>
        <Logo />

        <ContentContainer>
          <HeaderText>Grill Temperature:</HeaderText>

          <JumboText>{temperature}°C</JumboText>
        </ContentContainer>

        {
          <Button kind={ButtonKinds.primary} onPress={onConnectDevicePress}>
            {connectedDevice
              ? `${connectedDevice.name} CONNECTED`
              : connectingDevice
              ? `${connectingDevice.name} CONNECTING`
              : 'GO TO DEVICES'}
          </Button>
        }
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
