import React from 'react';
import { Transaction } from '@transactions/models';
import styled from '@emotion/native';

type TransactionCardProps = {
  transaction: Transaction;
  onPress?: () => void;
}

const TransactionCard = ({ transaction, onPress }: TransactionCardProps) => {
  return (
    <Container onPress={onPress}>
      <Details>
        <VendorText>{transaction.Vendor}</VendorText>
        <DetailsHorizontal>
          <TypeText>({transaction.Type})</TypeText>
        </DetailsHorizontal>
        <DateText>{new Date(transaction.Date).toLocaleDateString()}</DateText>
      </Details>
    </Container>
  );
}

export const Container = styled.TouchableOpacity`
  background-color: #fff;
  margin-vertical: 4px;
  margin-horizontal: 8px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 5;
  flex-direction: row;
  align-items: center;
  padding: 12px;
`;


export const Details = styled.View`
  flex: 1;
`;

export const DetailsHorizontal = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const DateText = styled.Text`
  color: #757575;
  font-size: 14px;
`;

export const VendorText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
`;

export const TypeText = styled.Text`
  font-size: 14px;
  color: #616161;
  margin: 4px;
  font-style: italic;
`;

export default TransactionCard;
