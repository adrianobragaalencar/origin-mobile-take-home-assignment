import React from 'react';
import styled from '@emotion/native';
import { User } from '@auth/models';
import { Image, anonymousAvatar } from '@transactions/styles';

type TransactionCardProps = {
  user: User;
  onPress?: () => void;
}

const TransactionHeader = ({ user, onPress }: TransactionCardProps) => (
  <Container>
    <Image source={{ uri: user.photoURL ?? anonymousAvatar }} />
    <Username>{user.displayName}</Username>
    <IconContainer>
      <IconTouch onPress={onPress}>
        <Icon source={require('../../../assets/logout.png')} />  
      </IconTouch>
    </IconContainer>
  </Container>
);

const Container = styled.View`
  background-color: #fff;
  flex-direction: row;
  padding: 12px;
  align-items: center;
`;
const IconContainer = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const IconTouch = styled.TouchableOpacity``;

const Icon = styled.Image`
  width: 30px;
  height: 30px;
`;

const Username = styled.Text`
  font-size: 18px;
  color: gray;
`;

export default TransactionHeader;
