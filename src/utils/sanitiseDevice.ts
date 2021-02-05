import { BluetoothDevice } from 'react-native-bluetooth-classic';

export const sanitiseDevice = (device: BluetoothDevice): BluetoothDevice => {
  // remove any private keys (they contain circular JSON)
  Object.keys(device).forEach((key: any) => {
    if (key.startsWith('_')) {
      // @ts-expect-error we don't care what it is, just delete it
      delete device[key];
    }
  });

  return device;
};
