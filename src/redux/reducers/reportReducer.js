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
  getMacros,
  getMacrosByName,
} from "../../services/reportService";
// import { setMessage } from "./messageReducer";
// import { createNewReport } from "services/reportService";

import { getPdf } from "redux/reducers/dashboardReducer";

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
      state.impression = initialState.impression;
      state.selectedMacros = initialState.selectedMacros;
      state.macros = initialState.macros;
      state.selectedMacros = initialState.selectedMacros;
    },
    updateNewReport: (state, action) => {
      const { patientDemographics = {} } = action.payload || {};
      if (patientDemographics) {
        state.newReport = {
          ...patientDemographics,
        };
        state.completed = true;
      }
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
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
    setHistory: (state, action) => {
      if (action.payload.response) {
        state.history.presentIllness = action.payload.response.presentIllness;
        state.history.auralSymptom = action.payload.response.auralSymptom;
        state.history.healthCondition = action.payload.response.healthCondition;
      }
    },
    setPosturalStability: (state, action) => {
      if (action.payload) {
        state.posturalStability.computerizedDynamicPosturography =
          action.payload.computerizedDynamicPosturography;
        state.posturalStability.gsPerformanceTest =
          action.payload.gsPerformanceTest;
      }
    },
    setVng: (state, action) => {
      if (action.payload) {
        state.vng.oculoMotors = action.payload.oculoMotors;
        state.vng.gazeVisionEnabled = action.payload.gazeVisionEnabled;
        state.vng.positionalsVisionEnabled =
          action.payload.positionalsVisionEnabled;
        state.vng.positionalsVisionDenied =
          action.payload.positionalsVisionDenied;
        state.vng.calorics = action.payload.calorics;
        state.vng.hallPike = action.payload.hallPike;
        state.vng.highFrequencyHeadshake = {
          ...initial.vng.highFrequencyHeadshake,
          ...action.payload.highFrequencyHeadshake,
        };
        state.vng.gazeVisionDenied = action.payload.gazeVisionDenied;
      }
    },
    setRotaryChair: (state, action) => {
      if (action.payload) {
        state.rotaryChair = action.payload;
      }
      // state.posturalStability.cdpTest = action.payload.cdpTest;
      // state.posturalStability.gsoTest = action.payload.gsoTest;
    },
    setVHit: (state, action) => {
      if (action.payload) {
        state.vHit.ralp = action.payload.ralp;
        state.vHit.larp = action.payload.larp;
        state.vHit.lateral = action.payload.lateral;
        state.vHit.notes = action.payload.notes;
      }
    },
    setVatVorteq: (state, action) => {
      if (action.payload) {
        state.vatVorteq.lateral = action.payload.lateral;
        state.vatVorteq.vertical = action.payload.vertical;
        state.vatVorteq.notes = action.payload.notes;
      }
    },
    setElectrophys: (state, action) => {
      if (action.payload) {
        state.electrophys.auditoryBrainstemResponse =
          action.payload.auditoryBrainstemResponse;
        state.electrophys.electroCochleoGraphy =
          action.payload.electroCochleoGraphy;
        state.electrophys.cervicalVestibularEvokedMyogenicPotential =
          action.payload.cervicalVestibularEvokedMyogenicPotential;
        state.electrophys.ocularVestibularEvokedMyogenicPotential =
          action.payload.ocularVestibularEvokedMyogenicPotential;
      }
    },
    setAudiometry: (state, action) => {
      if (action.payload) {
        state.audiometry.otoscopy = action.payload.otoscopy;
        state.audiometry.acousticImmittance = action.payload.acousticImmittance;
        state.audiometry.otoacousticEmissions =
          action.payload.otoacousticEmissions;
        state.audiometry.audioGram = action.payload.audioGram;
      }
    },
    setScreenings: (state, action) => {
      if (action.payload) {
        state.screenings.vertebralArteryScreeningTest =
          action.payload.vertebralArteryScreeningTest;
        state.screenings.cervicalDizzinessScreeningTest =
          action.payload.cervicalDizzinessScreeningTest;
        state.screenings.aibComputerizedDynamicVisualAcuityTest = {
          ...initial.screenings.aibComputerizedDynamicVisualAcuityTest,
          ...action.payload.aibComputerizedDynamicVisualAcuityTest,
        };
        state.screenings.headImpulseTest = action.payload.headImpulseTest;
      }
    },
    setComments: (state, action) => {
      if (action.payload) {
        state.comments = action.payload;
      }
    },
    setImpression: (state, action) => {
      if (action.payload) {
        state.impression.impressionAndPlan.overAllImpression =
          action.payload.overAllImpression;
        // state.impression.impressionAndPlan.macro = action.payload.macro;
        state.selectedMacros = [...action.payload.macro];
        // state.macrosForForm = [...action.payload.macro];
      }
    },
    addMacro: (state, action) => {
      if (action.payload) {
        state.selectedMacros = [
          ...state.selectedMacros,
          action.payload.newData,
        ];
        state.impression.impressionAndPlan.overAllImpression =
          action.payload.overAllImpression;
      }
    },

    setMacros: (state, action) => {
      if (action.payload) {
        state.macros = action.payload;
      }
    },
    updateMacro: (state, action) => {
      // const array = [...state.selectedMacros];
      // const newArray = array.filter(
      //   (item, index) => index !== action.payload.macroIndex
      // );
      var newArray = [...state.selectedMacros];
      newArray.splice(action.payload.macroIndex, 1);

      if (action.payload) {
        state.selectedMacros = [...newArray];
        state.impression.impressionAndPlan.overAllImpression =
          action.payload.overAllImpression;
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
  setMacros,
  addMacro,
  updateMacro,
  // setNormality,
} = slice.actions;

export const updateReport = (values, onSuccess) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const res = await createReport(values, onSuccess);
    if (res) {
      onSuccess(res);
      dispatch(updateNewReport({ patientDemographics: values }));
      dispatch(setCompleted({ payload: true }));
    }
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
  // dispatch(addItemToProviders(newProvider));
  try {
    const response = await saveProvider(newProvider);
    if (response) {
      dispatch(addItemToProviders({ name: newProvider, id: response.data.id }));
      console.log("providerAddedSuccessfully");
    }
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  // Do API Call to save newProvider
};

export const addTechnician = (newTechnician, save) => async (dispatch) => {
  // dispatch(addItemToTechnicians(newTechnician));
  try {
    const response = await saveTechnician(newTechnician);
    if (response) {
      dispatch(
        addItemToTechnicians({ name: newTechnician, id: response.data.id })
      );
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
    dispatch(setPosturalStability(response));
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
    dispatch(setVng(response.data));
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

export const impressionPlanReport = (values, generateReport) => async (
  dispatch
) => {
  dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const response = await addImpressionPlan(values);
    if (response.status === "SUCCESS") {
      if (generateReport) {
        dispatch(getPdf(response.data[0]));
      }
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

export const allMacros = () => async (dispatch) => {
  // dispatch(setLoading(LoadingStates.REPORT_CREATION_LOADING));
  try {
    const response = await getMacros();

    dispatch(setMacros(response.data));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
  dispatch(setLoading(null));
};

export const macrosByName = (values) => async (dispatch) => {
  try {
    const response = await getMacrosByName(values);
    const data = {
      newData: { ...response.data },
      overAllImpression: values.overAllImpression,
    };

    dispatch(addMacro(data));
    // dispatch(setNormality(values.overAllImpression));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }
};

export const updateMacros = (values) => async (dispatch) => {
  dispatch(updateMacro(values));
  // dispatch(setNormality(values.overAllImpression));
};

export default slice.reducer;
