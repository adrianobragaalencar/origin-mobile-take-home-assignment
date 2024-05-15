import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@store/index';
import { RouteParamList } from '@navigation/index';
import { useNavigation } from '@react-navigation/native';
import { clearState, signIn } from '@auth/store/reducer';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Container,
  ErrorText,
  Title,
} from '@auth/styles';
import Spinner from 'react-native-loading-spinner-overlay';
import styled from '@emotion/native';
import Button from '@shared/components/Button';
import FormInput from '@shared/components/FormInput';

const SignIn = () => {
  const { t } = useTranslation();
  const formSchema = z.object({
    email: z.string().email(t('invalid.email.message')),
    password: z.string().min(6, t('invalid.password.message', { size: 6 })),
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });
  const { loading, error } = useAppSelector(state => state.auth);
  const navigation = useNavigation<RouteParamList>();
  const dispatch = useAppDispatch();

  const handleSignIn = ({ email, password } : { email: string, password: string }) => {
    dispatch(signIn({ email, password }));
  }

  const handleSignUp = () => {
    reset();
    dispatch(clearState());
    navigation.navigate('signUp');
  }

  return (
    <Container>
      <Spinner size={'large'} visible={loading} />
      <Title>{t('signin.title')}</Title>
      <FormInput
        control={control}
        name={'email'}
        placeholder={t('signin.email')}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <FormInput
        control={control}
          name={'password'}
          placeholder={t('signin.password')}
          autoCapitalize='none'
          secureTextEntry
        />
        {error && <ErrorText>{error}</ErrorText>}
      <Button title={t('signin.button')} onPress={handleSubmit(handleSignIn)} />
      <LinkContainer>
        <Text>{t('signin.account.message')}</Text>
        <Link onPress={() => handleSignUp()}>{t('signup.account.message')}</Link>
      </LinkContainer>
    </Container>
  );
}

const LinkContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 14px;
  color: black;
`;

const Link = styled(Text)`
  textDecorationLine: underline
`;

export default SignIn;
