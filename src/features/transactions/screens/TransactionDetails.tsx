import React from 'react';
import {
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import { Routes } from '@navigation/index';

type DetailsRoute = RouteProp<Routes, 'details'>;

const TransactionDetails = () => {
  const { params: { transation } } = useRoute<DetailsRoute>();
  return (null)
}

export default TransactionDetails;
