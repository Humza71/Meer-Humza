import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerTitle: "",
};

export const slice = createSlice({
  name: "uiReducer",
  initialState,
  reducers: {
    setHeaderTitle: (state, action) => {
      state.headerTitle = action.payload;
    },
  },
});

export const { setHeaderTitle } = slice.actions;

export default slice.reducer;
