/* eslint-disable no-param-reassign */
import {createSelector, createSlice} from '@reduxjs/toolkit';

import type {RootState} from '@/store';

interface ThemeState {
  theme: 'dark' | 'light';
}

const initialState: ThemeState = {
  theme: window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDark: state => {
      state.theme = 'dark';
    },
    setLight: state => {
      state.theme = 'light';
    },
    toggleTheme: state => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const isDarkSelector = createSelector(
  (state: RootState) => state.theme.theme,
  theme => theme === 'dark'
);
export const isLightSelector = createSelector(
  (state: RootState) => state.theme.theme,
  theme => theme === 'light'
);

export const {setDark, setLight, toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;
