import { createSlice } from '@reduxjs/toolkit';
import { UserType, authApi } from '../../app/services/auth';
import { RootState } from '../../app/store';

export interface AuthState {
  user: (UserType & { token: string }) | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  // initial values
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },

  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    );

    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    );

    builder.addMatcher(
      authApi.endpoints.current.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    );
  },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice;
