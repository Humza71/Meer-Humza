import { createSlice } from "@reduxjs/toolkit";
import { providers, technicians } from "lib/dumyData";
import { postUtil } from "../../utils/apiService";

export const LoadingStates = {
  ALL_REPORTS_LOADING: "All Report Loading",
};

const initialState = {
  loading: null,
  allReports: [],
};

export const slice = createSlice({
  name: "reportReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    getDashboardReports: (state, action) => {
      state.allReports = {
        ...state.allReports,
        ...action.payload,
      };
    },
  },
});

// export const { clearNewReport, updateNewReport } = slice.actions;
const {
  getAllReports,
  setLoading,
} = slice.actions;

export const getAllReports = () => (dispatch) => {
  dispatch(setLoading(LoadingStates.ALL_REPORTS_LOADING));
  // Need to be replaced by the service that does API call
    
     try {
    const response = await getReports(values);
    console.log("hereeeeeeeeeeeeeeeee is my response", response);
    dispatch(
      getDashboardReports({
        
      })
    );
  } catch (error) {
    debugger;
    console.log(error, "Erororroor");
   
  }
  dispatch(setLoading(null));
};

export const getReports = async (credentials) => {
  debugger;
  return new Promise((resolve, reject) => {
    http: postUtil("/api/add/patient-demographics", credentials)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          debugger;
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default slice.reducer;
