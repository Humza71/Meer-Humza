import React, { Fragment } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import { Box, CircularProgress } from "@material-ui/core";
import HPI from "./HPI";
import AuralSymptom from "./AuralSymptom";
import HealthConditionForm from "./HealthConditionForm";

import CreateReportFooter from "components/CreateReportFooter";

const initialValues = {
  hpi: {
    fnp: new Date(),
    recentEpisode: new Date(),
    symptoms: "",
    symptomDuration: "",
    provokesWith: "",
    notes: "",
  },
  auralSymptom: {
    shl: "",
    ap: "",
    otorrhea: "",
    tinnitus: "",
    otalgia: "",
  },
  healthCondition: {
    conditions: [],
  },
};

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  const {
    // errors,
    // handleBlur,
    // handleChange,
    setFieldValue,
    isSubmitting,
    // touched,
    values,
    // status,
  } = props;

  return isSubmitting ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <HPI
        values={values}
        setFieldValue={setFieldValue}
        isSubmitting={isSubmitting}
      />
      <AuralSymptom
        values={values}
        setFieldValue={setFieldValue}
        isSubmitting={isSubmitting}
      />
      <HealthConditionForm
        values={values}
        setFieldValue={setFieldValue}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

const History = () => {
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

export default History;
