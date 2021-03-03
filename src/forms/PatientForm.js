import React, { useEffect } from "react";
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
} from "@material-ui/core";
import {
  ToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@material-ui/lab";
import { User as UserIcon } from "react-feather";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker as MuiKeyboardDatePicker,
} from "@material-ui/pickers";

import CreateReportFooter from "components/CreateReportFooter";
import AdvancedSelect from "components/AdvancedSelect";
import {
  updateReport,
  getAllProviders,
  getAllTechnicians,
  LoadingStates,
  addProvider,
  addTechnician,
} from "redux/reducers/reportReducer";
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
  provider: Yup.number(),
  technician: Yup.number(),
});

const InnerForm = (props) => {
  const dispatch = useDispatch();
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
  const providers = useSelector((state) => state.reportReducer.providers);
  const technicians = useSelector((state) => state.reportReducer.technicians);
  const reportLoading = useSelector((state) => state.reportReducer.loading);
  const hanldeNewProvider = (newProvider, saveForFuture) => {
    dispatch(addProvider(newProvider, saveForFuture));
  };
  const hanldeNewTechnician = (newTechnician, saveForFuture) => {
    dispatch(addTechnician(newTechnician, saveForFuture));
  };

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

          {isSubmitting ||
          reportLoading === LoadingStates.REPORT_CREATION_LOADING ? (
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
                      variant="outlined"
                      my={2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <UserIcon />
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
                      variant="outlined"
                      my={2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <UserIcon />
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
                    <AdvancedSelect
                      error={Boolean(touched.provider && errors.provider)}
                      helperText={touched.provider && errors.provider}
                      value={values.provider}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="provider"
                      label="Provider"
                      options={providers.map((item, index) => ({
                        label: item,
                        value: index,
                      }))}
                      variant="outlined"
                      allowAdd={true}
                      onAdd={hanldeNewProvider}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <AdvancedSelect
                      error={Boolean(touched.technician && errors.technician)}
                      helperText={touched.technician && errors.technician}
                      value={values.technician}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="technician"
                      label="Technician"
                      options={technicians.map((item, index) => ({
                        label: item,
                        value: index,
                      }))}
                      variant="outlined"
                      allowAdd={true}
                      onAdd={hanldeNewTechnician}
                    />
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
    dob: newReport.dob ? new Date(newReport.dob) : new Date(),
    gender: newReport.gender,
    encounterDate: newReport.encounterDate
      ? new Date(newReport.encounterDate)
      : new Date(),
    provider: newReport.provider,
    technician: newReport.technician,
  };

  useEffect(() => {
    dispatch(getAllProviders());
    dispatch(getAllTechnicians());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = (values) => {
    debugger;
    dispatch(
      updateReport({
        ...values,
        dob: values.birthday.toISOString(),
        encounterDate: values.encounterDate.toISOString(),
      })
    );
  };

  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    debugger;
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
              handleSave={() => {
                debugger;
                handleSave(formProps.values);
              }}
            />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
export default PatientForm;
