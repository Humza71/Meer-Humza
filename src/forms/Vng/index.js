import React, { Fragment } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import { Box, CircularProgress } from "@material-ui/core";

import OculuMotors from "./OculuMotors";
import Gaze from "./Gaze";
import HighFrequency from "./HighFrequency";
import Positional from "./Positional";
import HallPick from "./HallPick";
import Calorics from "./Calorics";
import CreateReportFooter from "components/CreateReportFooter";
import Tabs from "components/Tabs";
import { TabWrapper } from "components/Tabs";

const initialValues = {
  oculuMotors: {
    saccades: "",
    vertigo: "",
    smoothPursuit: "",
    optokinetic: "",
    notes: "",
  },
  gazeDenied: {
    center: {
      consent: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    right: {
      consent: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    left: {
      consent: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    up: {
      consent: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    notes: "",
  },
  gazeEnabled: {
    center: {
      consent: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    right: {
      consent: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    left: {
      consent: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    up: {
      consent: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    notes: "",
  },
  highFrequecy: {
    seated: {
      normality: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    lateralRight: {
      normality: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    lateralLeft: {
      normality: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    notes: "",
  },
  positionDenied: {
    supine: {
      normality: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    headRight: {
      normality: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    headLeft: {
      normality: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    bodyRight: {
      normality: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    bodyLeft: {
      normality: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    notes: "",
  },
  positionEnabled: {
    supine: {
      normality: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    headRight: {
      normality: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    headLeft: {
      normality: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    bodyRight: {
      normality: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    bodyLeft: {
      normality: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    notes: "",
  },
  hallPick: {
    right: {
      index: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
    left: {
      index: "",
      vertigo: "",
      beatDirection: "",
      deg: "",
    },
  },
  calorics: {
    right: {
      warm: "",
      cool: "",
      vertigo: "",
      uwDp: "",
      fixationIndex: "",
    },
    left: {
      warm: "",
      cool: "",
      vertigo: "",
      uwDp: "",
      fixationIndex: "",
    },
    bilateralWeakness: false,
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

  const labels = [
    "Oculo-motors",
    "Gaze - Vision Denied",
    "Gaze - Vision Enabled",
    "High Frequency Headshake",
    "Positionals – Vision Denied",
    "Positionals – Vision Enabled",
    "Hallpike",
    "Calorics",
  ];

  return isSubmitting ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Tabs labels={labels}>
        <TabWrapper>
          <section id="Oculo-motors">
            <OculuMotors
              formTitle={"Oculo-motors"}
              formKey={"oculuMotors"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
          <section id="Gaze - Vision Denied">
            <Gaze
              formTitle={"Gaze - Vision Denied"}
              formKey={"gazeDenied"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
          <section id="Gaze - Vision Denied">
            <Gaze
              formTitle={"Gaze - Vision Denied"}
              formKey={"gazeEnabled"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
          <section id="High Frequency Headshake">
            <HighFrequency
              formTitle={"High Frequency Headshake"}
              formKey={"highFrequecy"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
          <section id="Positionals – Vision Denied">
            <Positional
              formTitle={"Positionals – Vision Denied"}
              formKey={"positionDenied"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
          <section id="Positionals – Vision Enabled">
            <Positional
              formTitle={"Positionals – Vision Enabled"}
              formKey={"positionEnabled"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
          <section id="Hallpike">
            <HallPick
              formTitle={"Hallpike"}
              formKey={"hallPick"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
          <section id="Calorics">
            <Calorics
              formTitle={"Calorics"}
              formKey={"calorics"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
        </TabWrapper>
      </Tabs>
    </>
  );
};

const VngForm = () => {
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

export default VngForm;
