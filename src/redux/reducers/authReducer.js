import { createSlice } from "@reduxjs/toolkit";
import {
  signIn as authSignIn,
  signUp as authSignUp,
  userInfo as authUserInfo,
  resetPassword as authResetPassword,
  clinic,
} from "../../services/authService";
import { setMessage } from "./messageReducer";

const initialState = {
  user: {},
  loading: false,
  clinic: {},
};

export const slice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setClinic: (state, action) => {
      state.clinic = action.payload;
    },
    // setProfile: (state, action) => {
    //   state.profile = action.payload;
    // },
  },
});

const { setUser, setLoading, setClinic } = slice.actions;

export const signIn = (credentials, onSuccess) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await authSignIn(credentials, onSuccess);
    dispatch(
      setUser({
        id: response.id,
        email: response.email,
        name: response.name,
      })
    );
  } catch (error) {
    dispatch(setMessage({ message: error.message }));
  }
  dispatch(setLoading(false));
};

export const signUp = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await authSignUp(credentials);
    dispatch(
      setUser({
        id: response.id,
        email: response.email,
        name: response.name,
      })
    );
  } catch (error) {
    dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  dispatch(setLoading(false));
};

export const getClinic = (id) => async (dispatch) => {
  // dispatch(setLoading(true));

  try {
    const response = await clinic(id);

    dispatch(setClinic(response.data));
  } catch (error) {
    // dispatch(setMessage({ message: "Email or password already exist!" }));
  }

  dispatch(setLoading(false));
};

export const userInfo = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await authUserInfo();
    if (response) {
      dispatch(
        setUser({
          id: response.data._id,
          email: response.data.email,
          name: response.data.name,
          clinicId: response.data.clinicId,
        })
      );
    }
  } catch (error) {}
};

export const signOut = () => (dispatch) => {
  localStorage.setItem("token", "");
  dispatch(setUser(undefined));
};

export const resetPassword = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await authResetPassword(credentials);

    // Just temporarily
    dispatch(
      setUser({
        email: response.email,
      })
    );
  } catch (error) {
    dispatch(setMessage({ message: error.message }));
  }

  dispatch(setLoading(false));
};

// export const getProfile = (credentials) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const response = await getUserProfile(credentials);
//     debugger;
//     // Just temporarily
//     dispatch(setProfile(response.data));
//   } catch (error) {
//     dispatch(setMessage({ message: error.message }));
//   }

//   dispatch(setLoading(false));
// };

export default slice.reducer;
