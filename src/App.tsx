import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Router } from './Router';

// disable annoying yellow box errors
console.disableYellowBox = true;

const App = () => {
  // uncomment this if you want to purge the store
  // require('react').useEffect(() => {
  //   persistor.purge();
  // }, []);
  console.log('HERE');

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
