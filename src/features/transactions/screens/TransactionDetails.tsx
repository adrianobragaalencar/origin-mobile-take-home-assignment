import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import { Routes } from '@navigation/index';
import { Amount, DateText } from '@transactions/styles';
import { getTransactionDate } from '@transactions/models';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@store/index';
import { 
  fetchTransactionDetails,
  transactionDetails,
  updateTransactionLocation,
} from '@transactions/store/reducer';
import styled from '@emotion/native';
import { Marker } from 'react-native-maps';
import { Map } from '@transactions/components/Map';
import GetLocation from 'react-native-get-location';
import Button from '@shared/components/Button';
import Spinner from 'react-native-loading-spinner-overlay';

type DetailsRoute = RouteProp<Routes, 'details'>;

const TransactionDetails = () => {
  const { t } = useTranslation();
  const { params: { id } } = useRoute<DetailsRoute>();
  const { width, height } = Dimensions.get('window');
  const { 
    details, 
    loading,
  } = useAppSelector(transactionDetails);
  const dispatch = useAppDispatch();
  //
  const [ coords, setCoords ] = useState<{ 
    lat: number | undefined,
    lon: number | undefined,
  }>();

  const handleLocation = async () => {
    try {
      const position = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
      const { latitude: lat, longitude: lon} = position;
      dispatch(updateTransactionLocation({
        id,
        lat,
        lon,
      }));
      // Necessary to keep current location in memory as
      // calling update transaction endpoint, in fact does not
      // update transaction at all
      setCoords({ lat, lon });
    } catch (e) {
      console.log('[TransactionDetails] ERROR', e);
    }
  }

  useEffect(() => {
    dispatch(fetchTransactionDetails(id));
  }, [id]);
  
  if (!details) {
    return <Spinner size={'large'} visible={loading} />;
  }

  return (
    <Container>
      {details.ReceiptImage ? 
        <Image
          source={{ uri: details.ReceiptImage }}
          width={width - 20}
          height={Math.floor(height / 4)}
          resizeMode='cover'
        /> :
        null
      }
      <Details>
        <Vendor>{details.Vendor}</Vendor>
        <Amount type={details.Type}>
          ${details.Amount.toFixed(2)}
        </Amount>
        <DateText>{getTransactionDate(details)}</DateText>
      </Details>
      <Text>{t('details.location.text')}</Text> 
      <Map
       style={{ 
        width: width - 20,
        height: Math.floor(height / 5),
        borderRadius: 10,
      }}
        region={{
          latitude: coords?.lat ?? details.Lat,
          longitude: coords?.lon ?? details.Lon,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        <Marker
          coordinate={{
            latitude: coords?.lat ?? details.Lat,
            longitude: coords?.lon ?? details.Lon,
          }}
          title={details.Vendor}
        />
      </Map>
      <Button title={t('details.location.button')} onPress={handleLocation} />
   </Container>
  );
}

const Container = styled.ScrollView`
  background-color: #fff;
  elevation: 5;
  flex-direction: column;
  padding: 10px;
`;

const Details = styled.View`
  background-color: #fff;
  border-color: lightgray;
  border-width: 0.5px;
  border-radius: 5px;
  margin-vertical: 10px;
  align-items: center;
  padding: 12px;
`;

const Vendor = styled.Text`
  font-size: 20px;
  margin-top: 12px;
  margin-bottom: 4px;
  color: black;
`;

const Text = styled.Text`
  color: #757575;
  font-size: 16px;
  margin-horizontal: 8px;
  margin-bottom: 8px;
`;

const Image = styled.Image`
  border-width: 0.5px;
  borderRadius: 12px;
  marginEnd: 10px;
  margin-bottom: 8px;
`

export default TransactionDetails;
