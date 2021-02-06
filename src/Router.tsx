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

export enum Screens {
  home = 'home',
}

export type RouteStackParamList = {
  [Screens.home]: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
