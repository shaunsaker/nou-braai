import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

interface InputContainerProps {
  children: ReactNode;
}

export const InputContainer = ({ children }: InputContainerProps) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      bounces={false}>
      {children}
    </KeyboardAwareScrollView>
  );
};
