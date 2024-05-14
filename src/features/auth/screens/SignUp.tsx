import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@store/index';
import { signUp } from '@auth/store/reducer';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Container,
  ErrorText,
  LoadingView,
  Title,
} from '@auth/styles';

import styled from '@emotion/native';
import Button from '@shared/components/Button';
import FormInput from '@shared/components/FormInput';

const options: ImageLibraryOptions = {
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 2000,
  maxWidth: 2000,
};

const SignUp = () => {
  const [ selectedSelfie, setSelectedSelfie ] = useState<string>()
  const { t } = useTranslation();
  const formSchema = z.object({
    name: z.string().min(5, t('invalid.name.message', { size: 5 })),
    email: z.string().email(t('invalid.email.message')),
    password: z.string().min(6, t('invalid.password.message', { size: 6 })),
  });
  const { loading, error } = useAppSelector(state => state.auth);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });
  const dispatch = useAppDispatch();

  const handleSignUp = ({
    name,
    email,
    password,
  } : { 
    name: string,
    email: string,
    password: string,
  }) => {
    dispatch(signUp({ name, email, password, photo: selectedSelfie }));
  }

  const handleSelfieSelection = async () => {
    const response = await launchImageLibrary(options);
    if (response.didCancel) {
      console.log('[SignUp] image picker cancelled');
    } else if (response.errorMessage) {
      console.log('[SignUp] picker error: ', response);
    } else {
      const imageUri = response.assets?.[0]?.uri;
      setSelectedSelfie(imageUri);
    }
  }

  return (
    <Container>
      <LoadingView size={'large'} visible={loading} />
      <Title>{t('signup.title')}</Title>
      <FormContainer>
        <FormInput
          control={control}
          name={'name'}
          placeholder={t('signup.name')}
          autoCapitalize='none'
        />
        <FormInput
          control={control}
          name={'email'}
          placeholder={t('signup.email')}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <FormInput
          control={control}
          name={'password'}
          placeholder={t('signup.password')}
          autoCapitalize='none'
          secureTextEntry
        />
        <Selfie>
          {selectedSelfie && 
            <Image source={{ uri: selectedSelfie }} />
          }
        </Selfie>
      </FormContainer>
      {error && <ErrorText>{error}</ErrorText>}
      <ButtonsContainer>
        <Button title={t('signup.selfie')} onPress={handleSelfieSelection} />
        <Button title={t('signup.button')} onPress={handleSubmit(handleSignUp)} />  
      </ButtonsContainer>
    </Container>
  );
}

const FormContainer = styled.View`
  flex: 2;
`;

const ButtonsContainer = styled.View`
  flex: 1;
`;

const Selfie = styled.View`
  background-color: #fff;
  border-color: lightgray;
  border-width: 0.5px;
  border-radius: 5px;
  margin-vertical: 12px;
  align-items: center;
  padding: 20px;
  flex-direction: column;
`;

const Image = styled.Image`
  width: 120px;
  height: 120px;
  borderRadius: 75px;
  marginEnd: 10px;
`

export default SignUp;
