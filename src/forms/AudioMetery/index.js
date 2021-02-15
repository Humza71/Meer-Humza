import React, { Fragment } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import CreateReportFooter from "components/CreateReportFooter";
import OutoscopyForm from "./OutoscopyForm";
import AucousticForm from "./AucousticForm";
import OtoacousticForm from "./OtoacousticForm";
import AudiogramForm from "./AudiogramForm";

const initialValues = {
  otoscopy: {
    rightEar: {
      result: "",
      measurement: "",
    },
    leftEar: {
      result: "",
      measurement: "",
    },
    notes: "",
  },
  ai: {
    rightEar: { tympanogram: "", ispi: "", contraFlex: "", reflex: "" },
    leftEar: { tympanogram: "", ispi: "", contraFlex: "", reflex: "" },
    notes: "",
  },
  oe: {
    rightEar: { dpoae: "", teoae: "" },
    leftEar: { dpoae: "", teoae: "" },
    notes: "",
  },
  audiogram: {
    rightEar: { dpoae: "", teoae: "" },
    leftEar: { dpoae: "", teoae: "" },
    notes: "",
  },
};

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  //   const { setFieldValue, isSubmitting, values } = props;
  return (
    <>
      <OutoscopyForm {...props} />
      <AucousticForm {...props} />
      <OtoacousticForm {...props} />
      <AudiogramForm {...props} />
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
