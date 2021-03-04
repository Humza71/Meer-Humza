import { createSlice } from "@reduxjs/toolkit";
// import { providers, technicians } from "lib/dumyData";
// import { postUtil } from "../../utils/apiService";
import {
  createReport,
  getReport,
  getProviders,
  getTechnicians,
  saveProvider,
  saveTechnician,
} from "../../services/reportService";
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
    encounterDate: null,
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
      const { patientDemographics = {} } = action.payload || {};
      state.newReport = {
        ...patientDemographics,
      };
    },
    setProviders: (state, action) => {
      state.providers = [];
    },
    addItemToProviders: (state, action) => {
      state.providers.push(action.payload);
    },
    setTechnicians: (state, action) => {
      state.technicians = [];
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

export const getAllProviders = () => async (dispatch) => {
  // dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  // Need to be replaced by the service that does API call

  try {
    const response = await getProviders();

    dispatch(setProviders({ ...response.map(({ providers }) => providers) }));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  //dispatch(setProviders(providers));
  // dispatch(setLoading(null));
};

export const updateReport = (values, onSuccess) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const response = await createReport(values, onSuccess);
    dispatch(
      updateNewReport({
        ...values,
      })
    );
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  dispatch(setLoading(null));
};

export const getAllTechnicians = () => async (dispatch) => {
  // dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  // Need to be replaced by the service that does API call

  try {
    const response = await getTechnicians();

    dispatch(
      setTechnicians({ ...response.map(({ technicians }) => technicians) })
    );
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  // dispatch(setTechnicians(technicians));
  // dispatch(setLoading(null));
};

export const getReportById = (id) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  // Need to be replaced by the service that does API call

  try {
    const response = await getReport(id);
    dispatch(
      updateNewReport({
        ...response.data,
      })
    );
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  // dispatch(setTechnicians(technicians));
  dispatch(setLoading(null));
};

export const addProvider = (newProvider, save) => async (dispatch) => {
  dispatch(addItemToProviders(newProvider));
  if (save) {
    try {
      const response = await saveProvider(newProvider);
      if (response) {
        console.log("providerAddedSuccessfully");
      }
    } catch (error) {
      // dispatch(setMessage({ message: "Email or password already exist!" }));
    }
    // Do API Call to save newProvider
  }
};

export const addTechnician = (newTechnician, save) => async (dispatch) => {
  dispatch(addItemToTechnicians(newTechnician));
  if (save) {
    try {
      const response = await saveTechnician(newTechnician);
      if (response) {
        console.log("providerAddedSuccessfully");
      }
    } catch (error) {
      // dispatch(setMessage({ message: "Email or password already exist!" }));
    }
    // Do API Call to save newTechnician
  }
};

export default slice.reducer;
