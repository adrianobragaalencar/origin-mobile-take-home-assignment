import axios, { AxiosResponse } from 'axios';
import { API_URL, TRANSACTION_PATH } from '@env';
import { Transactions, Transaction } from '@transactions/models';

class TransactionApi {
  async getTransactions(page: number, pageSize: number) {
    try {
      console.log(`[TransactionApi] transaction ${page} ${pageSize}`);
      const response: AxiosResponse<Transactions> =
        await axios.get(`${API_URL}/${TRANSACTION_PATH}?page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (e) {
      console.log('[TransactionApi] ERROR-Transaction List', e);
      throw e;
    }
  }
  
  async getTransationDetails(id: number) {
    try {
      const response: AxiosResponse<Transaction> =
        await axios.get(`${API_URL}/${TRANSACTION_PATH}/${id}`);
      return response.data;
    } catch (e) {
      console.log(`[TransactionApi] ERROR-Transaction Details ${id}`, e);
      throw e;
    }
  }
  
  async updateTransationCoord(id: number, lat: number, lon: number) {
    try {
      console.log(`[TransactionApi] id ${id} lat ${lat} lon ${lon}`)
      const response = await axios.post(`${API_URL}/${TRANSACTION_PATH}/${id}/coordinates`, {
        Lat: lat,
        Lon: lon,
      });
      return response.status === 200;
    } catch (e) {
      console.log('[TransactionApi] ERROR-Transaction Update coord', e);
      throw e;
    }
  }

  async updateTransactionReceipt(id: number, url: string) {
    try {
      console.log(`[TransactionApi] id ${id} url ${url}`)
      const response = await axios.post(`${API_URL}/${TRANSACTION_PATH}/${id}/receipt`, {
        ReceiptImageUrl: url,
      });
      return response.status === 200;
    } catch (e) {
      console.log('[TransactionApi] ERROR-Transaction Update receipt', e);
      throw e;
    }
  }
}

export const transactionApi = new TransactionApi();