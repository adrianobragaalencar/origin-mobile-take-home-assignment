import React from 'react';
import {
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import { Routes } from '@navigation/index';
import { Amount, DateText } from '@transactions/styles';
import styled from '@emotion/native';
import { getTransactionDate } from '@transactions/models';


type DetailsRoute = RouteProp<Routes, 'details'>;

const TransactionDetails = () => {
  const { params: { transaction } } = useRoute<DetailsRoute>();
  return (
    <Container>
      {transaction.ReceiptImage && 
        <Image
          source={{ uri: transaction.ReceiptImage }}
          resizeMode='cover'
        />
      }
      <Details>
        <Vendor>{transaction.Vendor}</Vendor>
        <Amount type={transaction.Type}>
          ${transaction.Amount.toFixed(2)}
        </Amount>
        <DateText>{getTransactionDate(transaction)}</DateText>
      </Details>
    </Container>
  );
}

const Container = styled.View`
  background-color: #fff;
  elevation: 5;
  flex-direction: column;
  padding: 12px;
`;

export const Details = styled.View`
  background-color: #fff;
  border-color: lightgray;
  border-width: 0.5px;
  border-radius: 5px;
  margin-vertical: 8px;
  margin-horizontal: 8px;
  align-items: center;
  padding: 12px;
`;

const Vendor = styled.Text`
  font-size: 20px;
  margin-top: 12px;
  margin-bottom: 4px;
`;

const Image = styled.Image`
  width: 60px;
  height: 60px;
  borderWidth: 1px;
  marginEnd: 10px;
`

export default TransactionDetails;
