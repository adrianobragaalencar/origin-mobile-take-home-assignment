import React, { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useAppDispatch, useAppSelector } from '@store/index';
import { allTransactions, fetchTransactions } from '@transactions/store/reducer';
import { Transaction } from '@transactions/models';
import { RefreshControl } from 'react-native-gesture-handler';
import { RouteParamList } from '@navigation/index';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getUser, signOut } from '@auth/store/reducer';
import TransactionCard from '@transactions/components/TransactionCard';
import TransactionHeader from '@transactions/components/TransactionHeader';
import styled from '@emotion/native';

const PAGE_SIZE = 15;

const Transactions = () => {

  const { t } = useTranslation();
  const [ page, setPage ] = useState<number>(1);
  const [ pageSize, setPageSize ] = useState<number>(PAGE_SIZE);
  const [ isRefreshing, setIsRefreshing ] = useState(false);
  const { 
    loading,
    transactions: {
      Transactions,
    },
  } = useAppSelector(allTransactions);
  const { user } = useAppSelector(app => app.auth);
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
    dispatch(fetchTransactions({ page, pageSize }));
  };

  const renderTransactionItem = ({ item }: { item: Transaction}) => (
    <TransactionCard
      transaction={item}
      onPress={() => navigation.navigate('details', { id: item.Id })}
    />
  );

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchTransactions({ page, pageSize }));
  }, [dispatch]);

  return (
    <>
      {user && <TransactionHeader user={user} onPress={() => dispatch(signOut())} />}
      <HeaderText>{t('transactions.header.text')}</HeaderText>
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
        ItemSeparatorComponent={() => (<Divider />)}
        ListFooterComponent={
          loading ? <ActivityIndicator size='large' color="#111" /> : null
        }
      />
    </>
  );
}

const HeaderText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  padding: 12px;
  color: black;
`;

const Divider = styled.View`
  display: flex;
  margin: 4px;
  align-items: center;
  border: 0.5px solid #d3d3d37f;
`;

export default Transactions;
