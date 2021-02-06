import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";

import { Alert as MuiAlert } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import {
  Box,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Typography as MuiTypography,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

import CreateReportFooter from "components/CreateReportFooter";
import { setStepNewReport } from "redux/reducers/uiReducer";
// import { updateNewReport } from "redux/reducers/reportReducer";

const Card = styled(MuiCard)(spacing);
const Alert = styled(MuiAlert)(spacing);
const Typography = styled(MuiTypography)(spacing);

const OutCard = styled(Card)`
  width: 500px;
  margin: 20px auto;
`;

const validationSchema = Yup.object().shape({
  files: Yup.array(),
});

const InnerForm = (props) => {
  const {
    errors,
    handleBlur,
    setFieldValue,
    isSubmitting,
    touched,
    values,
    status,
  } = props;

  return (
    <OutCard mb={6}>
      <CardContent>
        <Typography variant="h6" mb={5} gutterBottom>
          Upload your files
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
            <DropzoneArea
              dropzoneText="Drop your files here or browse"
              showFileNamesInPreview={true}
              showFileNames={true}
              value={values.files}
              onChange={(value) => setFieldValue("files", value)}
              error={Boolean(touched.files && errors.files)}
              helperText={touched.files && errors.files}
              onBlur={handleBlur}
            />
          </>
        )}
      </CardContent>
    </OutCard>
  );
};

const FilesForm = () => {
  const newReport = useSelector((state) => state.reportReducer.newReport);
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);
  const dispatch = useDispatch();

  const initialValues = {
    files: newReport.files,
  };

  const handleSave = (values) => {
    console.log(values);
    // dispatch(updateNewReport(values));
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
              handleSave={() => handleSave(formProps.values)}
            />
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
export default FilesForm;
