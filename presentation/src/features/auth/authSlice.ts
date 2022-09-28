import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import agent from '../../app/api/agent';
import { User, LoginDto } from '../../app/models/user';
import { history } from '../../index';

interface AuthState {
  user: User | null;
}

const initialState = {
  user: null,
} as AuthState;

export const loginUser = createAsyncThunk<User, FieldValues>(
  'auth/loginUser',
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.AuthStore.login(data);
      userDto.token &&
        window.localStorage.setItem('currentUser', JSON.stringify(userDto));
      return userDto;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(
      setUser(JSON.parse(localStorage.getItem('currentUser')!))
    );
    try {
      const userDto = await agent.AuthStore.fetchCurrentUser();
      const { ...user } = userDto;
      window.localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('currentUser')) return false;
    },
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: any) => {
      state.user = null;
      window.localStorage.removeItem('currentUser');
      const lastViewedPosts = window.localStorage.getItem('lastViewedPosts');
      lastViewedPosts && window.localStorage.removeItem('lastViewedPosts');
      history.push('/');
    },
    setUser: (state: any, action: any) => {
      state.user = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      window.localStorage.removeItem('currentUser');
      toast.error('Your session has expired! Please login again to use app');
      history.push('/');
    });
    builder.addMatcher(
      isAnyOf(loginUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = { ...action.payload };
      }
    );
    builder.addMatcher(isAnyOf(loginUser.rejected), (state, action) => {
      throw action.payload;
    });
  },
});

export const { logout, setUser } = authSlice.actions;
