import React from "react";
import "date-fns";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";

import { Alert as MuiAlert } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField as MuiTextField,
  Typography as MuiTypography,
  MenuItem,
} from "@material-ui/core";
import {
  ToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@material-ui/lab";
import { AccountCircle } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker as MuiKeyboardDatePicker,
} from "@material-ui/pickers";

import CreateReportFooter from "components/CreateReportFooter";
import { providers, technicians } from "lib/dumyData";
import { updateNewReport } from "redux/reducers/reportReducer";
import { setStepNewReport } from "redux/reducers/uiReducer";

const Card = styled(MuiCard)(spacing);
const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Typography = styled(MuiTypography)(spacing);

const OutCard = styled(Card)`
  width: 500px;
  margin: 20px auto;
`;

const KeyboardDatePicker = styled(MuiKeyboardDatePicker)`
  .MuiFormLabel-filled {
    font-size: 20px;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-weight: 400;
    color: black;
    line-height: 25px;
    margin-top: -10px;
  }
`;

const ToggleButtonGroup = styled(MuiToggleButtonGroup)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .MuiToggleButton-root {
    border: 1px solid rgba(0, 0, 0, 0.12) !important;
    border-radius: 4px !important;
    min-width: 100px;
  }
`;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  birthday: Yup.date().required("Required"),
  encounterDate: Yup.date().required("Required"),
  gender: Yup.string().required("Required"),
  provider: Yup.number().required("Required"),
  technician: Yup.number().required("Required"),
});

const InnerForm = (props) => {
  const {
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    isSubmitting,
    touched,
    values,
    status,
  } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <OutCard mb={6}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            PATIENT INFORMATION
          </Typography>

          {status && status.sent && (
            <Alert severity="success" my={3}>
              Your data has been submitted successfully!
            </Alert>
          )}

          {isSubmitting ? (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box mb={2.5}>
                <Typography variant="subtitle1" mb={1}>
                  Patient Name
                </Typography>
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <TextField
                      name="firstName"
                      label="First Name"
                      value={values.firstName}
                      error={Boolean(touched.firstName && errors.firstName)}
                      fullWidth
                      helperText={touched.firstName && errors.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="filled"
                      my={2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      name="lastName"
                      label="Last Name"
                      value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="filled"
                      my={2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mb={2.5}>
                <KeyboardDatePicker
                  disableToolbar
                  name="birthday"
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="Date of Birth"
                  value={values.birthday}
                  onChange={(value) => setFieldValue("birthday", value)}
                  error={Boolean(touched.birthday && errors.birthday)}
                  fullWidth
                  helperText={touched.birthday && errors.birthday}
                  onBlur={handleBlur}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Box>
              <Box mb={2.5}>
                <Typography variant="subtitle1" mb={1}>
                  Gender
                </Typography>
                <ToggleButtonGroup
                  exclusive
                  name="gender"
                  label="Gender"
                  value={values.gender}
                  onBlur={handleBlur}
                  onChange={(event, value) => setFieldValue("gender", value)}
                  aria-label="gender"
                >
                  <ToggleButton value="male" aria-label="male">
                    Male
                  </ToggleButton>
                  <ToggleButton value="female" aria-label="male">
                    Female
                  </ToggleButton>
                  <ToggleButton value="none-binary" aria-label="none-binary">
                    Non-binary
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box mb={2.5}>
                <KeyboardDatePicker
                  disableToolbar
                  name="encounterDate"
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="Encounter Date"
                  value={values.encounterDate}
                  onChange={(value) => setFieldValue("encounterDate", value)}
                  error={Boolean(touched.encounterDate && errors.encounterDate)}
                  fullWidth
                  helperText={touched.encounterDate && errors.encounterDate}
                  onBlur={handleBlur}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Box>
              <Box mb={2.5}>
                <Typography variant="subtitle1" mb={1}>
                  Staff Information
                </Typography>
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <TextField
                      select
                      name="provider"
                      label="Provider"
                      value={values.provider}
                      onChange={handleChange}
                      error={Boolean(touched.provider && errors.provider)}
                      fullWidth
                      helperText={touched.provider && errors.provider}
                      onBlur={handleBlur}
                      variant="filled"
                    >
                      {providers.map((option, index) => (
                        <MenuItem key={index} value={index}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      select
                      name="technician"
                      label="Technician"
                      value={values.technician}
                      onChange={handleChange}
                      error={Boolean(touched.technician && errors.technician)}
                      fullWidth
                      helperText={touched.technician && errors.technician}
                      onBlur={handleBlur}
                      variant="filled"
                    >
                      {technicians.map((option, index) => (
                        <MenuItem key={index} value={index}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </CardContent>
      </OutCard>
    </MuiPickersUtilsProvider>
  );
};

const PatientForm = () => {
  const newReport = useSelector((state) => state.reportReducer.newReport);
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);
  const dispatch = useDispatch();

  const initialValues = {
    firstName: newReport.firstName,
    lastName: newReport.lastName,
    birthday: newReport.birthday ? new Date(newReport.birthday) : new Date(),
    gender: newReport.gender,
    encounterDate: newReport.encounterDate
      ? new Date(newReport.encounterDate)
      : new Date(),
    provider: newReport.provider,
    technician: newReport.technician,
  };

  const handleSave = (values) => {
    dispatch(
      updateNewReport({
        ...values,
        birthday: values.birthday.toISOString(),
        encounterDate: values.encounterDate.toISOString(),
      })
    );
  };

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      handleSave(values);
      dispatch(setStepNewReport(stepNewReport + 1));
      setStatus({ sent: true });
      setSubmitting(false);
    } catch (error) {
      setStatus({ sent: false });
      setErrors({ submit: error.message });
      setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={(values) => {
          console.log(values);

          return {};
        }}
        onSubmit={handleSubmit}
      >
        {(formProps) => (
          <Form>
            <InnerForm {...formProps} />
            <CreateReportFooter
              {...formProps}
              onSave={() => handleSave(formProps.values)}
            />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
export default PatientForm;
