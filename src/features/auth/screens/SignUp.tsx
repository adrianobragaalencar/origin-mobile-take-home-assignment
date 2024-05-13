import React, { useState } from 'react';
import styled from '@emotion/native';
import { useTranslation } from 'react-i18next';
import Button from '@shared/components/Button';
import { useAppDispatch } from '@store/index';

const SignUp = () => {
  const { t } = useTranslation();
  const [ name, setName ] = useState<string>();
  const [ email, setEmail ] = useState<string>();
  const [ password, setPassword ] = useState<string>();
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Title>{t('signup.title')}</Title>
      <TextInput 
        value={name}
        onChangeText={setName}
        placeholder={t('signup.name')}
        autoCapitalize='none'
      />
      <TextInput 
        value={email}
        onChangeText={setEmail}
        placeholder={t('signup.email')}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput 
        value={password}
        onChangeText={setPassword}
        placeholder={t('signup.password')}
        autoCapitalize='none'
        secureTextEntry
      />
      <Button title={t('signup.button')} onPress={() => {}} />
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  align-items: center;
  margin: 50px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: black;
  text-align: center;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  height: 40px;
  border-color: gray;
  border-width: 1px;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

export default SignUp;
