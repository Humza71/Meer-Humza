import React from "react";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import styled from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router";
// import queryString from "query-string";
// import { Alert as MuiAlert } from "@material-ui/lab";
import { userData } from "redux/reducers/licenseReducer";
import { spacing } from "@material-ui/system";

import {
  Box,
  Grid,
  TextField as MuiTextField,
  Typography as MuiTypography,
  Button as MuiButton,
  Card as MuiCard,
} from "@material-ui/core";

const Typography = styled(MuiTypography)(spacing);
const Card = styled(MuiCard)(spacing);
const TextField = styled(MuiTextField)`
  .MuiOutlinedInput-root {
    height: 40px;
  }
`;
const BackButton = styled(MuiButton)(spacing);
const Button = styled(MuiButton)`
  .MuiButton-label {
    color: white;
    background-color: transparent;
  }
`;
const OutCard = styled(Card)`
  width: 520px;
  margin: 0px auto;
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
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  addressOne: Yup.string().required("Required"),
  addressTwo: Yup.string(),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zipCode: Yup.string().required("Required"),
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
    setValue,
  } = props;
  const classes = useStyles();
  return (
    <OutCard>
      <Box>
        <Box mt={6} mb={3}>
          <Typography variant="subtitle2" color="primary" mb={1}>
            User Information
          </Typography>
          <Grid container spacing={12} justify="space-between">
            <Grid Item md={5.9}>
              <TextField
                name="firstName"
                placeholder="First Name"
                //   label="First Name"
                value={values.firstName}
                error={Boolean(touched.firstName && errors.firstName)}
                fullWidth
                helperText={touched.firstName && errors.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="outlined"
                my={2}
              />
            </Grid>
            <Grid Item md={6}>
              <TextField
                name="lastName"
                placeholder="Last Name "
                //   label="First Name"
                value={values.lastName}
                error={Boolean(touched.lastName && errors.lastName)}
                fullWidth
                helperText={touched.lastName && errors.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="outlined"
                my={2}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mb={3}>
          <Grid container spacing={12}>
            <TextField
              name="phoneNumber"
              placeholder="User phone number"
              value={values.phoneNumber}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              fullWidth
              helperText={touched.phoneNumber && errors.phoneNumber}
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
              my={2}
            />
          </Grid>
        </Box>
        <Box mb={3}>
          <Grid container spacing={12}>
            <TextField
              name="addressOne"
              placeholder="Address line 1"
              // label="First Name"
              value={values.addressOne}
              error={Boolean(touched.addressOne && errors.addressOne)}
              fullWidth
              helperText={touched.addressOne && errors.addressOne}
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
              my={2}
            />
          </Grid>
        </Box>
        <Box mb={3}>
          <Grid container spacing={12}>
            <TextField
              name="addressTwo"
              placeholder="Address line 2"
              // label="First Name"
              value={values.addressTwo}
              error={Boolean(touched.addressTwo && errors.addressTwo)}
              fullWidth
              helperText={touched.addressTwo && errors.addressTwo}
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
              my={2}
            />
          </Grid>
        </Box>
        <Box mb={3}>
          <Grid container spacing={12}>
            <TextField
              name="city"
              placeholder="City"
              // label="First Name"
              value={values.city}
              error={Boolean(touched.city && errors.city)}
              fullWidth
              helperText={touched.city && errors.city}
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
              my={2}
            />
          </Grid>
        </Box>
        <Box mb={4}>
          <Grid container spacing={12} justify="space-between">
            <Grid item md={5.9}>
              <TextField
                name="state"
                placeholder="State"
                // label="Last Name"
                value={values.state}
                error={Boolean(touched.state && errors.state)}
                fullWidth
                helperText={touched.state && errors.state}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="outlined"
                my={2}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                name="zipCode"
                placeholder="ZIP code"
                // label="Last Name"
                value={values.zipCode}
                error={Boolean(touched.zipCode && errors.zipCode)}
                fullWidth
                helperText={touched.zipCode && errors.zipCode}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="outlined"
                my={2}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <BackButton
            onClick={() => setValue(0)}
            color="secondary"
            variant="outlined"
            size="large"
          >
            Back
          </BackButton>
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
    </OutCard>
  );
};

const UserInfo = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => {
    return state.licenseReducer.userInfo;
  });

  const initialValues = {
    firstName: userInfo.name
      ? userInfo.name.split(" ").slice(0, -1).join(" ")
      : "",
    lastName: userInfo.name ? userInfo.name.split(" ").slice(-1).join(" ") : "",
    phoneNumber: userInfo.phoneNumber ? userInfo.phoneNumber : "",
    addressOne: userInfo.addresses ? userInfo.addresses.addressOne : "",
    addressTwo: userInfo.addresses ? userInfo.addresses.addressTwo : "",
    city: userInfo.city ? userInfo.city : "",
    state: userInfo.state ? userInfo.state : "",
    zipCode: userInfo.zipCode ? userInfo.zipCode : "",
  };

  const dataSubmitted = () => {
    props.setValue(props.value + 1);
  };

  const handleSubmit = (e, values) => {
    e.preventDefault();
    dispatch(
      userData(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          addresses: {
            addressOne: values.addressOne,
            addressTwo: values.addressTwo,
          },
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
        },
        dataSubmitted
      )
    );
  };

  // React.useEffect(() => {
  //   if (props.open === false) {
  //     dispatch(clearLicenseData());
  //   }
  // }, [props.open, dispatch]);

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        validate={(values) => {
          console.log(values);
          return {};
        }}
        // onSubmit={handleSubmit}
      >
        {(formProps) => (
          <Form onSubmit={(e) => handleSubmit(e, formProps.values)}>
            <InnerForm {...formProps} setValue={props.setValue} />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
export default UserInfo;
