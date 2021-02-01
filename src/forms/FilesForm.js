import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import styled from "styled-components/macro";

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

const Card = styled(MuiCard)(spacing);
const Alert = styled(MuiAlert)(spacing);
const Typography = styled(MuiTypography)(spacing);

const OutCard = styled(Card)`
  width: 500px;
  margin: 20px auto;
`;

const initialValues = {
  files: [],
};

const validationSchema = Yup.object().shape({
  files: Yup.array(),
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
  const handleSubmit = async (
    values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      resetForm();
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
          <form onSubmit={handleSubmit}>
            <InnerForm {...formProps} />
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};
export default FilesForm;
