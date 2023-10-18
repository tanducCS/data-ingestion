import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "home",
  initialState: [],
  reducers: {
    fetchTask: (state, { payload: { theme, darkMode } }) => {
      
    },
    actionB: (state, { payload: { theme, darkMode } }) => {
      if (!state.theme) {
        state.theme = theme;
        state.darkMode = darkMode;
      }
    },
  },
});

export const { actionA, actionB } = slice.actions;

export const homeReducers = slice.reducer;