import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import { transactionApi } from '@transactions/api';
import { Transactions, Transaction } from '@transactions/models';

interface TransactionsState {
  transactions: Transactions;
  details?: Transaction;
  loading: boolean;
  error?: string;
}

const initialState: TransactionsState = {
  transactions: {} as Transactions,
  details: undefined,
  loading: false,
  error: undefined,
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({ page, pageSize }: { page: number, pageSize: number }) =>
    await transactionApi.getTransactions(page, pageSize),
);

export const fetchTransactionDetails = createAsyncThunk(
  'transactions/fetchTransactionDetails',
  async (id: number) => await transactionApi.getTransationDetails(id),
);

export const updateTransactionLocation = createAsyncThunk(
  'transactions/updateTransactionLocation',
  async ({ id, lat, lon }: { id: number, lat: number, lon: number }) =>
    await transactionApi.updateTransationCoord(id, lat, lon),
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.error = undefined;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchTransactionDetails.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTransactionDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
        state.error = undefined;
      })
      .addCase(fetchTransactionDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });      

    builder
      .addCase(updateTransactionLocation.pending, state => {
        state.loading = true;
      })
      .addCase(updateTransactionLocation.fulfilled, (state) => {
        state.loading = false;
        state.error = undefined;
      })
      .addCase(updateTransactionLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
  },
});

export const allTransactions = (state: RootState) => state.transcations;
export const transactionDetails = (state: RootState) => state.transcations;
export default transactionSlice.reducer;

