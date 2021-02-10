import React, { Fragment } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import CreateReportFooter from "components/CreateReportFooter";
import VhitForm from "./VhitForm";

const initialValues = {
  lateral: {
    noramlity: "",
    saccades: "",
    reduceGain: "",
  },
  ralp: {
    noramlity: "",
    saccades: "",
    reduceGain: "",
  },
  larp: {
    noramlity: "",
    saccades: "",
    reduceGain: "",
  },
  notes: "",
};

const validationSchema = Yup.object().shape({});

const VHIT = () => {
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
            <VhitForm {...formProps} />
            <CreateReportFooter {...formProps} onSave={() => {}} />
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

export default VHIT;
