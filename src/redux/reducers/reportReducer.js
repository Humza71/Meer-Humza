import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newReport: {
    firstName: "",
    lastName: "",
    birthday: null,
    gender: "",
    encounterDate: null,
    provider: "",
    technician: "",
    files: [],
  },
};

export const slice = createSlice({
  name: "reportReducer",
  initialState,
  reducers: {
    clearNewReport: (state, action) => {
      state.newReport = initialState.newReport;
    },
    updateNewReport: (state, action) => {
      state.newReport = {
        ...state.newReport,
        ...action.payload,
      };
    },
  },
});

export const { clearNewReport, updateNewReport } = slice.actions;

export default slice.reducer;
