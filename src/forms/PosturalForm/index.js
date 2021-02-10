import React, { Fragment } from "react";
import styled from "styled-components/macro";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert as MuiAlert } from "@material-ui/lab";
import { spacing } from "@material-ui/system";

import GansForm from "./GansForm";
import PostugraphyForm from "./PostugraphyForm";

const Alert = styled(MuiAlert)(spacing);

const initialValues = {
  gsoTest: {
    condition1: "",
    condition2: "",
    condition3: "",
    condition4: "",
    condition5: "",
    condition6: "",
    steppingFakuda: "",
    notes: "",
  },
  cdpTest: {
    soTest: {
      condition1: "",
      condition2: "",
      condition3: "",
      condition4: "",
      condition5: "",
      condition6: "",
    },
    mcTest: {
      bt: "",
      ft: "",
    },
    adTest: {
      tu: "",
      td: "",
    },
    notes: "",
  },
};

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  const {
    //errors,
    //handleBlur,
    //handleChange,
    setFieldValue,
    //isSubmitting,
    //touched,
    values,
    status,
  } = props;

  return (
    <>
      {status && status.sent && (
        <Alert severity="success" my={3}>
          Your data has been submitted successfully!
        </Alert>
      )}
      <GansForm values={values} setFieldValue={setFieldValue} />
      <PostugraphyForm values={values} setFieldValue={setFieldValue} />
    </>
  );
};

const PosturalForm = () => {
  const handleSubmit = async () => {};

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={(values) => {
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
    </Fragment>
  );
};

export default PosturalForm;
