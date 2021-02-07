import React, { useState, useCallback, ReactNode } from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';
import { TextInputProperties, TextInput } from 'react-native';
import { BORDER_WIDTH } from '../constants';

export const INPUT_HEIGHT = 40;
export const INPUT_PADDING = INPUT_HEIGHT / 2;

interface StyledInputContainerProps {
  isFocussed: boolean;
  hasValue: boolean;
  isValid?: boolean;
}

const StyledInputContainer = styled.View<StyledInputContainerProps>`
  flex-direction: row;
  border-radius: ${INPUT_HEIGHT / 2}px;
  border-width: ${BORDER_WIDTH}px;
  border-style: solid;
`;

const StyledInput = styled(TextInput)`
  font-size: 16px;
  color: ${colors.black};
  height: ${INPUT_HEIGHT}px;
  padding: 0 ${INPUT_PADDING}px;
  width: 100%;
`;

interface InputBaseProps extends InputProps {
  isFocussed: boolean;
  hasValue: boolean;
  isValid?: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
}

const InputBase = ({
  placeholder,
  affix,
  isFocussed,
  hasValue,
  isValid,
  handleFocus,
  handleBlur,
  ...props
}: InputBaseProps) => {
  return (
    <StyledInputContainer
      isFocussed={isFocussed}
      hasValue={hasValue}
      isValid={isValid}>
      {affix}

      <StyledInput
        placeholderTextColor={colors.transBlack}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </StyledInputContainer>
  );
};

export interface InputProps extends TextInputProperties {
  affix?: ReactNode;
  isValid?: boolean;
}

export const Input = (props: InputProps) => {
  const [isFocussed, setIsFocussed] = useState(false);
  const hasValue = Boolean(props.value);

  const onFocus = useCallback(() => {
    setIsFocussed(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocussed(false);
  }, []);

  return (
    <InputBase
      isFocussed={isFocussed}
      hasValue={hasValue}
      handleFocus={onFocus}
      handleBlur={onBlur}
      {...props}
    />
  );
};
