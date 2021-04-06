import React from "react";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import styled from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  createCompany,
  LoadingStates,
  editCompanyById,
} from "redux/reducers/clientReducer";
import { useHistory } from "react-router";
// import queryString from "query-string";
// import { Alert as MuiAlert } from "@material-ui/lab";
import { spacing } from "@material-ui/system";

import {
  Box,
  Card as MuiCard,
  CardContent,
  CircularProgress,
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
  height: ${({ height }) => height};
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
  width: 530px;
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
  phoneNumber: Yup.string().required("Required"),
  addressOne: Yup.string().required("Required"),
  addressTwo: Yup.string(),
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
    setFieldValue,
    // isSubmitting,
    touched,
    values,
    // status,
    editCompany = false,
  } = props;

  const reportLoading = useSelector((state) => state.clientReducer.loading);
  // const [error, setError] = React.useState("");

  return (
    <>
      {reportLoading === LoadingStates.COMPANY_CREATION_LOADING ? (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress />
        </Box>
      ) : (
        <FormWrapper height={editCompany === true ? "530" : "660px"}>
          <OutCard mb={0}>
            <CardContent>
              <Typography variant="h5" color="action" gutterBottom>
                {editCompany
                  ? "View or Edit Company Information"
                  : "Add New Company"}
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
                        name="phoneNumber"
                        placeholder="Company phone number"
                        // label="Last Name"
                        value={values.phoneNumber}
                        error={Boolean(
                          touched.phoneNumber && errors.phoneNumber
                        )}
                        fullWidth
                        helperText={touched.phoneNumber && errors.phoneNumber}
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
                <Box mb={4}>
                  <Grid container spacing={12}>
                    <TextField
                      name="noOfLicenses"
                      placeholder="Number of Licenses"
                      type="number"
                      // label="Last Name"
                      value={values.noOfLicenses}
                      error={Boolean(
                        touched.noOfLicenses && errors.noOfLicenses
                      )}
                      fullWidth
                      helperText={touched.noOfLicenses && errors.noOfLicenses}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>
                </Box>
                <Box mb={4}>
                  <Grid container spacing={12}>
                    Upload Company logo
                    <input
                      // value={values.image}
                      type="file"
                      // hidden
                      onChange={(e) => {
                        setFieldValue(`image`, e.target.files[0]);
                      }}
                    />
                  </Grid>
                </Box>
                <Box>
                  <Button
                    className={classes.root}
                    type="submit"
                    color="primary"
                    variant="outlined"
                  >
                    {editCompany ? "Save Changes" : "Save"}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </OutCard>
        </FormWrapper>
      )}
    </>
  );
};

const CompanyForm = ({ editCompany = {}, setOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const companyInfo = useSelector((state) => state.clientReducer.clinic);
  // const clinic = useSelector((state) => state.clientReducer.clinic);

  const initialValues = {
    name: companyInfo.name ? companyInfo.name : "",
    email: companyInfo.email ? companyInfo.email : "",
    phoneNumber: companyInfo.phoneNumber ? companyInfo.phoneNumber : "",
    addressOne: companyInfo.addresses ? companyInfo.addresses.addressOne : "",
    addressTwo: companyInfo.addresses ? companyInfo.addresses.addressTwo : "",
    city: companyInfo.city ? companyInfo.city : "",
    state: companyInfo.state ? companyInfo.state : "",
    zipCode: companyInfo.zipCode ? companyInfo.zipCode : "",
    noOfLicenses: companyInfo.noOfLicenses ? companyInfo.noOfLicenses : "",
    companyId: companyInfo._id ? companyInfo._id : "",
  };

  const onCreationCompany = () => {
    history.push("/clients");
  };

  const onSubmitForm = () => {
    setOpen(false);
  };

  // React.useEffect(() => {
  //   if (Object.keys(clinic).length > 0) {
  //     debugger;
  //     dispatch(clearClinic());
  //   }
  // }, [dispatch, clinic]);

  const handleSubmit = (e, values) => {
    e.preventDefault();

    if (values.companyId === "") {
      dispatch(
        createCompany(
          {
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
            city: values.city,
            state: values.state,
            zipCode: values.zipCode,
            addresses: {
              addressOne: values.addressOne,
              addressTwo: values.addressTwo,
            },
            noOfLicenses: values.noOfLicenses,
            image: values.image,
          },
          onCreationCompany
        )
      );
    } else {
      dispatch(
        editCompanyById(
          {
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
            city: values.city,
            state: values.state,
            zipCode: values.zipCode,
            addresses: {
              addressOne: values.addressOne,
              addressTwo: values.addressTwo,
            },
            noOfLicenses: values.noOfLicenses,
            image: values.image,
            id: values.companyId,
          },
          onSubmitForm
        )
      );
    }
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={(values) => {
          return {};
        }}
        // onSubmit={handleSubmit}
      >
        {(formProps) => (
          <Form onSubmit={(e) => handleSubmit(e, formProps.values)}>
            <InnerForm {...formProps} editCompany={editCompany} />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
export default CompanyForm;
