import axios, { AxiosResponse } from 'axios';
import { API_URL } from '@env';
import { Transactions, Transaction } from '@transactions/models';

class TransactionApi {
  async getTransactions(page: number, pageSize: number) {
    try {
      console.log(`[TransactionApi] transaction ${page} ${pageSize}`);
      const response: AxiosResponse<Transactions> =
        await axios.get(`${API_URL}/mobile-tha/transactions?page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (e) {
      console.log('ERROR-Transaction List', e);
      throw e;
    }
  }
  
  async getTransationDetails(id: string) {
    try {
      const response: AxiosResponse<Transaction> =
        await axios.get(`${API_URL}/mobile-tha/transactions/${id}`);
      return response.data;  
    } catch (e) {
      console.log(`ERROR-Transaction Details ${id}`, e);
      throw e;
    }
  }
  
  async updateTransation(id: string) {
    try {
    } catch (e) {
      console.log('ERROR-Transaction Update', e);
      throw e;
    }
  }
}

export const transactionApi = new TransactionApi();