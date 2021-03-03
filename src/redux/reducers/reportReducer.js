import { createSlice } from "@reduxjs/toolkit";
import { providers, technicians } from "lib/dumyData";

import { setMessage } from "./messageReducer";
import { createNewReport } from "services/reportService";

export const LoadingStates = {
  REPORT_CREATION_LOADING: "Create Report Loading",
};

const initialState = {
  loading: null,
  newReport: {
    id: null,
    first_name: "",
    last_name: "",
    date_of_birth: null,
    gender: "",
    date_encounted: null,
    physician_id: "",
    technician_id: "",
    files: [],
  },
  providers: [],
  technicians: [],
};

export const slice = createSlice({
  name: "reportReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearNewReport: (state, action) => {
      state.newReport = initialState.newReport;
    },
    updateNewReport: (state, action) => {
      state.newReport = {
        ...state.newReport,
        ...action.payload,
      };
    },
    setProviders: (state, action) => {
      state.providers = action.payload;
    },
    addItemToProviders: (state, action) => {
      state.providers.push(action.payload);
    },
    setTechnicians: (state, action) => {
      state.technicians = action.payload;
    },
    addItemToTechnicians: (state, action) => {
      state.technicians.push(action.payload);
    },
  },
});

export const { clearNewReport, updateNewReport } = slice.actions;
const {
  setProviders,
  setTechnicians,
  setLoading,
  addItemToProviders,
  addItemToTechnicians,
} = slice.actions;

export const getAllProviders = () => (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  // Need to be replaced by the service that does API call
  dispatch(setProviders(providers));
  dispatch(setLoading(null));
};

export const getAllTechnicians = () => (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  // Need to be replaced by the service that does API call
  dispatch(setTechnicians(technicians));
  dispatch(setLoading(null));
};

export const addProvider = (newProvider, save) => (dispatch) => {
  dispatch(addItemToProviders(newProvider));
  if (save) {
    // Do API Call to save newProvider
  }
};

export const addTechnician = (newTechnician, save) => (dispatch) => {
  dispatch(addItemToTechnicians(newTechnician));
  if (save) {
    // Do API Call to save newTechnician
  }
};

export const saveReport = (report) => async (dispatch) => {
  try {
    if (report.id) {
      // Call Update Report API
    } else {
      // Create Report API
      const report_id = await createNewReport(report);
      dispatch(
        updateNewReport({
          ...report,
          id: report_id,
        })
      );
    }
  } catch (error) {
    dispatch(setMessage({ message: error.message }));
  }
};

export default slice.reducer;
