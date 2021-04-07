import { createSlice } from "@reduxjs/toolkit";
import {
  addCompany,
  getAllCompany,
  getCompany,
  updateCompany,
  deleteClinic,
} from "services/clientService";

export const LoadingStates = {
  COMPANY_CREATION_LOADING: "Create Company Loading",
};
const initialState = {
  loading: null,
  allClinics: [],
  clinic: {},
};

export const slice = createSlice({
  name: "clientReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllClinics: (state, action) => {
      state.allClinics = action.payload;
    },
    setClinic: (state, action) => {
      state.clinic = action.payload;
    },
    setClinics: (state, action) => {
      const newClinics = state.allClinics.filter(
        ({ _id }) => _id !== action.payload
      );
      state.allClinics = [...newClinics];
    },
    clearClinic: (state, action) => {
      state.clinic = initialState.clinic;
    },
  },
});

export const {
  setLoading,
  setAllClinics,
  setClinic,
  clearClinic,
  setClinics,
} = slice.actions;

export const createCompany = (values, onCreationCompany) => async (
  dispatch
) => {
  dispatch(setLoading(LoadingStates.COMPANY_CREATION_LOADING));
  try {
    const response = await addCompany(values);
    if (response.status === 200) {
      onCreationCompany();
      console.log("Company Added Successfully");
    }
  } catch (error) {}
  dispatch(setLoading(null));
};

export const editCompanyById = (values, onSubmitForm) => async (dispatch) => {
  // dispatch(setLoading(LoadingStates.COMPANY_CREATION_LOADING));
  try {
    const response = await updateCompany(values);
    if (response.status === 200) {
      dispatch(getAllClinic());
      dispatch(clearClinic());
      onSubmitForm();
      console.log("Company Edit Successfully");
    }
  } catch (error) {}
  // dispatch(setLoading(null));
};

export const getAllClinic = () => async (dispatch) => {
  dispatch(setLoading(LoadingStates.COMPANY_CREATION_LOADING));
  // Need to be replaced by the service that does API call

  try {
    const response = await getAllCompany();
    if (response.status === "SUCCESS") {
      dispatch(setAllClinics(response.data));
    }
  } catch (error) {
    console.log(error, "Erororroor");
  }
  dispatch(setLoading(null));
};

export const getCompanyById = (id) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.COMPANY_CREATION_LOADING));
  // Need to be replaced by the service that does API call

  try {
    const response = await getCompany(id);
    if (response.status === "SUCCESS") {
      dispatch(setClinic(response.data));
    }
  } catch (error) {
    console.log(error, "Error");
  }
  dispatch(setLoading(null));
};

export const deleteClinicById = (id, handleDeleteDialogue) => async (
  dispatch
) => {
  // dispatch(setLoading(LoadingStates.DELETE_REPORT_LOADING));
  // Need to be replaced by the service that does API call

  try {
    const response = await deleteClinic(id);
    if (response.status === 200) {
      dispatch(setClinics(id));
      handleDeleteDialogue();
      console.log("Clinic deleted successfully");
    }
  } catch (error) {
    console.log(error, "Error");
  }
  // dispatch(setLoading(null));
};

export default slice.reducer;
