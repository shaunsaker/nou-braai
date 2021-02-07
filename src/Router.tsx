import React, { createRef, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import {
  NavigationContainer,
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { Home } from './pages/Home';
import { ConnectDevice } from './pages/ConnectDevice';
import { BraaiInput } from './pages/BraaiInput';

export enum Screens {
  home = 'home',
  braaiInput = 'braaiInput',
  connectDevice = 'connectDevice',
}

export type RouteStackParamList = {
  [Screens.home]: undefined;
  [Screens.braaiInput]: undefined;
  [Screens.connectDevice]: undefined;
};

export type ScreenNavigationProps<T extends Screens> = StackNavigationProp<
  RouteStackParamList,
  T
>;

export type ScreenRouteProps<T extends Screens> = RouteProp<
  RouteStackParamList,
  T
>;

const Stack = createStackNavigator<RouteStackParamList>();

const navigationRef = createRef<NavigationContainerRef>();
export const navigate = <K extends keyof RouteStackParamList>(
  name?: K,
  params?: RouteStackParamList[K],
) => {
  if (!name) {
    // goBack
    navigationRef.current?.goBack();
  } else {
    navigationRef.current?.navigate(name, params);
  }
};

export const isCurrentRoute = (screenName: Screens) => {
  return navigationRef.current?.getCurrentRoute()?.name === screenName;
};

export const Router = () => {
  useEffect(() => {
    enableScreens();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none" mode="modal">
        <Stack.Screen name={Screens.home} component={Home} />

        <Stack.Screen name={Screens.braaiInput} component={BraaiInput} />

        <Stack.Screen name={Screens.connectDevice} component={ConnectDevice} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
