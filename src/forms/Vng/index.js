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
      bW: "",
    },
    left: {
      warm: "",
      cool: "",
      vertigo: "",
      uwDp: "",
      fixationIndex: "",
      bW: "",
    },
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
      <OculuMotors
        formTitle={"Oculo-motors"}
        formKey={"oculuMotors"}
        setFieldValue={setFieldValue}
        values={values}
      />
      <Gaze
        formTitle={"Gaze - Vision Denied"}
        formKey={"gazeDenied"}
        setFieldValue={setFieldValue}
        values={values}
      />
      <Gaze
        formTitle={"Gaze - Vision Enabled"}
        formKey={"gazeEnabled"}
        setFieldValue={setFieldValue}
        values={values}
      />
      <HighFrequency
        formTitle={"High Frequency Headshake"}
        formKey={"highFrequecy"}
        setFieldValue={setFieldValue}
        values={values}
      />
      <Positional
        formTitle={"Positionals – Vision Denied"}
        formKey={"positionDenied"}
        setFieldValue={setFieldValue}
        values={values}
      />
      <Positional
        formTitle={"Positionals – Vision Enabled"}
        formKey={"positionEnabled"}
        setFieldValue={setFieldValue}
        values={values}
      />
      <HallPick
        formTitle={"Hallpike"}
        formKey={"hallPick"}
        setFieldValue={setFieldValue}
        values={values}
      />
      <Calorics
        formTitle={"Calorics"}
        formKey={"calorics"}
        setFieldValue={setFieldValue}
        values={values}
      />
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
