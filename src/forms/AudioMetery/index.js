import React, { Fragment } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import CreateReportFooter from "components/CreateReportFooter";
import OutoscopyForm from "./OutoscopyForm";
import AucousticForm from "./AucousticForm";
import OtoacousticForm from "./OtoacousticForm";
import AudiogramForm from "./AudiogramForm";
import Tabs from "components/Tabs";
import FlexBox from "components/FlexBox";
import { TabWrapper } from "components/Tabs";

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
  const labels = [
    "Otoscopy",
    "Acoustic Immittance",
    "Otoacoustic Emissions",
    "Audiogram",
  ];

  return (
    <>
      <FlexBox>
        <Tabs labels={labels}>
          <TabWrapper>
            <section id="Otoscopy">
              <OutoscopyForm {...props} />
            </section>
            <section id="Acoustic Immittance">
              <AucousticForm {...props} />
            </section>
            <section id="Otoacoustic Emissions">
              <OtoacousticForm {...props} />
            </section>
            <section id="Audiogram">
              <AudiogramForm {...props} />
            </section>
          </TabWrapper>
        </Tabs>
      </FlexBox>
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
