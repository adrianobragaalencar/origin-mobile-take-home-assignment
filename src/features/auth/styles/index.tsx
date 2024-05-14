import styled from '@emotion/native';
import Spinner from 'react-native-loading-spinner-overlay';

export const Container = styled.View`
  flex: 1;
  display: flex;
  margin: 50px;
`;

export const ErrorText = styled.Text`
  font-size: 14px;
  color: red;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: black;
  text-align: center;
`;

export const LoadingView = styled(Spinner)``;
