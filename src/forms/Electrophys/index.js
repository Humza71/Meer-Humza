import React, { Fragment } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import CreateReportFooter from "components/CreateReportFooter";
import ABRform from "./ABRform";
import ElectrophyForm from "./ElectrophyForm";
import CervicalForm from "./CervicalForm";
import OcularForm from "./OcularForm";
import Tabs from "components/Tabs";
import { TabWrapper } from "components/Tabs";

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
  const labels = [
    "Auditory Brainstem Response (ABR)",
    "Electrocochleography(ECoG)",
    "Cervical Vestibular Evoked Myogenic Potential (cVEMP)",
    "Ocular Vestibular Evoked Myogenic Potential (oVEMP)",
  ];

  return (
    <>
      <Tabs labels={labels}>
        <TabWrapper>
          <section id="Auditory Brainstem Response (ABR)">
            <ABRform {...props} />
          </section>
          <section id="Electrocochleography(ECoG)">
            <ElectrophyForm {...props} />
          </section>
          <section id="Cervical Vestibular Evoked Myogenic Potential (cVEMP)">
            <CervicalForm {...props} />
          </section>
          <section id="Ocular Vestibular Evoked Myogenic Potential (oVEMP)">
            <OcularForm {...props} />
          </section>
        </TabWrapper>
      </Tabs>
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
