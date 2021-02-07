import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Button, ButtonKinds } from '../components/Button';
import { CloseButton } from '../components/CloseButton';
import { HeaderText } from '../components/HeaderText';
import { Logo } from '../components/Logo';
import { Page } from '../components/Page';
import { ParagraphText } from '../components/ParagraphText';
import { RHYTHM } from '../constants';
import {
  connectToDevice,
  disconnectFromDevice,
  scanForDevices,
} from '../store/devices/actions';
import { DeviceId } from '../store/devices/models';
import {
  selectDevicesList,
  selectIsDeviceConnected,
  selectIsScanning,
} from '../store/devices/selectors';
import { navigateBack } from '../store/navigation/actions';

export const ConnectDevice = () => {
  const dispatch = useDispatch();
  const devices = useSelector(selectDevicesList);
  const hasDevices = Object.keys(devices).length;
  const isScanning = useSelector(selectIsScanning);
  const isDeviceConnected = useSelector(selectIsDeviceConnected);

  const onClosePress = useCallback(() => {
    dispatch(navigateBack());
  }, [dispatch]);

  const onScanForDevicesPress = useCallback(() => {
    dispatch(scanForDevices());
  }, [dispatch]);

  const onDevicePress = useCallback(
    (deviceId: DeviceId) => {
      const isConnected = devices.some(
        (device) => device.id === deviceId && device.connected,
      );

      if (isConnected) {
        dispatch(disconnectFromDevice(deviceId));
      } else {
        dispatch(connectToDevice(deviceId));
      }
    },
    [dispatch, devices],
  );

  return (
    <Page>
      <Container>
        <Logo />

        <CloseButtonContainer>
          <CloseButton onPress={onClosePress} />
        </CloseButtonContainer>

        <ContentContainer>
          <HeaderText>Device List</HeaderText>

          <StyledScrollView contentContainerStyle={{ alignItems: 'center' }}>
            {hasDevices ? (
              devices.map((device) => (
                <DeviceItemContainer key={device.id}>
                  <ParagraphText>{device.name || device.id}</ParagraphText>

                  <View>
                    <Button
                      kind={ButtonKinds.primary}
                      small
                      disabled={
                        device.connecting ||
                        (isDeviceConnected && !device.connected)
                      }
                      loading={device.connecting}
                      onPress={() => onDevicePress(device.id)}>
                      {device.connected ? 'DISCONNECT' : 'CONNECT'}
                    </Button>
                  </View>
                </DeviceItemContainer>
              ))
            ) : (
              <ParagraphText>No devices found.</ParagraphText>
            )}
          </StyledScrollView>
        </ContentContainer>

        <Button
          kind={ButtonKinds.primary}
          disabled={isScanning}
          loading={isScanning}
          onPress={onScanForDevicesPress}>
          SCAN FOR DEVICES
        </Button>
      </Container>
    </Page>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const CloseButtonContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
`;

const ContentContainer = styled.View`
  flex: 1;
  align-self: stretch;
  align-items: center;
  padding-top: ${RHYTHM}px;
`;

const StyledScrollView = styled.ScrollView`
  align-self: stretch;
`;

const DeviceItemContainer = styled.View`
  align-self: stretch;
  margin-bottom: ${RHYTHM}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
