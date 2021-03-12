import { createSlice } from "@reduxjs/toolkit";
import initial from "./dataModel";
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
  posturalStability,
  getPosturalStabilityById,
  addVng,
  getVngById,
  addRotaryChair,
  getRotaryChairById,
  addVHit,
  getVHitById,
  addVat,
  getVatById,
  addElectrophys,
  getElectrophysById,
  addAudiometry,
  getAudiometryById,
  addScreenings,
  getScreeningsById,
  addTestComments,
  getTestCommentsById,
  addImpressionPlan,
  getImpressionPlanById,
} from "../../services/reportService";
// import { setMessage } from "./messageReducer";
// import { createNewReport } from "services/reportService";

export const LoadingStates = {
  REPORT_CREATION_LOADING: "Create Report Loading",
};

const initialState = initial;

export const slice = createSlice({
  name: "reportReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearNewReport: (state, action) => {
      state.newReport = initialState.newReport;
      state.history = initialState.history;
      state.posturalStability = initialState.posturalStability;
      state.vng = initialState.vng;
      state.rotaryChair = initialState.rotaryChair;
      state.vHit = initialState.vHit;
      state.vatVorteq = initialState.vatVorteq;
      state.electrophys = initialState.electrophys;
      state.audiometry = initialState.audiometry;
      state.screenings = initialState.screenings;
      state.comments = initialState.comments;
    },
    updateNewReport: (state, action) => {
      const { patientDemographics = {} } = action.payload || {};
      state.newReport = {
        ...patientDemographics,
      };
      state.completed = true;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
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
      if (action.payload.response) {
        debugger;
        state.history.presentIllness = action.payload.response.presentIllness;
        state.history.auralSymptom = action.payload.response.auralSymptom;
        state.history.healthCondition = action.payload.response.healthCondition;
      }
    },
    setPosturalStability: (state, action) => {
      if (action.payload) {
        state.posturalStability.cdpTest = action.payload.cdpTest;
        state.posturalStability.gsoTest = action.payload.gsoTest;
      }
    },
    setVng: (state, action) => {
      if (action.payload) {
        state.vng.oculuMotors = action.payload.oculuMotors;
        state.vng.gazeEnabled = action.payload.gazeEnabled;
        state.vng.positionEnabled = action.payload.positionEnabled;
        state.vng.positionDenied = action.payload.positionDenied;
        state.vng.calorics = action.payload.calorics;
        state.vng.hallPick = action.payload.hallPick;
        state.vng.highFrequecy = action.payload.highFrequecy;
        state.vng.gazeDenied = action.payload.gazeDenied;
      }
    },
    setRotaryChair: (state, action) => {
      if (action.payload) {
        state.rotaryChair = action.payload.rotaryChair;
      }
      // state.posturalStability.cdpTest = action.payload.cdpTest;
      // state.posturalStability.gsoTest = action.payload.gsoTest;
    },
    setVHit: (state, action) => {
      if (action.payload.vHIT) {
        state.vHit.ralp = action.payload.vHIT.ralp;
        state.vHit.larp = action.payload.vHIT.larp;
        state.vHit.lateral = action.payload.vHIT.lateral;
        state.vHit.notes = action.payload.vHIT.notes;
      }
    },
    setVatVorteq: (state, action) => {
      if (action.payload.vatVorteq) {
        state.vatVorteq.lateral = action.payload.vatVorteq.lateral;
        state.vatVorteq.vertical = action.payload.vatVorteq.vertical;
        state.vatVorteq.notes = action.payload.vatVorteq.notes;
      }
    },
    setElectrophys: (state, action) => {
      if (action.payload.electrophys) {
        state.electrophys.abr = action.payload.electrophys.abr;
        state.electrophys.eco = action.payload.electrophys.eco;
        state.electrophys.cvemp = action.payload.electrophys.cvemp;
        state.electrophys.ovemp = action.payload.electrophys.ovemp;
      }
    },
    setAudiometry: (state, action) => {
      if (action.payload.audiometry) {
        state.audiometry.otoscopy = action.payload.audiometry.otoscopy;
        state.audiometry.ai = action.payload.audiometry.ai;
        state.audiometry.oe = action.payload.audiometry.oe;
        state.audiometry.audiogram = action.payload.audiometry.audiogram;
      }
    },
    setScreenings: (state, action) => {
      if (action.payload.screenings) {
        state.screenings.vast = action.payload.screenings.vast;
        state.screenings.cervical = action.payload.screenings.cervical;
        state.screenings.actuity = action.payload.screenings.actuity;
        state.screenings.impulse = action.payload.screenings.impulse;
      }
    },
    setComments: (state, action) => {
      if (action.payload.testComments) {
        state.comments = action.payload.testComments;
      }
    },
    setImpression: (state, action) => {
      if (action.payload.impression) {
        state.impression = action.payload.impressionPlan;
      }
    },
  },
});

export const { clearNewReport, updateNewReport, setCompleted } = slice.actions;
const {
  setVng,
  setPosturalStability,
  setProviders,
  setTechnicians,
  setLoading,
  addItemToProviders,
  addItemToTechnicians,
  setHistory,
  setRotaryChair,
  setVHit,
  setVatVorteq,
  setElectrophys,
  setAudiometry,
  setScreenings,
  setComments,
  setImpression,
} = slice.actions;

export const updateReport = (values, onSuccess) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    await createReport(values, onSuccess);
    // dispatch(
    //   updateNewReport({
    //     ...values,
    //   })
    // );
    dispatch(setCompleted({ payload: true }));
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
  try {
    const response = await saveProvider(newProvider);
    if (response) {
      console.log("providerAddedSuccessfully");
    }
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  // Do API Call to save newProvider
};

export const addTechnician = (newTechnician, save) => async (dispatch) => {
  dispatch(addItemToTechnicians(newTechnician));
  try {
    const response = await saveTechnician(newTechnician);
    if (response) {
      console.log("providerAddedSuccessfully");
    }
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  // Do API Call to save newTechnician
};

export const historyReport = (values) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    await patientHistory(values);
    // dispatch(
    //   updateNewReport({
    //     ...values,
    //   })
    // );
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  dispatch(setLoading(null));
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

export const posturalStabilityReport = (values) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    await posturalStability(values);
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  dispatch(setLoading(null));
};

export const getPosturalStability = (values) => async (dispatch) => {
  try {
    const response = await getPosturalStabilityById(values);
    dispatch(setPosturalStability(response.data.postureStability));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
};

export const vngReport = (values) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    await addVng(values);
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  dispatch(setLoading(null));
};

export const getVng = (values) => async (dispatch) => {
  try {
    const response = await getVngById(values);
    dispatch(setVng(response.data.vng));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
};

export const rotaryChairReport = (values) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    await addRotaryChair(values);
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  dispatch(setLoading(null));
};

export const getRotaryChair = (values) => async (dispatch) => {
  try {
    const response = await getRotaryChairById(values);
    dispatch(setRotaryChair(response.data));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
};

export const vHitReport = (values) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const response = await addVHit(values);
    if (response) {
      console.log("vHIT added Successfully");
    }
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  dispatch(setLoading(null));
};

export const getVHit = (values) => async (dispatch) => {
  try {
    const response = await getVHitById(values);
    dispatch(setVHit(response.data));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
};

export const vatVorteqReport = (values) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const response = await addVat(values);
    if (response) {
      console.log("Vat/Vorteq added Successfully");
    }
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  dispatch(setLoading(null));
};

export const getVatVorteq = (values) => async (dispatch) => {
  try {
    const response = await getVatById(values);
    dispatch(setVatVorteq(response.data));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
};

export const electrophysReport = (values) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const response = await addElectrophys(values);
    if (response) {
      console.log("Electrophys added Successfully");
    }
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  dispatch(setLoading(null));
};

export const getElectrophys = (values) => async (dispatch) => {
  try {
    const response = await getElectrophysById(values);
    dispatch(setElectrophys(response.data));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
};

export const audiometryReport = (values) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const response = await addAudiometry(values);
    if (response) {
      console.log("Audiometry added Successfully");
    }
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  dispatch(setLoading(null));
};

export const getAudiometry = (values) => async (dispatch) => {
  try {
    const response = await getAudiometryById(values);
    dispatch(setAudiometry(response.data));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
};

export const screeningsReport = (values) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const response = await addScreenings(values);
    if (response) {
      console.log("Screenings added Successfully");
    }
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  dispatch(setLoading(null));
};

export const getScreenings = (values) => async (dispatch) => {
  try {
    const response = await getScreeningsById(values);
    dispatch(setScreenings(response.data));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
};

export const CommentsReport = (values) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const response = await addTestComments(values);
    if (response) {
      console.log("Comments added Successfully");
    }
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  dispatch(setLoading(null));
};

export const getComments = (values) => async (dispatch) => {
  try {
    const response = await getTestCommentsById(values);

    dispatch(setComments(response.data));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
};

export const impressionPlanReport = (values) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const response = await addImpressionPlan(values);
    if (response) {
      console.log("Comments added Successfully");
    }
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  dispatch(setLoading(null));
};

export const getImpressionPlan = (values) => async (dispatch) => {
  try {
    const response = await getImpressionPlanById(values);

    dispatch(setImpression(response.data));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
};

export default slice.reducer;
