import { createSlice } from "@reduxjs/toolkit";
// import { providers, technicians } from "lib/dumyData";
// import { postUtil } from "../../utils/apiService";
import { getReports, getPdfReports } from "../../services/allReportsService";

export const LoadingStates = {
  ALL_REPORTS_LOADING: "All Report Loading",
  PDF_LOADING: "Pdf Loading",
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
      state.allReports = [...action.payload.response];
    },
  },
});

// export const { clearNewReport, updateNewReport } = slice.actions;
export const { setLoading, updateReports } = slice.actions;

export const getAllReports = () => async (dispatch) => {
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

export const getPdf = (reportId, setDownloading) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.PDF_LOADING));
  // Need to be replaced by the service that does API call

  try {
    const response = await getPdfReports(reportId);
    if (response) {
      const linkSource = `data:application/pdf;base64,${response.data}`;
      const downloadLink = document.createElement("a");
      const fileName = "report.pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
      setDownloading();
    }
  } catch (error) {
    console.log(error, "Error");
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
