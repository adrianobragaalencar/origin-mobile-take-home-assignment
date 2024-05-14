import React from 'react';
import styled from '@emotion/native';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

interface FormInputProps extends TextInputProps {
  control: Control<any>;
  name: string;
};

const FormInput = ({ control, name, ...rest }: FormInputProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { value, onChange, onBlur }, fieldState: { error }}) => (
    <>
      <TextInput
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        {...rest}
      />
        {error && <ErrorText>{error.message}</ErrorText>}
      </>
      )}
    />
);

const TextInput = styled.TextInput`
  width: 100%;
  height: 40px;
  border-color: gray;
  border-width: 1px;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const ErrorText = styled.Text`
  font-size: 14px;
  color: red;
`;

export default FormInput;
