import { createSlice } from "@reduxjs/toolkit";
import { providers, technicians } from "lib/dumyData";
// import { postUtil } from "../../utils/apiService";
import { createReport } from "../../services/reportService";

// import { setMessage } from "./messageReducer";
// import { createNewReport } from "services/reportService";

export const LoadingStates = {
  REPORT_CREATION_LOADING: "Create Report Loading",
};

const initialState = {
  loading: null,
  newReport: {
    firstName: "",
    lastName: "",
    dob: null,
    gender: "",
    date_encounted: null,
    physician_id: "",
    technician_id: "",
    files: [],
  },
  providers: [],
  technicians: [],
  completed: true,
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

export const updateReport = (values) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await createReport(values);
    dispatch(
      updateNewReport({
        ...values,
      })
    );
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  dispatch(setLoading(false));
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

export default slice.reducer;
