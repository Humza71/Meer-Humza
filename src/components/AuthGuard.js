import React from "react";
// import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { setDefault } from "../utils/apiService";

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  // const auth = useSelector((state) => state.authReducer);
  if (localStorage.getItem("token")) {
    setDefault();
    return children;
  }

  return <Redirect to="/auth/sign-in" />;
}

export default AuthGuard;
