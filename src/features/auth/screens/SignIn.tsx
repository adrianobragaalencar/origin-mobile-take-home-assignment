import React, { useState } from 'react';
import styled from '@emotion/native';
import { useTranslation } from 'react-i18next';
import Button from '@shared/components/Button';
import { useAppDispatch } from '@store/index';
import { RouteParamList } from '@navigation/index';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const { t } = useTranslation();
  const [ email, setEmail ] = useState<string>();
  const [ password, setPassword ] = useState<string>();
  const navigation = useNavigation<RouteParamList>();
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Title>{t('signin.title')}</Title>
      <TextInput 
        value={email}
        onChangeText={setEmail}
        placeholder={t('signin.email')}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput 
        value={password}
        onChangeText={setPassword}
        placeholder={t('signin.password')}
        autoCapitalize='none'
        secureTextEntry
      />
      <Button title={t('signin.button')} onPress={() => {}} />
      <LinkContainer>
        <Text>{t('signin.account.message')}</Text>
        <Link onPress={() => navigation.navigate('signUp')}>{t('signup.account.message')}</Link>
      </LinkContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  display: flex;
  margin: 50px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const TextInput = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const LinkContainer = styled.View`
  flex: 1;
  flexDirection: row;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 14px;
`;

const Link = styled(Text)`
  textDecorationLine: underline
`;

export default SignIn;
