import { createSlice } from "@reduxjs/toolkit";
import { addCompany, getCompany } from "services/clientService";

export const LoadingStates = {
  COMPANY_CREATION_LOADING: "Create Company Loading",
};
const initialState = {
  loading: null,
  company: {},
};

export const slice = createSlice({
  name: "clientReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = slice.actions;
dispatch(setLoading(LoadingStates.ALL_COMPANY_LOADING));
export const createCompany = (values) => async (dispatch) => {
  try {
    const response = await addCompany(values);
    if (response.status === 202) {
      console.log("Company Added Successfully");
    }
  } catch (error) {}
  dispatch(setLoading(null));
};

export const getCompanyById = () => async (dispatch) => {
  dispatch(setLoading(LoadingStates.ALL_REPORTS_LOADING));
  // Need to be replaced by the service that does API call

  try {
    const response = await getReports();
    dispatch(
      updateReports({
        response,
      })
    );
  } catch (error) {
    console.log(error, "Erororroor");
  }
  dispatch(setLoading(null));
};
