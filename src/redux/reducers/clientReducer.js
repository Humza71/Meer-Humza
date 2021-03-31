import { createSlice } from "@reduxjs/toolkit";
import { addCompany, getAllCompany, getCompany } from "services/clientService";

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
} = slice.actions;

export const createCompany = (values) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.COMPANY_CREATION_LOADING));
  try {
    const response = await addCompany(values);
    if (response.status === 200) {
      console.log("Company Added Successfully");
    }
  } catch (error) {}
  dispatch(setLoading(null));
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
    console.log(error, "Erororroor");
  }
  dispatch(setLoading(null));
};

export default slice.reducer;
