import React, { useEffect } from "react";
import "date-fns";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import styled from "styled-components/macro";
// import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
// import queryString from "query-string";
import {
  Alert as MuiAlert,
  // AdapterDateFns,
  // DatePicker,
  // LocalizationProvider,
} from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import Toggle from "../components/reports/Toggle";
import DateSelect from "../components/DateSelect";
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
  Snackbar,
} from "@material-ui/core";

import { User as UserIcon } from "react-feather";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// import { AdapterDateFns as MuiAdapterDateFns } from "@material-ui/lab/AdapterDateFns";
// import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
// import DatePicker from "@material-ui/lab/DatePicker";

import CreateReportFooter from "components/CreateReportFooter";
import AdvancedSelect from "components/AdvancedSelect";
import {
  updateReport,
  getReportById,
  getAllProviders,
  getAllTechnicians,
  LoadingStates,
  addProvider,
  addTechnician,
  setCompleted,
  // saveReport,
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

const DateField = styled(TextField)`
  label {
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

// const useStyles = makeStyles((theme) => ({
//   input: {
//     WebkitTextSecurity: "disc",
//   },
// }));

// const ToggleButtonGroup = styled(MuiToggleButtonGroup)`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   .MuiToggleButton-root {
//     border: 1px solid rgba(0, 0, 0, 0.12) !important;
//     border-radius: 4px !important;
//     min-width: 100px;
//   }
// `;

const InnerForm = (props) => {
  const dispatch = useDispatch();
  // const [open, setOpen] = React.useState(false);
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
  const Options = [
    {
      title: "Male",
      value: "male",
    },
    {
      title: "Female",
      value: "female",
    },
    {
      title: "Non-Binary",
      value: "non-binary",
    },
  ];
  const providers = useSelector((state) => state.reportReducer.providers) || [];
  const technicians =
    useSelector((state) => state.reportReducer.technicians) || [];
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                <DateSelect
                  label="Date of Birth"
                  value={values.dateOfBirth}
                  onChange={(value) => {
                    setFieldValue("dateOfBirth", value);
                  }}
                />
              </Box>
              <Box mb={2.5}>
                <Typography variant="subtitle1" mb={1}>
                  Gender
                </Typography>
                <Toggle
                  togglesize={{
                    width: "148px",
                    height: "38px",
                  }}
                  direction="row"
                  value={values["gender"]}
                  options={Options}
                  onChange={(value) => setFieldValue("gender", value)}
                />
              </Box>
              <Box mb={2.5}>
                <Typography variant="subtitle1" mb={1}>
                  Last 4 Digits of SSN
                </Typography>
                <Grid container spacing={6}>
                  <Grid item md={6}>
                    <TextField
                      autoComplete="off"
                      type="password"
                      inputProps={{ maxLength: 4 }}
                      placeholder="****"
                      name="ssn"
                      label="SSN"
                      value={values["ssn"]}
                      error={Boolean(touched.ssn && errors.ssn)}
                      fullWidth
                      helperText={touched.ssn && errors.ssn}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        const regex = new RegExp("^[0-9]+$");
                        if (e.target.value === "") {
                          setFieldValue("ssn", "");
                        }
                        if (regex.test(e.target.value)) {
                          return setFieldValue("ssn", e.target.value);
                        }
                      }}
                      variant="outlined"
                      my={2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mb={2.5}>
                <DateSelect
                  label="Encounter Date"
                  value={values.encounterDate}
                  onChange={(value) => {
                    setFieldValue("encounterDate", value);
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
                      error={Boolean(touched.providerId && errors.providerId)}
                      helperText={touched.providerId && errors.providerId}
                      value={values.staffInformation.providerId}
                      onChange={(e) => {
                        setFieldValue(
                          "staffInformation.providerId",
                          e.target.value
                        );
                      }}
                      onBlur={handleBlur}
                      name="provider Id"
                      label="Provider"
                      options={providers.map((item, index) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      variant="outlined"
                      allowAdd={true}
                      onAdd={hanldeNewProvider}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <AdvancedSelect
                      error={Boolean(
                        touched.technicianId && errors.technicianId
                      )}
                      helperText={touched.technicianId && errors.technicianId}
                      value={values.staffInformation.technicianId}
                      onChange={(e) =>
                        setFieldValue(
                          "staffInformation.technicianId",
                          e.target.value
                        )
                      }
                      onBlur={handleBlur}
                      name="technician Id"
                      label="Technician"
                      options={technicians.map((item, index) => ({
                        label: item.name,
                        value: item.id,
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

const PatientForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const newReport = useSelector((state) => {
    return state.reportReducer.newReport;
  });
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);
  const dispatch = useDispatch();
  const history = useHistory();
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;

  const initialValues = {
    firstName: newReport.firstName,
    lastName: newReport.lastName,
    dateOfBirth: newReport.dateOfBirth
      ? new Date(newReport.dateOfBirth)
      : new Date(),
    gender: newReport.gender,
    encounterDate: newReport.encounterDate
      ? new Date(newReport.encounterDate).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    ssn: "",
    staffInformation: {
      providerId: newReport.staffInformation
        ? newReport.staffInformation.providerId
        : "",
      technicianId: newReport.staffInformation
        ? newReport.staffInformation.technicianId
        : "",
    },
  };

  useEffect(() => {
    dispatch(getAllProviders());
    dispatch(getAllTechnicians());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  useEffect(() => {
    if (id) {
      // history.push(`/report/create/${id}/${step}`);

      dispatch(
        getReportById({
          id,
        })
      );
    } else {
      dispatch(setCompleted());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      history.push(`/report/create/${id}/${stepNewReport}`);
    }
  }, [id, stepNewReport, history]);

  // useEffect(() => {
  //   if (step > 0) {
  //     debugger;
  //     dispatch(setStepNewReport(stepNewReport + step));
  //   }
  // }, [step]);
  const onSuccess = (reportId) => {
    if (!id) {
      history.push(`/report/create/${reportId}`);
    }
  };

  const handleSave = (values, isValid) => {
    if (isValid) {
      dispatch(
        updateReport(
          {
            ...values,
            id,
            dateOfBirth: values.dateOfBirth.toISOString(),
            encounterDate: new Date(values.encounterDate).toISOString(),
          },
          onSuccess
        )
      );
    } else {
      setOpen(true);
    }
  };

  const handleSubmit = (values, isValid, e) => {
    e.preventDefault();
    if (isValid) {
      try {
        handleSave(values, isValid);
        dispatch(setStepNewReport(stepNewReport + 1));
        // setStatus({ sent: true });
        // setSubmitting(false);
      } catch (error) {
        // setStatus({ sent: false });
        // setErrors({ submit: error.message });
        // setSubmitting(false);
      }
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = Yup.object().shape({
    ssn: !id
      ? Yup.string()
          .required("Required")
          .min(4, "Must be exactly 4 characters")
          .max(4, "Must be exactly 4 characters")
      : Yup.string()
          .min(4, "Must be exactly 4 characters")
          .max(4, "Must be exactly 4 characters"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    dateOfBirth: Yup.date().required("Required"),
    encounterDate: Yup.date().required("Required"),
    gender: Yup.string().required("Required"),
    provider: Yup.number(),
    technician: Yup.number(),
  });

  return (
    <React.Fragment>
      <Snackbar
        position="left"
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Unable to Proceed
        </Alert>
      </Snackbar>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={(values) => {
          console.log(values);
          return {};
        }}
        validateOnMount={true}
        // onSubmit={handleSubmit}
      >
        {(formProps) => (
          <Form
            onSubmit={(e) => {
              handleSubmit(formProps.values, formProps.isValid, e);
            }}
          >
            <InnerForm {...formProps} />
            <CreateReportFooter
              {...formProps}
              id={id}
              handleSave={() => {
                handleSave(formProps.values, formProps.isValid);
              }}
            />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
export default PatientForm;
