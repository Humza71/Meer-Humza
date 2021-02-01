import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link as RouterLink } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import { resetPassword } from "../../redux/reducers/authReducer";

import {
  Button as MuiButton,
  Box,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
  position: absolute;
  right: 15%;
  top: calc(50% - 152px);
  width: 300px;
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 500px;
  }
`;

function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Wrapper>
      <Helmet title="Reset Password" />

      <Typography component="h1" variant="h3" gutterBottom>
        Reset your password
      </Typography>

      <Button component={RouterLink} to="/auth/sign-in" color="primary" px={0}>
        Sign in instead
      </Button>

      <Typography component="h2" variant="body2">
        Enter your email address and we'll send you a link to reset your
        password.
      </Typography>

      <Formik
        initialValues={{
          email: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await dispatch(
              resetPassword({
                email: values.email,
              })
            );
            history.push("/auth/sign-in");
          } catch (error) {
            const message = error.message || "Something went wrong";

            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              type="email"
              name="email"
              label="Email Address"
              variant="outlined"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <Box my={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Continue
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default ResetPassword;
