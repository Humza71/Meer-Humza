import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerTitle: "",
  stepNewReport: 0,
};

export const slice = createSlice({
  name: "uiReducer",
  initialState,
  reducers: {
    setHeaderTitle: (state, action) => {
      state.headerTitle = action.payload;
    },
    setStepNewReport: (state, action) => {
      state.stepNewReport = action.payload;
    },
  },
});

export const { setHeaderTitle, setStepNewReport } = slice.actions;

export default slice.reducer;
