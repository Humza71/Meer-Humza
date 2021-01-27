import React from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import { signIn } from "../../redux/reducers/authReducer";
import { makeStyles } from "@material-ui/core/styles";
import config from "../../config";

import {
  Button,
  Paper,
  TextField as MuiTextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

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
    width: "100%",
  },
}));

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
  position: absolute;
  right: 15%;
  top: calc(50% - 289px);
  width: 300px;
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 500px;
  }
`;
const SignInButton = styled(Button)`
  margin-top: ${(props) => props.theme.spacing(props.my)}px;
  margin-bottom: ${(props) => props.theme.spacing(props.my)}px;
`;
const ImageInButton = styled.img`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  margin-top: ${(props) => props.mt}px;
  margin-right: 10px;
`;
const Bar = styled(Box)`
  height: 1px;
  background: #ccc;
  flex-grow: 1;
  margin: auto 0;
`;
const TextButton = styled(Button)`
  padding-left: 0;
  paddint-right: 0;
`;

function SignIn() {
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
      <Helmet title="Sign In" />

      <Typography component="h1" variant="h3" gutterBottom>
        Sign in
      </Typography>
      <Typography component="h2" variant="body1">
        Don't have an account?
        <Button component={RouterLink} to="/auth/sign-up" color="primary">
          Create an account
        </Button>
      </Typography>

      <Formik
        initialValues={{
          email: "demo@bootlab.io",
          password: "unsafepassword",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
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
              my={2}
            />
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
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
            <TextButton
              component={RouterLink}
              to="/auth/reset-password"
              color="primary"
            >
              Forgot password?
            </TextButton>
            <SignInButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              my={5}
            >
              Sign in
            </SignInButton>
            <Box display="flex" mb={3}>
              <Bar />
              <Box mx={3} color="#999999" fontWeight={500}>
                or
              </Box>
              <Bar />
            </Box>
            <a href={process.env.REACT_APP_GOOGLE_REDIRECT_URI}>
              <SignInButton
                fullWidth
                variant="outlined"
                color="default"
                disabled={isSubmitting}
                my={2}
              >
                <ImageInButton
                  src="/static/img/auth/google-icon.png"
                  width="12"
                  height="12"
                  mt="0"
                />
                Continue with Google
              </SignInButton>
            </a>
            <a href={config.facebookRedirectURI}>
              <SignInButton
                fullWidth
                variant="outlined"
                color="default"
                disabled={isSubmitting}
                my={2}
              >
                <ImageInButton
                  src="/static/img/auth/facebook-icon.png"
                  width="14"
                  height="14"
                  mt="0"
                />
                Continue with Facebook
              </SignInButton>
            </a>
            {/*<SignInButton
              fullWidth
              variant="outlined"
              color="default"
              disabled={isSubmitting}
              my={2}
            >
              <ImageInButton
                src="/static/img/auth/amazon-icon.png"
                width="40"
                height="12"
                mt="6"
              />
              Continue with Amazon
            </SignInButton>*/}
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default SignIn;
