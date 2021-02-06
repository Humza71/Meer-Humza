import React from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useHistory, Link as RouterLink } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";

import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button as MuiButton,
  Paper,
  TextField as MuiTextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { signIn, signUp } from "redux/reducers/authReducer";

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
  top: calc(50% - 225px);
  width: 300px;
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 500px;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "48%",
  },
}));

function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Wrapper>
      <Helmet title="Sign Up" />

      <Typography component="h1" variant="h3" gutterBottom>
        Create an account
      </Typography>
      <Typography component="h2" variant="body1">
        Already have an account?
        <Button component={RouterLink} to="/auth/sign-in" color="primary">
          Sign in
        </Button>
      </Typography>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required("Name is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string()
            .min(12, "Must be at least 12 characters")
            .max(255)
            .required("Required"),
          password_confirmation: Yup.string().when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Both password need to be the same"
            ),
          }),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await dispatch(
              signUp({
                name: values.name,
                company: "test",
                email: values.email,
                password: values.password,
                password_confirmation: values.password_confirmation,
              })
            );
            await dispatch(
              signIn({ email: values.email, password: values.password })
            );
            history.push("/");
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
              type="text"
              name="name"
              label="Your name"
              variant="outlined"
              value={values.name}
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
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
            <Box display="flex" justifyContent="space-between">
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                error={Boolean(touched.password && errors.password)}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                <FormHelperText id="password-helper-text">
                  {errors.password}
                </FormHelperText>
              </FormControl>

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                error={Boolean(
                  touched.password_confirmation && errors.password_confirmation
                )}
              >
                <InputLabel htmlFor="password_confirmation">
                  Re-enter password
                </InputLabel>
                <OutlinedInput
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showPassword ? "text" : "password"}
                  value={values.password_confirmation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={120}
                />
                <FormHelperText id="confirm-password-helper-text">
                  {errors.password_confirmation}
                </FormHelperText>
              </FormControl>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              my={5}
            >
              Sign up
            </Button>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default SignUp;
