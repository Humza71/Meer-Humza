import React, { Fragment } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import CreateReportFooter from "components/CreateReportFooter";
import ScreeningTest from "./ScreeningTest";

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
  actuity: {
    horizontal: {
      negPositive: "",
    },
    vertical: {
      negPositive: "",
    },
  },
  impulse: {
    right: {
      negPositive: "",
    },
    left: {
      negPositive: "",
    },
  },
};

const validationSchema = Yup.object().shape({});

const vastForms = [
  {
    title: "Vertebral Artery Screening Test (VAST)",
    sectionKey: "vast",
    rows: ["right", "left"],
    rowOptions: {
      right: {
        rowTitle: "Right",
        valueKey: "negPositive",
        options: [
          {
            title: "Positive",
            value: "positive",
          },
          {
            title: "Negative",
            value: "negative",
          },
        ],
      },
      left: {
        rowTitle: "Left",
        valueKey: "negPositive",
        options: [
          {
            title: "Positive",
            value: "positive",
          },
          {
            title: "Negative",
            value: "negative",
          },
        ],
      },
    },
  },
  {
    title: "Cervical Dizziness Screening Test",
    sectionKey: "cervical",
    rows: ["right", "left"],
    rowOptions: {
      right: {
        rowTitle: "Right",
        valueKey: "negPositive",
        options: [
          {
            title: "Positive",
            value: "positive",
          },
          {
            title: "Negative",
            value: "negative",
          },
        ],
      },
      left: {
        rowTitle: "Left",
        valueKey: "negPositive",
        options: [
          {
            title: "Positive",
            value: "positive",
          },
          {
            title: "Negative",
            value: "negative",
          },
        ],
      },
    },
  },
];

const aibForms = [
  {
    title: "AIB – Computerized Dynamic Visual Acuity Test ©",
    sectionKey: "actuity",
    rows: ["horizontal", "vertical"],
    rowOptions: {
      horizontal: {
        rowTitle: "Horizontal",
        valueKey: "negPositive",
        options: [
          {
            title: "Positive",
            value: "positive",
          },
          {
            title: "Negative",
            value: "negative",
          },
        ],
      },
      vertical: {
        rowTitle: "Vertical",
        valueKey: "negPositive",
        options: [
          {
            title: "Positive",
            value: "positive",
          },
          {
            title: "Negative",
            value: "negative",
          },
        ],
      },
    },
  },
  {
    title: "Head Impulse Test",
    sectionKey: "impulse",
    rows: ["right", "left"],
    rowOptions: {
      right: {
        rowTitle: "Right",
        valueKey: "negPositive",
        options: [
          {
            title: "Positive",
            value: "positive",
          },
          {
            title: "Negative",
            value: "negative",
          },
        ],
      },
      left: {
        rowTitle: "Left",
        valueKey: "negPositive",
        options: [
          {
            title: "Positive",
            value: "positive",
          },
          {
            title: "Negative",
            value: "negative",
          },
        ],
      },
    },
  },
];

const InnerForm = (props) => {
  return (
    <>
      <ScreeningTest {...props} forms={vastForms} />
      <ScreeningTest {...props} forms={aibForms} />
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
