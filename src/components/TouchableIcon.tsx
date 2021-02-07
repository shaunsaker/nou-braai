import React from 'react';
import { Touchable, TouchableProps } from './Touchable';

export const TouchableIcon = (props: TouchableProps) => {
  return (
    <Touchable
      {...props}
      hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
    />
  );
};
