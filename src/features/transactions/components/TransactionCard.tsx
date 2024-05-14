import React from 'react';
import { Transaction, getTransactionDate } from '@transactions/models';
import styled from '@emotion/native';
import { Amount, DateText, Image, placeholder } from '@transactions/styles';

type TransactionCardProps = {
  transaction: Transaction;
  onPress?: () => void;
}

const TransactionCard = ({ transaction, onPress }: TransactionCardProps) => {
  return (
    <Container onPress={onPress}>
        <Image
          source={{
            uri: transaction.ReceiptImage ?? placeholder,
          }}
          resizeMode='cover'
        />
      <View>
        <Vendor>{transaction.Vendor}</Vendor>
        <DateText>{getTransactionDate(transaction)}</DateText>
        <Type>{transaction.Type}</Type>
      </View>
      <Amount type={transaction.Type}>
        ${transaction.Amount.toFixed(2)}
      </Amount>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  background-color: #fff;
  elevation: 5;
  flex-direction: row;
  align-items: center;
  padding: 12px;
`;

const View = styled.View`
  flex: 1;
`;

const Vendor = styled.Text`
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 4px;
`;

const Type = styled.Text`
  font-size: 13px;
  color: #616161;
  margin: 4px;
  font-style: italic;
`;


export default TransactionCard;
