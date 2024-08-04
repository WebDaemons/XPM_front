import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../api/authApi';
import { getUserAction } from '../slices/userSlice';

const initialState = {
    user: null,
    accessToken: localStorage.getItem('token') || null, 
    refreshToken: null,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { dispatch }) => {
    const response = await login(credentials);
    dispatch(getUserAction(response.data.user.token));
    return response.data.user;
});

export const registerUser = createAsyncThunk('auth/registerUser', async (data, { dispatch }) => {
    const response = await register(data);
    dispatch(getUserAction(response.data.user.token));
    return response.data.user;
});

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
            state.refreshToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token'); 
        },
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
                state.refreshToken = action.payload.refresh;
                state.user = action.payload.email;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.accessToken = action.payload.token;
                state.refreshToken = action.payload.refresh;
                state.user = action.payload.email;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;