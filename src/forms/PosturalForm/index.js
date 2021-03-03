import React, { Fragment } from "react";
import styled from "styled-components/macro";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert as MuiAlert } from "@material-ui/lab";
import { spacing } from "@material-ui/system";

import GansForm from "./GansForm";
import PostugraphyForm from "./PostugraphyForm";
import CreateReportFooter from "components/CreateReportFooter";
import Tabs from "components/Tabs";
import FlexBox from "components/FlexBox";

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

  const labels = [
    "Gans Sensory Organization Performance Test ©",
    "Computerized Dynamic Posturography",
  ];

  return (
    <>
      {status && status.sent && (
        <Alert severity="success" my={3}>
          Your data has been submitted successfully!
        </Alert>
      )}
      <FlexBox>
        <Tabs labels={labels}>
          <section id="Gans Sensory Organization Performance Test ©">
            <GansForm values={values} setFieldValue={setFieldValue} />
          </section>
          <section id="Computerized Dynamic Posturography">
            <PostugraphyForm values={values} setFieldValue={setFieldValue} />
          </section>
        </Tabs>
      </FlexBox>
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
            <CreateReportFooter {...formProps} onSave={() => {}} />
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

export default PosturalForm;
