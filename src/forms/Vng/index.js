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
import { vngReport, getVng } from "redux/reducers/reportReducer";

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
//   positionEnabled: {
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

const VngForm = (props) => {
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;
  const dispatch = useDispatch();
  const vngValues = useSelector((state) => state.reportReducer.vng);

  const initialValues = {
    ...vngValues,
  };
  // oculuMotors: {
  //   saccades: vngValues.oculuMotors.saccades,
  //   vertigo: vngValues.oculuMotors.vertigo,
  //   smoothPursuit: vngValues.oculuMotors.smoothPursuit,
  //   optokinetic: vngValues.oculuMotors.optokinetic,
  //   notes: vngValues.oculuMotors.notes,
  // },
  // gazeDenied: {
  //   center: {
  //     consent: vngValues.gazeDenied.center.consent,
  //     vertigo: vngValues.gazeDenied.center.vertigo,
  //     beatDirection: vngValues.gazeDenied.center.beatDirection,
  //     deg: vngValues.gazeDenied.center.deg,
  //   },
  //   right: {
  //     consent: vngValues.gazeDenied.right.consent,
  //     vertigo: vngValues.gazeDenied.right.vertigo,
  //     beatDirection: vngValues.gazeDenied.right.beatDirection,
  //     deg: vngValues.gazeDenied.right.deg,
  //   },
  //   left: {
  //     consent: vngValues.gazeDenied.left.consent,
  //     vertigo: vngValues.gazeDenied.left.vertigo,
  //     beatDirection: vngValues.gazeDenied.left.beatDirection,
  //     deg: vngValues.gazeDenied.left.deg,
  //   },
  //   up: {
  //     consent: vngValues.gazeDenied.up.consent,
  //     vertigo: vngValues.gazeDenied.up.vertigo,
  //     beatDirection: vngValues.gazeDenied.up.beatDirection,
  //     deg: vngValues.gazeDenied.up.deg,
  //   },
  //   notes: vngValues.gazeDenied.notes,
  // },
  // gazeEnabled: {
  //   center: {
  //     consent: vngValues.gazeEnabled.center.consent,
  //     vertigo: vngValues.gazeEnabled.center.vertigo,
  //     beatDirection: vngValues.gazeEnabled.center.beatDirection,
  //     deg: vngValues.gazeEnabled.center.deg,
  //   },
  //   right: {
  //     consent: vngValues.gazeEnabled.right.consent,
  //     vertigo: vngValues.gazeEnabled.right.vertigo,
  //     beatDirection: vngValues.gazeEnabled.right.beatDirection,
  //     deg: vngValues.gazeEnabled.right.deg,
  //   },
  //   left: {
  //     cconsent: vngValues.gazeEnabled.left.consent,
  //     vertigo: vngValues.gazeEnabled.left.vertigo,
  //     beatDirection: vngValues.gazeEnabled.left.beatDirection,
  //     deg: vngValues.gazeEnabled.left.deg,
  //   },
  //   up: {
  //     consent: vngValues.gazeEnabled.up.consent,
  //     vertigo: vngValues.gazeEnabled.up.vertigo,
  //     beatDirection: vngValues.gazeEnabled.up.beatDirection,
  //     deg: vngValues.gazeEnabled.up.deg,
  //   },
  //   notes: vngValues.gazeEnabled.notes,
  // },
  // highFrequecy: {
  //   seated: {
  //     normality: vngValues.highFrequecy.seated.normality,
  //     vertigo: vngValues.highFrequecy.seated.vertigo,
  //     beatDirection: vngValues.highFrequecy.seated.beatDirection,
  //     deg: vngValues.highFrequecy.seated.deg,
  //   },
  //   lateralRight: {
  //     normality: vngValues.highFrequecy.lateralRight.normality,
  //     vertigo: vngValues.highFrequecy.lateralRight.vertigo,
  //     beatDirection: vngValues.highFrequecy.lateralRight.beatDirection,
  //     deg: vngValues.highFrequecy.lateralRight.deg,
  //   },
  //   lateralLeft: {
  //     normality: vngValues.highFrequecy.lateralLeft.normality,
  //     vertigo: vngValues.highFrequecy.lateralLeft.vertigo,
  //     beatDirection: vngValues.highFrequecy.lateralLeft.beatDirection,
  //     deg: vngValues.highFrequecy.lateralLeft.deg,
  //   },
  //   notes: vngValues.highFrequecy.notes,
  // },
  // positionDenied: {
  //   supine: {
  //     normality: vngValues.positionDenied.supine.normality,
  //     vertigo: vngValues.positionDenied.supine.vertigo,
  //     beatDirection: vngValues.positionDenied.supine.beatDirection,
  //     deg: vngValues.positionDenied.supine.deg,
  //   },
  //   headRight: {
  //     normality: vngValues.positionDenied.headRight.normality,
  //     vertigo: vngValues.positionDenied.headRight.vertigo,
  //     beatDirection: vngValues.positionDenied.headRight.beatDirection,
  //     deg: vngValues.positionDenied.headRight.deg,
  //   },
  //   headLeft: {
  //     normality: vngValues.positionDenied.headLeft.normality,
  //     vertigo: vngValues.positionDenied.headLeft.vertigo,
  //     beatDirection: vngValues.positionDenied.headLeft.beatDirection,
  //     deg: vngValues.positionDenied.headLeft.deg,
  //   },
  //   bodyRight: {
  //     normality: vngValues.positionDenied.bodyRight.normality,
  //     vertigo: vngValues.positionDenied.bodyRight.vertigo,
  //     beatDirection: vngValues.positionDenied.bodyRight.beatDirection,
  //     deg: vngValues.positionDenied.bodyRight.deg,
  //   },
  //   bodyLeft: {
  //     normality: vngValues.positionDenied.bodyLeft.normality,
  //     vertigo: vngValues.positionDenied.bodyLeft.vertigo,
  //     beatDirection: vngValues.positionDenied.bodyLeft.beatDirection,
  //     deg: vngValues.positionDenied.bodyLeft.deg,
  //   },
  //   notes: vngValues.positionDenied.notes,
  // },
  // positionEnabled: {
  //   supine: {
  //     normality: vngValues.positionEnabled.supine.normality,
  //     vertigo: vngValues.positionEnabled.supine.vertigo,
  //     beatDirection: vngValues.positionEnabled.supine.beatDirection,
  //     deg: vngValues.positionEnabled.supine.deg,
  //   },
  //   headRight: {
  //     normality: vngValues.positionEnabled.headRight.normality,
  //     vertigo: vngValues.positionEnabled.headRight.vertigo,
  //     beatDirection: vngValues.positionEnabled.headRight.beatDirection,
  //     deg: vngValues.positionEnabled.headRight.deg,
  //   },
  //   headLeft: {
  //     normality: vngValues.positionEnabled.headLeft.normality,
  //     vertigo: vngValues.positionEnabled.headLeft.vertigo,
  //     beatDirection: vngValues.positionEnabled.headLeft.beatDirection,
  //     deg: vngValues.positionEnabled.headLeft.deg,
  //   },
  //   bodyRight: {
  //     normality: vngValues.positionEnabled.bodyRight.normality,
  //     vertigo: vngValues.positionEnabled.bodyRight.vertigo,
  //     beatDirection: vngValues.positionEnabled.bodyRight.beatDirection,
  //     deg: vngValues.positionEnabled.bodyRight.deg,
  //   },
  //   bodyLeft: {
  //     normality: vngValues.positionEnabled.bodyLeft.normality,
  //     vertigo: vngValues.positionEnabled.bodyLeft.vertigo,
  //     beatDirection: vngValues.positionEnabled.bodyLeft.beatDirection,
  //     deg: vngValues.positionEnabled.bodyLeft.deg,
  //   },
  //   notes: vngValues.positionEnabled.notes,
  // },
  // hallPick: {
  //   right: {
  //     index: vngValues.hallPick.right.index,
  //     vertigo: vngValues.hallPick.right.vertigo,
  //     beatDirection: vngValues.hallPick.right.beatDirection,
  //     deg: vngValues.hallPick.right.deg,
  //   },
  //   left: {
  //     index: vngValues.hallPick.left.index,
  //     vertigo: vngValues.hallPick.left.vertigo,
  //     beatDirection: vngValues.hallPick.left.beatDirection,
  //     deg: vngValues.hallPick.left.deg,
  //   },
  // },
  // calorics: {
  //   right: {
  //     warm: vngValues.calorics.right.warm,
  //     cool: vngValues.calorics.right.cool,
  //     vertigo: vngValues.calorics.right.vertigo,
  //     uwDp: vngValues.calorics.right.uwDp,
  //     fixationIndex: vngValues.calorics.right.fixationIndex,
  //   },
  //   left: {
  //     warm: vngValues.calorics.left.warm,
  //     cool: vngValues.calorics.left.cool,
  //     vertigo: vngValues.calorics.left.vertigo,
  //     uwDp: vngValues.calorics.left.uwDp,
  //     fixationIndex: vngValues.calorics.left.fixationIndex,
  //   },
  //   bilateralWeakness: vngValues.calorics.bilateralWeakness,
  // },

  const handleSubmit = async () => {};
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
  }, []);

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

export default VngForm;
