/* eslint-disable no-param-reassign */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface User {
  fullname: string;
  username: string;
  email: string;
  password?: string;
}

interface LoginState {
  isAuth: boolean;
  user: User | null;
  registeredUser: User[];
}

const initialState: LoginState = {
  isAuth: false,
  user: null,
  registeredUser: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    doLogin: (state, {payload}: PayloadAction<User>) => {
      state.isAuth = true;
      state.user = payload;
    },
    doLogout: state => {
      state.isAuth = false;
      state.user = null;
    },
    doRegister: (state, {payload}: PayloadAction<User>) => {
      state.registeredUser.push(payload);
    },
  },
});

export const {doLogin, doLogout, doRegister} = authSlice.actions;

export default authSlice.reducer;
