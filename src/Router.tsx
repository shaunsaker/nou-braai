import React, { useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkBluetoothState,
  connectToDevice,
  disconnectFromDevice,
  listenForBluetoothStateChanges,
  requestLocationPermissionAndroid,
  scanForDevices,
  stopScanningForDevices,
} from './store/devices/actions';
import {
  selectDevicesList,
  selectIsBluetoothEnabled,
  selectIsLocationPermissionGranted,
  selectIsScanning,
} from './store/devices/selectors';
import { selectLatestTemperatureReading } from './store/temperature/selectors';

export const Router = () => {
  const dispatch = useDispatch();
  const isLocationPermissionGranted = useSelector(
    selectIsLocationPermissionGranted,
  );
  const isBluetoothEnabled = useSelector(selectIsBluetoothEnabled);
  const isScanning = useSelector(selectIsScanning);
  const devices = useSelector(selectDevicesList);
  const temperature = useSelector(selectLatestTemperatureReading);

  useEffect(() => {
    // on mount, request location permission on android for ble
    dispatch(requestLocationPermissionAndroid());

    // check if bluetooth is enabled
    dispatch(checkBluetoothState());

    // listen for future bluetooth state changes
    dispatch(listenForBluetoothStateChanges());
  }, [dispatch]);

  const onStartScanPress = useCallback(() => {
    dispatch(scanForDevices());
  }, [dispatch]);

  const onStopScanPress = useCallback(() => {
    dispatch(stopScanningForDevices());
  }, [dispatch]);

  const onDevicePress = useCallback(
    (deviceId: string) => {
      // if we have already connected, disconnect
      if (devices[deviceId].connected) {
        dispatch(disconnectFromDevice(deviceId));
      } else {
        dispatch(connectToDevice(deviceId));
      }
    },
    [dispatch, devices],
  );

  const isStartScanDisabled =
    !isLocationPermissionGranted || !isBluetoothEnabled || isScanning;
  const isStopScanDisabled = !isScanning;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>🔥 Nou Braai</Text>

        <Text style={styles.headerText}>Temperature is:</Text>

        <Text style={styles.jumboText}>{temperature}°C</Text>

        <Text style={styles.headerText}>
          Location permission is{' '}
          {isLocationPermissionGranted ? 'granted' : 'denied'}.
        </Text>

        <Text style={styles.headerText}>
          Bluetooth is {isBluetoothEnabled ? 'enabled' : 'disabled'}.
        </Text>

        <Text style={styles.headerText}>
          {isBluetoothEnabled
            ? isScanning
              ? 'Scanning...'
              : 'Scan stopped.'
            : 'Scan is disabled.'}
        </Text>

        <TouchableOpacity
          disabled={isStartScanDisabled}
          onPress={onStartScanPress}
          style={[styles.button, isStartScanDisabled && styles.disabledButton]}>
          <Text>Start Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isStopScanDisabled}
          onPress={onStopScanPress}
          style={[styles.button, isStopScanDisabled && styles.disabledButton]}>
          <Text>Stop Scan</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>Device List</Text>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContentContainer}>
          {devices &&
            Object.keys(devices).map((deviceId) => (
              <TouchableOpacity
                key={deviceId}
                style={styles.button}
                onPress={() => onDevicePress(deviceId)}>
                <Text>{`${
                  devices[deviceId].connected
                    ? 'Connected: '
                    : devices[deviceId].connecting
                    ? 'Connecting: '
                    : ''
                }${devices[deviceId].name || devices[deviceId].id}`}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    backgroundColor: 'white',
  },
  titleText: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  headerText: {
    marginBottom: 20,
    fontWeight: 'bold',
  },
  jumboText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {},
  scrollViewContentContainer: {},
  button: {
    padding: 20,
    backgroundColor: 'lightblue',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  disabledButton: {
    backgroundColor: 'lightgrey',
  },
});
