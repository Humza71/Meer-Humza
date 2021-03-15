import React, { Fragment, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import {
  LoadingStates,
  audiometryReport,
  getAudiometry,
} from "../../redux/reducers/reportReducer";
import { setStepNewReport } from "redux/reducers/uiReducer";
import { useDispatch, useSelector } from "react-redux";
import CreateReportFooter from "components/CreateReportFooter";
import OutoscopyForm from "./OutoscopyForm";
import AucousticForm from "./AucousticForm";
import OtoacousticForm from "./OtoacousticForm";
import AudiogramForm from "./AudiogramForm";
import Tabs from "components/Tabs";
import FlexBox from "components/FlexBox";
import { Box, CircularProgress } from "@material-ui/core";
import { TabWrapper } from "components/Tabs";

// const initialValues = {
//   otoscopy: {
//     rightEar: {
//       result: "",
//       measurement: "",
//     },
//     leftEar: {
//       result: "",
//       measurement: "",
//     },
//     notes: "",
//   },
//   ai: {
//     rightEar: { tympanogram: "", ispi: "", contraFlex: "", reflex: "" },
//     leftEar: { tympanogram: "", ispi: "", contraFlex: "", reflex: "" },
//     notes: "",
//   },
//   oe: {
//     rightEar: { dpoae: "", teoae: "" },
//     leftEar: { dpoae: "", teoae: "" },
//     notes: "",
//   },
//   audiogram: {
//     rightEar: { dpoae: "", teoae: "" },
//     leftEar: { dpoae: "", teoae: "" },
//     notes: "",
//   },
// };

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  //   const { setFieldValue, isSubmitting, values } = props;
  const reportLoading = useSelector((state) => state.reportReducer.loading);
  const labels = [
    "Otoscopy",
    "Acoustic Immittance",
    "Otoacoustic Emissions",
    "Audiogram",
  ];

  return reportLoading === LoadingStates.REPORT_CREATION_LOADING ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
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

const AudioMetery = (props) => {
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;
  const dispatch = useDispatch();
  const audiometryValues = useSelector(
    (state) => state.reportReducer.audiometry
  );
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);
  const initialValues = {
    otoscopy: {
      rightEar: {
        result: audiometryValues.otoscopy.rightEar.result,
        measurement: audiometryValues.otoscopy.rightEar.measurement,
        instruction: audiometryValues.otoscopy.rightEar.instruction,
      },
      leftEar: {
        result: audiometryValues.otoscopy.leftEar.result,
        measurement: audiometryValues.otoscopy.leftEar.measurement,
        instruction: audiometryValues.otoscopy.leftEar.instruction,
      },

      notes: audiometryValues.otoscopy.notes
        ? audiometryValues.otoscopy.notes
        : "",
    },
    acousticImmittance: {
      rightEar: {
        tympanogram: audiometryValues.acousticImmittance.rightEar.tympanogram,
        ispi: audiometryValues.acousticImmittance.rightEar.ispi,
        contraFlex: audiometryValues.acousticImmittance.rightEar.contraFlex,
        reflex: audiometryValues.acousticImmittance.rightEar.reflex,
      },
      leftEar: {
        tympanogram: audiometryValues.acousticImmittance.leftEar.tympanogram,
        ispi: audiometryValues.acousticImmittance.leftEar.ispi,
        contraFlex: audiometryValues.acousticImmittance.leftEar.contraFlex,
        reflex: audiometryValues.acousticImmittance.leftEar.reflex,
      },
      notes: audiometryValues.acousticImmittance.notes
        ? audiometryValues.acousticImmittance.notes
        : "",
    },
    otoacousticEmissions: {
      rightEar: {
        dpoae: audiometryValues.otoacousticEmissions.rightEar.dpoae,
        teoae: audiometryValues.otoacousticEmissions.rightEar.teoae,
      },
      leftEar: {
        dpoae: audiometryValues.otoacousticEmissions.leftEar.dpoae,
        teoae: audiometryValues.otoacousticEmissions.leftEar.teoae,
      },
      notes: audiometryValues.otoacousticEmissions.notes
        ? audiometryValues.otoacousticEmissions.notes
        : "",
    },
    audioGram: {
      rightEar: {
        dpoae: audiometryValues.audioGram.rightEar.dpoae,
        teoae: audiometryValues.audioGram.rightEar.teoae,
        instruction: audiometryValues.audioGram.rightEar.instruction,
      },
      leftEar: {
        dpoae: audiometryValues.audioGram.leftEar.dpoae,
        teoae: audiometryValues.audioGram.leftEar.teoae,
        instruction: audiometryValues.audioGram.leftEar.instruction,
      },
      notes: audiometryValues.audioGram.notes
        ? audiometryValues.audioGram.notes
        : "",
    },
  };

  const handleSave = (values) => {
    dispatch(
      audiometryReport({
        reportId: id,
        ...values,
      })
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(
        getAudiometry({
          reportId: id,
        })
      );
    }
  }, [dispatch, id]);

  const handleSubmit = async (values) => {
    try {
      handleSave(values);
      dispatch(setStepNewReport(stepNewReport + 1));
      // setStatus({ sent: true });
      // setSubmitting(false);
    } catch (error) {
      // setStatus({ sent: false });
      // setErrors({ submit: error.message });
      // setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={(values) => {
          console.log(values);

          return {};
        }}
        onSubmit={handleSubmit}
      >
        {(formProps) => (
          <form onSubmit={() => handleSubmit(formProps.values)}>
            <InnerForm {...formProps} />
            <CreateReportFooter
              {...formProps}
              handleSave={() => {
                handleSave(formProps.values);
              }}
            />
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

export default AudioMetery;
