import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '@api/authApi';
import { getUserAction } from '@slices/userSlice';
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  accessToken: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await login(credentials);
      dispatch(getUserAction(response.data.user.token));
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await register(data);
      dispatch(getUserAction(response.data.user.token));
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const logOut = createAsyncThunk('auth/logOut', async () => {
  return null;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    checkTokenExpiration: (state) => {
      if (state.accessToken) {
        const decodedToken = jwtDecode(state.accessToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          state.isAuthenticated = false;
          state.accessToken = null;
          localStorage.removeItem('token');
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.token;
        state.user = action.payload.email;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action)
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.token;
        state.user = action.payload.email;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.errors;
        console.log(action.payload.errors)
      });
  }
});

export const { logout, checkTokenExpiration } = authSlice.actions;
export default authSlice.reducer;
