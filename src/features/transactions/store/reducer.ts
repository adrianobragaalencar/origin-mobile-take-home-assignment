import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/index';
import { transactionApi } from '@transactions/api';
import { Transactions } from '@transactions/models';

interface TransactionsState {
  transactions: Transactions;
  loading: boolean;
  error?: string;
}

const initialState: TransactionsState = {
  transactions: {} as Transactions,
  loading: false,
  error: undefined,
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({ page, pageSize }: { page: number, pageSize: number }) => {
    return await transactionApi.getTransactions(page, pageSize);
  },
);

export const fetchTransactionDetails = createAsyncThunk(
  'transactions/fetchTransactionDetails',
  async (id: string) => {
    return await transactionApi.getTransationDetails(id);
  },
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
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const allTransactions = (state: RootState) => state.transcations;
export default transactionSlice.reducer;

