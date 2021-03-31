import React from "react";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import styled from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { createLicense } from "redux/reducers/licenseReducer";
// import { useHistory } from "react-router";
// import queryString from "query-string";
// import { Alert as MuiAlert } from "@material-ui/lab";
import { spacing } from "@material-ui/system";

import {
  Box,
  Card as MuiCard,
  CardContent,
  // CircularProgress,
  Grid,
  // InputAdornment,
  TextField as MuiTextField,
  Typography as MuiTypography,
  Button as MuiButton,
} from "@material-ui/core";

// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
const Button = styled(MuiButton)`
  .MuiButton-label {
    color: white;
    background-color: transparent;
  }
`;
const FormWrapper = styled.div`
  background-color: #e5e5e5;
`;
const Card = styled(MuiCard)(spacing);
// const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)`
  .MuiOutlinedInput-root {
    height: 40px;
  }
`;
const Typography = styled(MuiTypography)(spacing);

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
  outlinedPrimary: {
    color: "white",
  },

  //   container: {
  //     maxHeight: 500,
  //     overflow: "auto",
  //   },
  //   columnsSelect: {
  //     margin: theme.spacing(1),
  //     minWidth: 120,
  //     maxWidth: 300,
  //   },
}));

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  addressOne: Yup.string().required("Required"),
  addressTwo: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zipCode: Yup.string().required("Required"),
});

const InnerForm = (props) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const {
    errors,
    handleBlur,
    handleChange,
    // setFieldValue,
    // isSubmitting,
    touched,
    values,
    // status,
  } = props;

  return (
    <FormWrapper>
      <OutCard mb={0}>
        <CardContent>
          <Box>
            <Box mt={1} mb={3}>
              <Typography variant="subtitle2" color="primary" mb={1}>
                Company Information
              </Typography>
              <Grid container spacing={12}>
                <TextField
                  disabled
                  name="name"
                  // placeholder="Company name"
                  label="Company name"
                  value={values.name}
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  variant="outlined"
                  my={2}
                />
              </Grid>
            </Box>
            <Box mb={3}>
              <Grid container spacing={12} justify="space-between">
                <Grid item md={5.9}>
                  <TextField
                    disabled
                    name="email"
                    // placeholder="Company email address"
                    label="Company email address"
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    variant="outlined"
                    my={2}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    disabled
                    name="phone"
                    // placeholder="Company phone number"
                    label="Company phone number"
                    value={values.phone}
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    helperText={touched.phone && errors.phone}
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
                  disabled
                  name="addressOne"
                  // placeholder="Address line 1"
                  label="Address line 1"
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
                  disabled
                  name="addressTwo"
                  // placeholder="Address line 2"
                  label="Address line 2"
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
                  disabled
                  name="city"
                  // placeholder="City"
                  label="City"
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
                    disabled
                    name="state"
                    // placeholder="State"
                    label="State"
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
                    disabled
                    name="zipCode"
                    // placeholder="ZIP code"
                    label="Zip code"
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
              <Button
                className={classes.root}
                type="submit"
                color="primary"
                variant="outlined"
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </CardContent>
      </OutCard>
    </FormWrapper>
  );
};

const CompanyInfo = (props) => {
  const dispatch = useDispatch();
  // const companyInfo = useSelector((state) => {
  //   return state.licenseReducer.companyInfo;
  // });
  const userInfo = useSelector((state) => {
    return state.licenseReducer.userInfo;
  });
  const licenseInfo = useSelector((state) => {
    return state.licenseReducer.license;
  });
  const userClinic = useSelector((state) => {
    return state.authReducer.user;
  });

  const companyInfo = useSelector((state) => {
    return state.authReducer.clinic;
  });

  //   const dispatch = useDispatch();
  //   const history = useHistory();
  //   const { match = {} } = props || {};
  //   const { params = {} } = match;
  //   const { id } = params;

  const initialValues = {
    name: companyInfo.name ? companyInfo.name : "",
    email: companyInfo.email ? companyInfo.email : "",
    phone: companyInfo.phoneNumber ? companyInfo.phoneNumber : "",
    addressOne: companyInfo.addresses ? companyInfo.addresses.addressOne : "",
    addressTwo: companyInfo.addresses ? companyInfo.addresses.addressTwo : "",
    city: companyInfo.city ? companyInfo.city : "",
    state: companyInfo.state ? companyInfo.state : "",
    zipCode: companyInfo.zipCode ? companyInfo.zipCode : "",
  };

  const onSubmitForm = () => {
    props.setOpen(false);
  };

  const handleSubmit = (e, values) => {
    e.preventDefault();
    dispatch(
      createLicense(
        {
          clinicId: userClinic.clinicId,
          license: {
            ...licenseInfo,
          },
          user: {
            ...userInfo,
            email: licenseInfo.userEmail,
          },
        },
        onSubmitForm
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
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={(values) => {
          console.log(values);
          return {};
        }}
        // onSubmit={handleSubmit}
      >
        {(formProps) => (
          <Form onSubmit={(e) => handleSubmit(e, formProps.values)}>
            <InnerForm {...formProps} />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
export default CompanyInfo;
