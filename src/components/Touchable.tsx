import React, { ReactNode } from 'react';
import { TouchableOpacityProperties, TouchableOpacity } from 'react-native';

export interface TouchableProps extends TouchableOpacityProperties {
  children: ReactNode;
}

export const Touchable = (props: TouchableProps) => {
  return <TouchableOpacity {...props} activeOpacity={0.67} />;
};
