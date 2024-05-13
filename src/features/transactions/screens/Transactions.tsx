import React, { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useAppDispatch, useAppSelector } from '@store/index';
import { allTransactions, fetchTransactions } from '@transactions/store/reducer';
import { Transaction } from '@transactions/models';
import { RefreshControl } from 'react-native-gesture-handler';
import TransactionCard from '@transactions/components/TransactionCard';
import { RouteParamList } from '@navigation/index';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

const PAGE_SIZE = 15;

const Transactions = () => {

  const [ page, setPage ] = useState<number>(1);
  const [ pageSize, setPageSize ] = useState<number>(PAGE_SIZE);
  const [ isRefreshing, setIsRefreshing ] = useState(false);
  const { 
    loading,
    error, 
    transactions: {
      Transactions,
    },
  } = useAppSelector(allTransactions);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RouteParamList>();

  const loadTransactions = () => {
    setPage(1);
    setPageSize(PAGE_SIZE);
    setIsRefreshing(true);
    dispatch(fetchTransactions({ page, pageSize }))
      .finally(() => setIsRefreshing(false));
  };

  const onLoadMore = () => {
    setPageSize(prev => prev + PAGE_SIZE);
    dispatch(fetchTransactions({ page, pageSize }))
  };

  const renderTransactionItem = ({ item }: { item: Transaction}) => (
    <TransactionCard
      transaction={item}
      onPress={() => navigation.navigate('details', { transation: item })}
    />
  );

  useEffect(() => {
    dispatch(fetchTransactions({ page, pageSize }));
  }, [dispatch]);

  return (
    <FlashList 
      data={Transactions}
      renderItem={renderTransactionItem}
      keyExtractor={item => item.Id.toString()}
      estimatedItemSize={200}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={loadTransactions}
        />
      }
      onEndReachedThreshold={0.3}
      onEndReached={onLoadMore}
      ListFooterComponent={
        loading ? <ActivityIndicator size='large' color="#111" /> : null
      }
    />
  );
}

export default Transactions;
