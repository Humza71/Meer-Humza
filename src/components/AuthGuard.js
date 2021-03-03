import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { setDefault } from "../utils/apiService";

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  setDefault();
  const auth = useSelector((state) => state.authReducer);

  if (auth.user) {
    return children;
  }

  return <Redirect to="/auth/sign-in" />;
}

export default AuthGuard;
