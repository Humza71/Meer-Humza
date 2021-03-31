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
  width: 100%;
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
  userEmail: Yup.string().required("Required"),
  issueDate: Yup.date().required("Required"),
  expiryDate: Yup.date().required("Required"),
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
            Create a New License
          </Typography>
          <Box>
            <Box mt={6} mb={3}>
              <Typography variant="subtitle2" color="primary" mb={1}>
                License Information
              </Typography>
              <Grid container spacing={12}>
                <TextField
                  name="userEmail"
                  placeholder="User Email Address"
                  // label="First Name"
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
            <Box mb={3}>
              <Grid container spacing={12}>
                <TextField
                  name="issueDate"
                  placeholder="Set issue Date"
                  type="date"
                  // label="First Name"
                  value={values.issueDate}
                  error={Boolean(touched.issueDate && errors.issueDate)}
                  fullWidth
                  helperText={touched.issueDate && errors.issueDate}
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
                  name="expiryDate"
                  placeholder="Enter expiry date"
                  type="date"
                  // label="First Name"
                  value={values.expiryDate}
                  error={Boolean(touched.expiryDate && errors.expiryDate)}
                  fullWidth
                  helperText={touched.expiryDate && errors.expiryDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  variant="outlined"
                  my={2}
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
                Save
              </Button>
            </Box>
          </Box>
        </CardContent>
      </OutCard>
    </FormWrapper>
  );
};

const LicenseForm = (props) => {
  const licenseInfo = useSelector((state) => {
    return state.reportReducer.newReport;
  });

  //   const dispatch = useDispatch();
  //   const history = useHistory();
  //   const { match = {} } = props || {};
  //   const { params = {} } = match;
  //   const { id } = params;

  const initialValues = {
    userEmail: licenseInfo.userEmail ? licenseInfo.userEmail : "",
    issueDate: licenseInfo.issueDate ? licenseInfo.issueDate : "",
    expiryDate: licenseInfo.expiryDate ? licenseInfo.expiryDate : "",
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
export default LicenseForm;
