import React from "react";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import styled from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles";
// import { spacing } from "@material-ui/system";
import { useSelector, useDispatch } from "react-redux";
import { licenseData, LoadingStates } from "redux/reducers/licenseReducer";

import {
  Box,
  Grid,
  TextField as MuiTextField,
  Typography as MuiTypography,
  Button as MuiButton,
  CircularProgress,
} from "@material-ui/core";

const Typography = styled(MuiTypography)`
  color: #888888;
  margin-bottom: 12px;
`;
const TextField = styled(MuiTextField)`
  .MuiOutlinedInput-root {
    height: 40px;
  }
`;
const Button = styled(MuiButton)`
  .MuiButton-label {
    color: white;
    background-color: transparent;
  }
`;
const useStyles = makeStyles((theme) => ({
  root: {
    float: "right",
    background: "#09539e",
    "&:hover": {
      backgroundColor: "#09539e",
    },
  },
}));

const validationSchema = Yup.object().shape({
  userEmail: Yup.string().required("Required"),
  dateExpiry: Yup.string().required("Required"),
});

const InnerForm = (props) => {
  const {
    errors,
    handleBlur,
    handleChange,
    // setFieldValue,
    // isSubmitting,
    touched,
    values,
    // status,
    // editLicense = false,
  } = props;
  const classes = useStyles();
  const licenseLoading = useSelector((state) => state.licenseReducer.loading);
  const user = useSelector((state) => state.authReducer.user);

  return (
    <>
      {licenseLoading === LoadingStates.LICENSE_CREATION_LOADING ? (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Box mt={6} mb={3}>
            <Typography variant="subtitle2" color="action">
              License ID:{values.licenseId}
            </Typography>
            <Grid container spacing={12}>
              <TextField
                disabled={user.role === "admin" ? true : false}
                autoComplete="off"
                name="userEmail"
                placeholder="User email address"
                // label="Email"
                value={values.userEmail}
                error={Boolean(touched.userEmail && errors.userEmail)}
                fullWidth
                helperText={touched.userEmail && errors.userEmail}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="outlined"
                my={2}
              />
            </Grid>
          </Box>
          <Box mt={6} mb={3}>
            <Grid container spacing={12}>
              <TextField
                disabled={user.role === "admin" ? true : false}
                name="dateExpiry"
                type="date"
                label="Expiry Date"
                value={values.dateExpiry}
                error={Boolean(touched.dateExpiry && errors.dateExpiry)}
                fullWidth
                helperText={touched.dateExpiry && errors.dateExpiry}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="outlined"
                my={2}
                InputLabelProps={{ shrink: true, required: true }}
              />
            </Grid>
          </Box>
          <Box>
            <Button
              className={classes.root}
              type="submit"
              color="primary"
              variant="outlined"
              size="large"
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

const LicenseInfo = (props) => {
  const dispatch = useDispatch();
  const licenseInfo = useSelector((state) => {
    return state.licenseReducer.license;
  });
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const myDate = new Date(year + 1, month, day);

  const initialValues = {
    userEmail: licenseInfo.user ? licenseInfo.user.email : "",
    dateExpiry: licenseInfo.dateExpiry
      ? new Date(licenseInfo.dateExpiry).toISOString().slice(0, 10)
      : new Date(myDate).toISOString().slice(0, 10),
    issueDate: licenseInfo.issueDate ? licenseInfo.issueDate : "",
    licenseId: licenseInfo.id ? licenseInfo.id : "",
  };

  const dataSubmitted = () => {
    props.setValue(props.value + 1);
  };

  const handleSubmit = (e, values, isValid) => {
    e.preventDefault();
    if (isValid) {
      dispatch(licenseData(values, dataSubmitted));
    }
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        validateOnBlur={false}
        validate={(values, errors) => {
          console.log(values);
          return {};
        }}
        initialTouched={{
          userEmail: true,
        }}
        validateOnMount={true}
        //onSubmit={handleSubmit}
      >
        {(formProps) => (
          <Form
            onSubmit={(e) =>
              handleSubmit(e, formProps.values, formProps.isValid)
            }
          >
            <InnerForm
              {...formProps}
              // editLicense={initialValues.licenseId !== "" && true}
            />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
export default LicenseInfo;
