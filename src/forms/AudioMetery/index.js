import React, { Fragment, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import {
  LoadingStates,
  audiometryReport,
  getAudiometry,
} from "../../redux/reducers/reportReducer";
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
    ai: {
      rightEar: {
        tympanogram: audiometryValues.ai.rightEar.tympanogram,
        ispi: audiometryValues.ai.rightEar.ispi,
        contraFlex: audiometryValues.ai.rightEar.contraFlex,
        reflex: audiometryValues.ai.rightEar.reflex,
      },
      leftEar: {
        tympanogram: audiometryValues.ai.leftEar.tympanogram,
        ispi: audiometryValues.ai.leftEar.ispi,
        contraFlex: audiometryValues.ai.leftEar.contraFlex,
        reflex: audiometryValues.ai.leftEar.reflex,
      },
      notes: audiometryValues.ai.notes ? audiometryValues.ai.notes : "",
    },
    oe: {
      rightEar: {
        dpoae: audiometryValues.oe.rightEar.dpoae,
        teoae: audiometryValues.oe.rightEar.teoae,
      },
      leftEar: {
        dpoae: audiometryValues.oe.leftEar.dpoae,
        teoae: audiometryValues.oe.leftEar.teoae,
      },
      notes: audiometryValues.oe.notes ? audiometryValues.oe.notes : "",
    },
    audiogram: {
      rightEar: {
        dpoae: audiometryValues.audiogram.rightEar.dpoae,
        teoae: audiometryValues.audiogram.rightEar.teoae,
        instruction: audiometryValues.audiogram.rightEar.instruction,
      },
      leftEar: {
        dpoae: audiometryValues.audiogram.leftEar.dpoae,
        teoae: audiometryValues.audiogram.leftEar.teoae,
        instruction: audiometryValues.audiogram.leftEar.instruction,
      },
      notes: audiometryValues.audiogram.notes
        ? audiometryValues.audiogram.notes
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

  const handleSubmit = async () => {};
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
          <form onSubmit={handleSubmit}>
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
