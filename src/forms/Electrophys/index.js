import React, { Fragment } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import CreateReportFooter from "components/CreateReportFooter";
import ABRform from "./ABRform";
import ElectrophyForm from "./ElectrophyForm";
import CervicalForm from "./CervicalForm";
import OcularForm from "./OcularForm";

const initialValues = {
  abr: {
    right: {
      absoluteLatency: "",
      interWaveLatency: "",
      morphology: "",
    },
    left: {
      absoluteLatency: "",
      interWaveLatency: "",
      morphology: "",
    },
    notes: "",
  },
  eco: {
    right: {
      normality: "",
      ratio: "",
    },
    left: {
      normality: "",
      ratio: "",
    },
    notes: "",
  },
  cvemp: {
    right: {
      normality: "",
      precense: "",
      threshold: "",
      trend: "",
    },
    left: {
      normality: "",
      precense: "",
      threshold: "",
      trend: "",
    },
    notes: "",
  },
  ovemp: {
    right: {
      negPositive: "",
      presence: "",
      trend: "",
    },
    left: {
      negPositive: "",
      presence: "",
      trend: "",
    },
    notes: "",
  },
};

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  //   const { setFieldValue, isSubmitting, values } = props;
  return (
    <>
      <ABRform {...props} />
      <ElectrophyForm {...props} />
      <CervicalForm {...props} />
      <OcularForm {...props} />
    </>
  );
};

const Electrophys = () => {
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

export default Electrophys;
