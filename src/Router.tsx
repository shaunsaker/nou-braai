import React, { useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import {
  BluetoothDeviceReadEvent,
  StateChangeEvent,
} from 'react-native-bluetooth-classic/lib/BluetoothEvent';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkBluetoothEnabled,
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

  const connectToDevice = useCallback(
    async (deviceId: string) => {
      changeDeviceState({ deviceId, state: 'connecting', value: true });

      try {
        let device;

        // if the user has not already paired to the device, pair and then connect
        if (!devices[deviceId].bonded) {
          console.log(`Pairing to: ${deviceId}...`);
          device = await RNBluetoothClassic.pairDevice(deviceId);
        }

        console.log(`Connecting to: ${deviceId}...`);
        device = await RNBluetoothClassic.connectToDevice(deviceId, {
          delimiter: BLUETOOTH_EVENT_DATA_DELIMITER,
        });

        console.log('Listening for temperature...');
        device.onDataReceived((event: BluetoothDeviceReadEvent) => {
          // remove the delimiter (last char)
          const processedData = event.data.slice(0, event.data.length - 1);

          setTemperature(processedData);
        });

        changeDeviceState({ deviceId, state: 'connected', value: true });
      } catch (error) {
        console.log({ error });
      }

      changeDeviceState({ deviceId, state: 'connecting', value: false });
    },
    [devices, changeDeviceState],
  );

  const disconnectFromDevice = useCallback(
    async (deviceId: string) => {
      try {
        await RNBluetoothClassic.disconnectFromDevice(deviceId);
      } catch (error) {
        console.log({ error });
      }

      changeDeviceState({ deviceId, state: 'connected', value: false });
    },
    [changeDeviceState],
  );

  useEffect(() => {
    // on mount, request location permission on android for ble
    dispatch(requestLocationPermissionAndroid());

    // check if bluetooth is enabled
    dispatch(checkBluetoothEnabled());

    const bluetoothStateChangeListener = RNBluetoothClassic.onStateChanged(
      (event: StateChangeEvent) => {
        setIsBluetoothEnabled(event.enabled);
      },
    );

    // stop the device scan and disconnect from device (if needed) on unmount
    return () => {
      dispatch(stopScanningForDevices());

      bluetoothStateChangeListener.remove();
    };
  }, [dispatch]);

  const onStartScanPress = useCallback(() => {
    dispatch(scanForDevices());
  }, [dispatch]);

  const onStopScanPress = useCallback(() => {
    dispatch(stopScanningForDevices());
  }, [dispatch]);

  const onDevicePress = useCallback(
    (deviceId: string) => {
      stopScanningForDevices();

      // if we have already connected, disconnect
      if (devices[deviceId].connected) {
        disconnectFromDevice(deviceId);
      } else {
        connectToDevice(deviceId);
      }
    },
    [stopScanningForDevices, connectToDevice, disconnectFromDevice, devices],
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
          {Object.keys(devices).map((deviceId) => (
            <TouchableOpacity
              key={deviceId}
              disabled={devices[deviceId].connected}
              style={[
                styles.button,
                devices[deviceId].connecting && styles.disabledButton,
              ]}
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
