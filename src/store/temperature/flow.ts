// TODO: move this to own saga
// console.log('Listening for temperature...');
// device.onDataReceived((event: BluetoothDeviceReadEvent) => {
//   // remove the delimiter (last char)
//   const processedData = event.data.slice(0, event.data.length - 1);

import { SagaIterator } from 'redux-saga';
import { fork, takeLatest } from 'redux-saga/effects';
import { select } from '../../utils/typedSelect';
import { connectToDeviceSuccess } from '../devices/actions';
import { DevicesActionTypes } from '../devices/models';
import { selectDeviceById } from '../devices/selectors';
import { ApplicationState } from '../reducers';

//   yield put(setTemperature(processedData));
// });

// const bluetoothStateChangeChannel = () => {
//   return eventChannel((emit): any => {
//     const bluetoothStateChangeListener = RNBluetoothClassic.onStateChanged(
//       (event: StateChangeEvent) => {
//         emit(event.enabled);
//       },
//     );

//     // The subscriber must return an unsubscribe function
//     return () => bluetoothStateChangeListener.remove();
//   });
// };

// function* listenForBluetoothStateChangesFlow(): SagaIterator {
//   yield takeLatest(
//     DevicesActionTypes.LISTEN_FOR_BLUETOOTH_STATE_CHANGES,
//     function* () {
//       const channel = yield call(bluetoothStateChangeChannel);

//       while (true) {
//         const isBluetoothEnabled = yield take(channel);

//         yield put(setIsBluetoothEnabled(isBluetoothEnabled));
//       }
//     },
//   );
// }

function* onDeviceConnectSuccessFlow(): SagaIterator {
  yield takeLatest(
    DevicesActionTypes.CONNECT_TO_DEVICE_SUCCESS,
    async function* (action: ReturnType<typeof connectToDeviceSuccess>) {
      // when we successfully connect to a device, listen for data changes
      const device = yield* select((state: ApplicationState) =>
        selectDeviceById(state, action.payload.deviceId),
      );

      console.log({ device });
    },
  );
}

export function* temperatureFlow(): SagaIterator {
  yield fork(onDeviceConnectSuccessFlow);
}
