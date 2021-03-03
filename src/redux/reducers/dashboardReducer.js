import { createSlice } from "@reduxjs/toolkit";
// import { providers, technicians } from "lib/dumyData";
// import { postUtil } from "../../utils/apiService";
import {getReports} from "../../services/allReportsService"

export const LoadingStates = {
  ALL_REPORTS_LOADING: "All Report Loading",
};

const initialState = {
  loading: null,
  allReports: [],
};

export const slice = createSlice({
  name: "dashboardReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateReports: (state, action) => {
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
      updateReports({
        payload: response.data,
      })
    );
  } catch (error) {
    console.log(error, "Erororroor");
   
  }
  dispatch(setLoading(null));
};

// export const getReportsApi = async (credentials) => {

//   return new Promise((resolve, reject) => {
//     http: postUtil("/api/add/patient-demographics", credentials)
//       .then((response) => {
//         console.log(response.data);
//         if (response.status === 200) {
//           resolve(response.data);
//         }
//         reject(response.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

export default slice.reducer;
