import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '@auth/api';
import { User } from '@auth/models';

interface AuthState {
  user?: User;
  loading: boolean;
  error?: string;
}

const initialState: AuthState = {
  user: undefined,
  loading: false,
  error: undefined,
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password } : { email: string, password: string }) => {
    return await authApi.signIn(email, password);
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ 
    name,
    email,
    password,
    photo,
  } : {
    name: string,
    email: string,
    password: string,
    photo?: string,
  }) => {
    return await authApi.signUp(name, email, password, photo);
  },
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => await authApi.signOut(),
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async () => await authApi.getUser(),
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState(state) {
      state.user = undefined;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(signIn.pending, state => {
      state.loading = true;
    })
    .addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = undefined;
    })
    .addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(signUp.pending, state => {
      state.loading = true;
    })
    .addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = undefined;
    })
    .addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(signOut.pending, state => {
      state.loading = true;
    })
    .addCase(signOut.fulfilled, (state) => {
      state.loading = false;
      state.user = undefined;
      state.error = undefined;
    })
    .addCase(signOut.rejected, (state) => {
      state.loading = false;
      state.user = undefined;
    });


    builder.addCase(getUser.pending, state => {
      state.loading = true;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
