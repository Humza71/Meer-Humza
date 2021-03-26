import React from "react";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import styled from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
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
  width: 500px;
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
  phone: Yup.date().required("Required"),
  address_1: Yup.date().required("Required"),
  address_2: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string().required("Required"),
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
          <Typography variant="h5" color="action" gutterBottom>
            Add New Company
          </Typography>
          <Box>
            <Box mt={6} mb={3}>
              <Typography variant="subtitle2" color="primary" mb={1}>
                Company Information
              </Typography>
              <Grid container spacing={12}>
                <TextField
                  name="name"
                  placeholder="Company name"
                  // label="First Name"
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
                    name="email"
                    placeholder="Company email address"
                    // label="Last Name"
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
                    name="phone"
                    placeholder="Company phone number"
                    // label="Last Name"
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
                  name="address_1"
                  placeholder="Address line 1"
                  // label="First Name"
                  value={values.address_1}
                  error={Boolean(touched.address_1 && errors.address_1)}
                  fullWidth
                  helperText={touched.address_1 && errors.address_1}
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
                  name="address_2"
                  placeholder="Address line 2"
                  // label="First Name"
                  value={values.address_2}
                  error={Boolean(touched.address_2 && errors.address_2)}
                  fullWidth
                  helperText={touched.address_2 && errors.address_2}
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
                    name="zip"
                    placeholder="ZIP code"
                    // label="Last Name"
                    value={values.zip}
                    error={Boolean(touched.zip && errors.zip)}
                    fullWidth
                    helperText={touched.zip && errors.zip}
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
                Save
              </Button>
            </Box>
          </Box>
        </CardContent>
      </OutCard>
    </FormWrapper>
  );
};

const CompanyForm = (props) => {
  const companyInfo = useSelector((state) => {
    return state.reportReducer.newReport;
  });

  //   const dispatch = useDispatch();
  //   const history = useHistory();
  //   const { match = {} } = props || {};
  //   const { params = {} } = match;
  //   const { id } = params;

  const initialValues = {
    name: companyInfo.name ? companyInfo.name : "",
    email: companyInfo.email ? companyInfo.email : "",
    phone: companyInfo.phone ? companyInfo.phone : "",
    address_1: companyInfo.address_1 ? companyInfo.address_1 : "",
    address_2: companyInfo.address_2 ? companyInfo.address_2 : "",
    city: companyInfo.city ? companyInfo.city : "",
    state: companyInfo.state ? companyInfo.state : "",
    zip: companyInfo.zip ? companyInfo.zip : "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
export default CompanyForm;
