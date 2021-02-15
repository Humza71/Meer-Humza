import React, { Fragment } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import CreateReportFooter from "components/CreateReportFooter";
import ScreeningTest from "./ScreeningTest";
// import AucousticForm from "./AucousticForm";
// import OtoacousticForm from "./OtoacousticForm";
// import AudiogramForm from "./AudiogramForm";

const initialValues = {
  vast: {
    right: {
      negPositive: "",
    },
    left: {
      negPositive: "",
    },
    notes: "",
  },
  cervical: {
    right: {
      negPositive: "",
    },
    left: {
      negPositive: "",
    },
    notes: "",
  },
};

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  //   const { setFieldValue, isSubmitting, values } = props;
  return (
    <>
      <ScreeningTest {...props} />
      {/*<AucousticForm {...props} />
      <OtoacousticForm {...props} />
      <AudiogramForm {...props} /> */}
    </>
  );
};

const AudioMetery = () => {
  const handleSubmit = async () => {};
  return (
    <Fragment>
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
            <CreateReportFooter {...formProps} onSave={() => {}} />
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

export default AudioMetery;
