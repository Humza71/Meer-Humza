import { createSlice } from "@reduxjs/toolkit";
import {
  addLicense,
  getLicense,
  getAllLicense,
  updateLicense,
  getAllLicenseByAdmin,
  deleteLicense,
} from "services/licenseService";
import { setClinic } from "redux/reducers/clientReducer";
export const LoadingStates = {
  LICENSE_CREATION_LOADING: "Create License Loading",
};
const initialState = {
  loading: null,
  allLicenses: [],
  license: {},
  userInfo: {},
  // adminLicenses: [],
  companyInfo: {},
  // singleLicense: {},
};

export const slice = createSlice({
  name: "licenseReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllLicenses: (state, action) => {
      state.allLicenses = action.payload.licenseInfo;
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setLicense: (state, action) => {
      state.license = action.payload;
    },
    // setAdminLicenses: (state, action) => {
    //   state.adminLicenses = action.payload;
    // },
    setCompany: (state, action) => {
      state.companyInfo = action.payload;
    },
    setLicenses: (state, action) => {
      const newLicenses = state.allLicenses.filter(
        ({ _id }) => _id !== action.payload
      );
      state.allLicenses = [...newLicenses];
    },
    clearLicense: (state, action) => {
      state.userInfo = initialState.userInfo;
      state.license = initialState.license;
      state.companyInfo = initialState.companyInfo;
    },
  },
});

export const {
  setLoading,
  setLicense,
  setUser,
  setCompany,
  clearLicense,
  setAllLicenses,
  setLicenses,
  // setAdminLicenses,
} = slice.actions;

export const createLicense = (values, onSubmitForm) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.LICENSE_CREATION_LOADING));
  onSubmitForm();
  try {
    const response = await addLicense(values);
    if (response.status === 200) {
      if (values.role === "super_admin") {
        dispatch(getLicensesByAdmin());
      } else {
        dispatch(getLicenses());
      }
      dispatch(clearLicense());
      console.log("License Added Successfully");
    }
  } catch (error) {}
  dispatch(setLoading(null));
};

export const editLicense = (values, onSubmitForm, id, userRole) => async (
  dispatch
) => {
  // dispatch(setLoading(LoadingStates.LICENSE_CREATION_LOADING));
  onSubmitForm();
  try {
    const response = await updateLicense(values, id);
    if (response.status === 200) {
      console.log("License Edited Successfully");
      dispatch(clearLicense());
      if (userRole === "super_admin") {
        dispatch(getLicensesByAdmin());
      } else {
        dispatch(getLicenses());
      }
    }
  } catch (error) {}
  // dispatch(setLoading(null));
};

export const getLicenses = () => async (dispatch) => {
  dispatch(setLoading(LoadingStates.LICENSE_CREATION_LOADING));
  // Need to be replaced by the service that does API call
  try {
    const response = await getAllLicense();
    if (response.status === "SUCCESS") {
      dispatch(setAllLicenses(response.data));
    }
  } catch (error) {
    console.log(error, "Error");
  }
  dispatch(setLoading(null));
};

export const getLicensesByAdmin = () => async (dispatch) => {
  dispatch(setLoading(LoadingStates.LICENSE_CREATION_LOADING));
  // Need to be replaced by the service that does API call
  try {
    const response = await getAllLicenseByAdmin();
    if (response.status === "SUCCESS") {
      dispatch(setAllLicenses(response.data));
    }
  } catch (error) {
    console.log(error, "Error");
  }
  dispatch(setLoading(null));
};

export const getLicenseById = (id) => async (dispatch) => {
  dispatch(setLoading(LoadingStates.LICENSE_CREATION_LOADING));
  // Need to be replaced by the service that does API call

  try {
    const response = await getLicense(id);

    if (response.status === "SUCCESS") {
      // dispatch(setLicense(response.data));
      dispatch(setLicense(response.data.licenseInfo));
      dispatch(setUser(response.data.licenseInfo.user));
      dispatch(setCompany(response.data.licenseInfo.company));
      dispatch(setClinic(response.data.licenseInfo.company));
    }
  } catch (error) {
    console.log(error, "Error");
  }
  dispatch(setLoading(null));
};

export const userData = (data, dataSubmitted) => async (dispatch) => {
  try {
    dispatch(setUser(data));
    dataSubmitted();
  } catch (error) {
    console.log(error, "Error");
  }
  //   dispatch(setLoading(null));
};
export const licenseData = (values, dataSubmitted) => async (dispatch) => {
  const data = {
    ...values,
    user: {
      email: values.userEmail,
    },
    id: values.licenseId,
  };
  try {
    dispatch(setLicense(data));
    dataSubmitted();
  } catch (error) {
    console.log(error, "Error");
  }
  //   dispatch(setLoading(null));
};

export const deleteLicenseById = (id, handleDeleteDialogue) => async (
  dispatch
) => {
  // dispatch(setLoading(LoadingStates.DELETE_REPORT_LOADING));

  try {
    const response = await deleteLicense(id);
    if (response.status === 200) {
      dispatch(setLicenses(id));
      handleDeleteDialogue();
      console.log("License deleted successfully");
    }
  } catch (error) {
    console.log(error, "Error");
  }
  // dispatch(setLoading(null));
};

export default slice.reducer;
