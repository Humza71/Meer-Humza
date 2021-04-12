import { createSlice } from "@reduxjs/toolkit";
// import { providers, technicians } from "lib/dumyData";
// import { postUtil } from "../../utils/apiService";
import {
  getReports,
  getPdfReports,
  deleteReport,
  getPdfHtml,
} from "../../services/allReportsService";

export const LoadingStates = {
  ALL_REPORTS_LOADING: "All Report Loading",
  PDF_LOADING: "Pdf Loading",
  DELETE_REPORT_LOADING: "Delete Report Loading",
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
    setReports: (state, action) => {
      const newReports = state.allReports.filter(
        ({ _id }) => _id !== action.payload
      );
      state.allReports = [...newReports];
    },
  },
});

// export const { clearNewReport, updateNewReport } = slice.actions;
export const { setLoading, updateReports, setReports } = slice.actions;

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

export const getPdf = (reportId) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.PDF_LOADING));
  // Need to be replaced by the service that does API call

  try {
    const result = await getPdfHtml(reportId);
    var newWindow = window.open();
    newWindow.document.write(result.data);
    const response = await getPdfReports(reportId);
    if (response) {
      const linkSource = `data:application/pdf;base64,${response.data}`;
      const downloadLink = document.createElement("a");
      const fileName = "report.pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  } catch (error) {
    console.log(error, "Error");
  }
  dispatch(setLoading(null));
};

export const deleteReportById = (reportId) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.DELETE_REPORT_LOADING));
  // Need to be replaced by the service that does API call

  try {
    const response = await deleteReport(reportId);
    if (response.status === 200) {
      dispatch(setReports(reportId));

      console.log("report deleted successfully");
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
