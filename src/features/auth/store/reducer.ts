import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '@auth/api';

interface AuthArgs {}
interface AuthState {}
const initialState: AuthState = {}

const signIn = createAsyncThunk(
  'auth/signIn',
  async ({}: AuthArgs) => {
    const response = await authApi.signIn()
  },
);

const signUp = createAsyncThunk(
  'auth/signUp',
  async ({}: AuthArgs) => {
    const response = await authApi.signUp();
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
