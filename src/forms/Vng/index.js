import React, { Fragment, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import { Box, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import OculuMotors from "./OculuMotors";
import Gaze from "./Gaze";
import HighFrequency from "./HighFrequency";
import Positional from "./Positional";
import HallPick from "./HallPick";
import Calorics from "./Calorics";
import CreateReportFooter from "components/CreateReportFooter";
import Tabs from "components/Tabs";
import { TabWrapper } from "components/Tabs";
import { vngReport, getVng, LoadingStates } from "redux/reducers/reportReducer";
import { setStepNewReport } from "redux/reducers/uiReducer";

// const initialValues = {
//   oculuMotors: {
//     saccades: "",
//     vertigo: "",
//     smoothPursuit: "",
//     optokinetic: "",
//     notes: "",
//   },
//   gazeDenied: {
//     center: {
//       consent: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     right: {
//       consent: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     left: {
//       consent: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     up: {
//       consent: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     notes: "",
//   },
//   gazeEnabled: {
//     center: {
//       consent: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     right: {
//       consent: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     left: {
//       consent: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     up: {
//       consent: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     notes: "",
//   },
//   highFrequecy: {
//     seated: {
//       normality: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     lateralRight: {
//       normality: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     lateralLeft: {
//       normality: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     notes: "",
//   },
//   positionDenied: {
//     supine: {
//       normality: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     headRight: {
//       normality: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     headLeft: {
//       normality: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     bodyRight: {
//       normality: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     bodyLeft: {
//       normality: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     notes: "",
//   },
//   positionalsVisionEnabled: {
//     supine: {
//       normality: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     headRight: {
//       normality: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     headLeft: {
//       normality: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     bodyRight: {
//       normality: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     bodyLeft: {
//       normality: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     notes: "",
//   },
//   hallPick: {
//     right: {
//       index: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//     left: {
//       index: "",
//       vertigo: "",
//       beatDirection: "",
//       deg: "",
//     },
//   },
//   calorics: {
//     right: {
//       warm: "",
//       cool: "",
//       vertigo: "",
//       uwDp: "",
//       fixationIndex: "",
//     },
//     left: {
//       warm: "",
//       cool: "",
//       vertigo: "",
//       uwDp: "",
//       fixationIndex: "",
//     },
//     bilateralWeakness: false,
//   },
// };

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
  const reportLoading = useSelector((state) => state.reportReducer.loading);
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

  return isSubmitting ||
    reportLoading === LoadingStates.REPORT_CREATION_LOADING ? (
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
              formKey={"oculoMotors"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
          <section id="Gaze - Vision Denied">
            <Gaze
              formTitle={"Gaze - Vision Denied"}
              formKey={"gazeVisionDenied"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
          <section id="Gaze - Vision Enabled">
            <Gaze
              formTitle={"Gaze - Vision Enabled"}
              formKey={"gazeVisionEnabled"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
          <section id="High Frequency Headshake">
            <HighFrequency
              formTitle={"High Frequency Headshake"}
              formKey={"highFrequencyHeadshake"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
          <section id="Positionals – Vision Denied">
            <Positional
              formTitle={"Positionals – Vision Denied"}
              formKey={"positionalsVisionDenied"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
          <section id="Positionals – Vision Enabled">
            <Positional
              formTitle={"Positionals – Vision Enabled"}
              formKey={"positionalsVisionEnabled"}
              setFieldValue={setFieldValue}
              values={values}
            />
          </section>
          <section id="Hallpike">
            <HallPick
              formTitle={"Hallpike"}
              formKey={"hallPike"}
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

const VngForm = (props) => {
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;
  const dispatch = useDispatch();
  const vngValues = useSelector((state) => state.reportReducer.vng);
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);

  const initialValues = {
    // ...vngValues,

    oculoMotors: {
      saccades: vngValues.oculoMotors.saccades,
      vertigo: vngValues.oculoMotors.vertigo,
      smoothPursuit: vngValues.oculoMotors.smoothPursuit,
      optokinetic: vngValues.oculoMotors.optokinetic,
      notes: vngValues.oculoMotors.notes ? vngValues.oculoMotors.notes : "",
    },
    gazeVisionDenied: {
      center: {
        consent: vngValues.gazeVisionDenied.center.consent,
        vertigo: vngValues.gazeVisionDenied.center.vertigo,
        beatDirection: vngValues.gazeVisionDenied.center.beatDirection,
        deg: vngValues.gazeVisionDenied.center.deg
          ? vngValues.gazeVisionDenied.center.deg
          : "",
      },
      right: {
        consent: vngValues.gazeVisionDenied.right.consent,
        vertigo: vngValues.gazeVisionDenied.right.vertigo,
        beatDirection: vngValues.gazeVisionDenied.right.beatDirection,
        deg: vngValues.gazeVisionDenied.right.deg
          ? vngValues.gazeVisionDenied.right.deg
          : "",
      },
      left: {
        consent: vngValues.gazeVisionDenied.left.consent,
        vertigo: vngValues.gazeVisionDenied.left.vertigo,
        beatDirection: vngValues.gazeVisionDenied.left.beatDirection,
        deg: vngValues.gazeVisionDenied.left.deg
          ? vngValues.gazeVisionDenied.left.deg
          : "",
      },
      up: {
        consent: vngValues.gazeVisionDenied.up.consent,
        vertigo: vngValues.gazeVisionDenied.up.vertigo,
        beatDirection: vngValues.gazeVisionDenied.up.beatDirection,
        deg: vngValues.gazeVisionDenied.up.deg
          ? vngValues.gazeVisionDenied.up.deg
          : "",
      },
      notes: vngValues.gazeVisionDenied.notes
        ? vngValues.gazeVisionDenied.notes
        : "",
    },
    gazeVisionEnabled: {
      center: {
        consent: vngValues.gazeVisionEnabled.center.consent,
        vertigo: vngValues.gazeVisionEnabled.center.vertigo,
        beatDirection: vngValues.gazeVisionEnabled.center.beatDirection,
        deg: vngValues.gazeVisionEnabled.center.deg
          ? vngValues.gazeVisionEnabled.center.deg
          : "",
      },
      right: {
        consent: vngValues.gazeVisionEnabled.right.consent,
        vertigo: vngValues.gazeVisionEnabled.right.vertigo,
        beatDirection: vngValues.gazeVisionEnabled.right.beatDirection,
        deg: vngValues.gazeVisionEnabled.right.deg
          ? vngValues.gazeVisionEnabled.right.deg
          : "",
      },
      left: {
        cconsent: vngValues.gazeVisionEnabled.left.consent,
        vertigo: vngValues.gazeVisionEnabled.left.vertigo,
        beatDirection: vngValues.gazeVisionEnabled.left.beatDirection,
        deg: vngValues.gazeVisionEnabled.left.deg
          ? vngValues.gazeVisionEnabled.left.deg
          : "",
      },
      up: {
        consent: vngValues.gazeVisionEnabled.up.consent,
        vertigo: vngValues.gazeVisionEnabled.up.vertigo,
        beatDirection: vngValues.gazeVisionEnabled.up.beatDirection,
        deg: vngValues.gazeVisionEnabled.up.deg
          ? vngValues.gazeVisionEnabled.up.deg
          : "",
      },
      notes: vngValues.gazeVisionEnabled.notes
        ? vngValues.gazeVisionEnabled.notes
        : "",
    },
    highFrequencyHeadshake: {
      seated: {
        normality: vngValues.highFrequencyHeadshake.seated.normality,
        vertigo: vngValues.highFrequencyHeadshake.seated.vertigo,
        beatDirection: vngValues.highFrequencyHeadshake.seated.beatDirection,
        deg: vngValues.highFrequencyHeadshake.seated.deg
          ? vngValues.highFrequencyHeadshake.seated.deg
          : "",
      },
      lateralRight: {
        normality: vngValues.highFrequencyHeadshake.lateralRight.normality,
        vertigo: vngValues.highFrequencyHeadshake.lateralRight.vertigo,
        beatDirection:
          vngValues.highFrequencyHeadshake.lateralRight.beatDirection,
        deg: vngValues.highFrequencyHeadshake.lateralRight.deg
          ? vngValues.highFrequencyHeadshake.lateralRight.deg
          : "",
      },
      lateralLeft: {
        normality: vngValues.highFrequencyHeadshake.lateralLeft.normality,
        vertigo: vngValues.highFrequencyHeadshake.lateralLeft.vertigo,
        beatDirection:
          vngValues.highFrequencyHeadshake.lateralLeft.beatDirection,
        deg: vngValues.highFrequencyHeadshake.lateralLeft.deg
          ? vngValues.highFrequencyHeadshake.lateralLeft.deg
          : "",
      },
      notes: vngValues.highFrequencyHeadshake.notes
        ? vngValues.highFrequencyHeadshake.notes
        : "",
    },
    positionalsVisionDenied: {
      supine: {
        normality: vngValues.positionalsVisionDenied.supine.normality,
        vertigo: vngValues.positionalsVisionDenied.supine.vertigo,
        beatDirection: vngValues.positionalsVisionDenied.supine.beatDirection,
        deg: vngValues.positionalsVisionDenied.supine.deg
          ? vngValues.positionalsVisionDenied.supine.deg
          : "",
      },
      headRight: {
        normality: vngValues.positionalsVisionDenied.headRight.normality,
        vertigo: vngValues.positionalsVisionDenied.headRight.vertigo,
        beatDirection:
          vngValues.positionalsVisionDenied.headRight.beatDirection,
        deg: vngValues.positionalsVisionDenied.headRight.deg
          ? vngValues.positionalsVisionDenied.headRight.deg
          : "",
      },
      headLeft: {
        normality: vngValues.positionalsVisionDenied.headLeft.normality,
        vertigo: vngValues.positionalsVisionDenied.headLeft.vertigo,
        beatDirection: vngValues.positionalsVisionDenied.headLeft.beatDirection,
        deg: vngValues.positionalsVisionDenied.headLeft.deg
          ? vngValues.positionalsVisionDenied.headLeft.deg
          : "",
      },
      bodyRight: {
        normality: vngValues.positionalsVisionDenied.bodyRight.normality,
        vertigo: vngValues.positionalsVisionDenied.bodyRight.vertigo,
        beatDirection:
          vngValues.positionalsVisionDenied.bodyRight.beatDirection,
        deg: vngValues.positionalsVisionDenied.bodyRight.deg
          ? vngValues.positionalsVisionDenied.bodyRight.deg
          : "",
      },
      bodyLeft: {
        normality: vngValues.positionalsVisionDenied.bodyLeft.normality,
        vertigo: vngValues.positionalsVisionDenied.bodyLeft.vertigo,
        beatDirection: vngValues.positionalsVisionDenied.bodyLeft.beatDirection,
        deg: vngValues.positionalsVisionDenied.bodyLeft.deg
          ? vngValues.positionalsVisionDenied.bodyLeft.deg
          : "",
      },
      notes: vngValues.positionalsVisionDenied.notes
        ? vngValues.positionalsVisionDenied.notes
        : "",
    },
    positionalsVisionEnabled: {
      supine: {
        normality: vngValues.positionalsVisionEnabled.supine.normality,
        vertigo: vngValues.positionalsVisionEnabled.supine.vertigo,
        beatDirection: vngValues.positionalsVisionEnabled.supine.beatDirection,
        deg: vngValues.positionalsVisionEnabled.supine.deg
          ? vngValues.positionalsVisionEnabled.supine.deg
          : "",
      },
      headRight: {
        normality: vngValues.positionalsVisionEnabled.headRight.normality,
        vertigo: vngValues.positionalsVisionEnabled.headRight.vertigo,
        beatDirection:
          vngValues.positionalsVisionEnabled.headRight.beatDirection,
        deg: vngValues.positionalsVisionEnabled.headRight.deg
          ? vngValues.positionalsVisionEnabled.headRight.deg
          : "",
      },
      headLeft: {
        normality: vngValues.positionalsVisionEnabled.headLeft.normality,
        vertigo: vngValues.positionalsVisionEnabled.headLeft.vertigo,
        beatDirection:
          vngValues.positionalsVisionEnabled.headLeft.beatDirection,
        deg: vngValues.positionalsVisionEnabled.headLeft.deg
          ? vngValues.positionalsVisionEnabled.headLeft.deg
          : "",
      },
      bodyRight: {
        normality: vngValues.positionalsVisionEnabled.bodyRight.normality,
        vertigo: vngValues.positionalsVisionEnabled.bodyRight.vertigo,
        beatDirection:
          vngValues.positionalsVisionEnabled.bodyRight.beatDirection,
        deg: vngValues.positionalsVisionEnabled.bodyRight.deg
          ? vngValues.positionalsVisionEnabled.bodyRight.deg
          : "",
      },
      bodyLeft: {
        normality: vngValues.positionalsVisionEnabled.bodyLeft.normality,
        vertigo: vngValues.positionalsVisionEnabled.bodyLeft.vertigo,
        beatDirection:
          vngValues.positionalsVisionEnabled.bodyLeft.beatDirection,
        deg: vngValues.positionalsVisionEnabled.bodyLeft.deg
          ? vngValues.positionalsVisionEnabled.bodyLeft.deg
          : "",
      },
      notes: vngValues.positionalsVisionEnabled.notes
        ? vngValues.positionalsVisionEnabled.notes
        : "",
    },
    hallPike: {
      right: {
        index: vngValues.hallPike.right.index,
        vertigo: vngValues.hallPike.right.vertigo,
        beatDirection: vngValues.hallPike.right.beatDirection,
        deg: vngValues.hallPike.right.deg ? vngValues.hallPike.right.deg : "",
      },
      left: {
        index: vngValues.hallPike.left.index,
        vertigo: vngValues.hallPike.left.vertigo,
        beatDirection: vngValues.hallPike.left.beatDirection,
        deg: vngValues.hallPike.left.deg ? vngValues.hallPike.left.deg : "",
      },
      notes: vngValues.hallPike.notes ? vngValues.hallPike.notes : "",
    },
    calorics: {
      right: {
        warm: vngValues.calorics.right.warm || "",
        cool: vngValues.calorics.right.cool || "",
        vertigo: vngValues.calorics.right.vertigo || "",
        uwDp: vngValues.calorics.right.uwDp || "",
        fixationIndex: vngValues.calorics.right.fixationIndex || "",
      },
      left: {
        warm: vngValues.calorics.left.warm || "",
        cool: vngValues.calorics.left.cool || "",
        vertigo: vngValues.calorics.left.vertigo || "",
        uwDp: vngValues.calorics.left.uwDp || "",
        fixationIndex: vngValues.calorics.left.fixationIndex || "",
      },
      notes: vngValues.calorics.notes ? vngValues.calorics.notes : "",
      bilateralWeakness: vngValues.calorics.bilateralWeakness,
    },
  };

  const handleSave = (values) => {
    dispatch(
      vngReport({
        reportId: id,
        ...values,
        // firstNotedProblem: values.hpi.firstNotedProblem.toISOString(),
        // mostRecentEpisode: values.hpi.mostRecentEpisode.toISOString(),
      })
    );
  };
  useEffect(() => {
    if (id) {
      dispatch(
        getVng({
          reportId: id,
        })
      );
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      props.history.push(`/report/create/${id}/${stepNewReport}`);
    }
  }, [id, stepNewReport, props.history]);

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

export default VngForm;
