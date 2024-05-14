import React from 'react';
import styled from '@emotion/native';
import { GestureResponderEvent } from 'react-native';

type ButtonProps = {
  title: string;
  disabled?: boolean,
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Button = ({ title, disabled, onPress }: ButtonProps) => (
  <TouchableOpacity onPress={onPress} disabled={disabled}>
    <Text>{title}</Text>
  </TouchableOpacity>
)

const TouchableOpacity = styled.TouchableOpacity`
  background-color: #111;
  border-radius: 10px;
  padding-vertical: 12px;
  padding-horizontal: 20px;
  margin-top: 10px;
  width: 100%;
`;

const Text = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export default Button;
