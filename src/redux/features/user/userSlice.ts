import { auth } from '@/lib/firebase';
import { RootState } from '@/redux/store';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

interface IInitialState {
  userData: User | undefined;
  isAuthenticate: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}
export interface ILoginPayload {
  email: string;
  password: string;
}
const initialState: IInitialState = {
  userData: undefined,
  isAuthenticate: false,
  isLoading: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'user/create',
  async ({ email, password }: ILoginPayload) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: ILoginPayload) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatedUser: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticate = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.isError = !!action.payload;
      state.error = action.payload;
    },
    setSignOut: (state) => {
      state.isAuthenticate = false;
      state.userData = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isError = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isAuthenticate = true;
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isAuthenticate = false;
        state.isLoading = false;
        state.error = action.error.message as string;
        state.userData = undefined;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticate = true;
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticate = false;
        state.isLoading = false;
        state.error = action.error.message!;
        state.userData = undefined;
      });
  },
});

export const {
  updatedUser,
  setError,
  setLoading,
  setUserAuthentication,
  setSignOut,
} = userSlice.actions;

export const getUserState = (state: RootState) => state.user;

export default userSlice.reducer;
