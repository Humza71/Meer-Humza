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
  patientHistory,
  getHistoryById,
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
  completed: false,
  history: {},
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
    setCompleted: (state, action) => {
      state.completed = true;
    },
    setProviders: (state, action) => {
      state.providers = action.payload;
    },
    addItemToProviders: (state, action) => {
      state.providers.push({ name: action.payload });
    },
    setTechnicians: (state, action) => {
      state.technicians = action.payload;
    },
    addItemToTechnicians: (state, action) => {
      state.technicians.push({ name: action.payload });
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { clearNewReport, updateNewReport } = slice.actions;
const {
  setCompleted,
  setProviders,
  setTechnicians,
  setLoading,
  addItemToProviders,
  addItemToTechnicians,
  setHistory,
} = slice.actions;

export const updateReport = (values, onSuccess) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const response = await createReport(values, onSuccess);
    // dispatch(
    //   updateNewReport({
    //     ...values,
    //   })
    // );
    dispatch(setCompleted());
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  dispatch(setLoading(null));
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
    // dispatch(
    //   setHistory({
    //     ...response.data.history,
    //   })
    // );
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  // dispatch(setTechnicians(technicians));
  dispatch(setLoading(null));
};

export const getAllProviders = () => async (dispatch) => {
  // dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  // Need to be replaced by the service that does API call

  try {
    const response = await getProviders();

    dispatch(setProviders(response));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  //dispatch(setProviders(providers));
  // dispatch(setLoading(null));
};

export const getAllTechnicians = () => async (dispatch) => {
  // dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  // Need to be replaced by the service that does API call

  try {
    const response = await getTechnicians();

    dispatch(setTechnicians(response));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  // dispatch(setTechnicians(technicians));
  // dispatch(setLoading(null));
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

export const historyReport = (values) => async (dispatch) => {
  // dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const response = await patientHistory(values);
    // dispatch(
    //   updateNewReport({
    //     ...values,
    //   })
    // );
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  // dispatch(setLoading(null));
};

export const getHistoryReport = (values) => async (dispatch) => {
  // dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const response = await getHistoryById(values);
    dispatch(
      setHistory({
        response,
      })
    );
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  // dispatch(setLoading(null));
};

export default slice.reducer;
