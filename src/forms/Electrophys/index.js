import React, { Fragment, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import {
  electrophysReport,
  getElectrophys,
  LoadingStates,
} from "../../redux/reducers/reportReducer";
import { setStepNewReport } from "redux/reducers/uiReducer";
import { useDispatch, useSelector } from "react-redux";
import CreateReportFooter from "components/CreateReportFooter";
import ABRform from "./ABRform";
import ElectrophyForm from "./ElectrophyForm";
import CervicalForm from "./CervicalForm";
import OcularForm from "./OcularForm";
import Tabs from "components/Tabs";
import { Box, CircularProgress } from "@material-ui/core";
import { TabWrapper } from "components/Tabs";

// const initialValues = {
//   abr: {
//     right: {
//       absoluteLatency: "",
//       interWaveLatency: "",
//       morphology: "",
//     },
//     left: {
//       absoluteLatency: "",
//       interWaveLatency: "",
//       morphology: "",
//     },
//     notes: "",
//   },
//   eco: {
//     right: {
//       normality: "",
//       ratio: "",
//     },
//     left: {
//       normality: "",
//       ratio: "",
//     },
//     notes: "",
//   },
//   cvemp: {
//     right: {
//       normality: "",
//       precense: "",
//       threshold: "",
//       trend: "",
//     },
//     left: {
//       normality: "",
//       precense: "",
//       threshold: "",
//       trend: "",
//     },
//     notes: "",
//   },
//   ovemp: {
//     right: {
//       negPositive: "",
//       presence: "",
//       trend: "",
//     },
//     left: {
//       negPositive: "",
//       presence: "",
//       trend: "",
//     },
//     notes: "",
//   },
// };

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  const reportLoading = useSelector((state) => state.reportReducer.loading);
  //   const { setFieldValue, isSubmitting, values } = props;
  const labels = [
    "Auditory Brainstem Response (ABR)",
    "Electrocochleography(ECoG)",
    "Cervical Vestibular Evoked Myogenic Potential (cVEMP)",
    "Ocular Vestibular Evoked Myogenic Potential (oVEMP)",
  ];

  return reportLoading === LoadingStates.REPORT_CREATION_LOADING ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
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

const Electrophys = (props) => {
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;
  const dispatch = useDispatch();
  const electrophysValues = useSelector(
    (state) => state.reportReducer.electrophys
  );
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);
  const initialValues = {
    auditoryBrainstemResponse: {
      right: {
        absoluteLatency:
          electrophysValues.auditoryBrainstemResponse.right.absoluteLatency,
        interWaveLatency:
          electrophysValues.auditoryBrainstemResponse.right.interWaveLatency,
        morphology:
          electrophysValues.auditoryBrainstemResponse.right.morphology,
      },
      left: {
        absoluteLatency:
          electrophysValues.auditoryBrainstemResponse.left.absoluteLatency,
        interWaveLatency:
          electrophysValues.auditoryBrainstemResponse.left.interWaveLatency,
        morphology: electrophysValues.auditoryBrainstemResponse.left.morphology,
      },
      notes: electrophysValues.auditoryBrainstemResponse.notes
        ? electrophysValues.auditoryBrainstemResponse.notes
        : "",
    },
    electroCochleoGraphy: {
      right: {
        normality: electrophysValues.electroCochleoGraphy.right.normality,
        ratio: electrophysValues.electroCochleoGraphy.right.ratio,
      },
      left: {
        normality: electrophysValues.electroCochleoGraphy.left.normality,
        ratio: electrophysValues.electroCochleoGraphy.left.ratio,
      },
      notes: electrophysValues.electroCochleoGraphy.notes
        ? electrophysValues.electroCochleoGraphy.notes
        : "",
    },
    cervicalVestibularEvokedMyogenicPotential: {
      right: {
        normality:
          electrophysValues.cervicalVestibularEvokedMyogenicPotential.right
            .normality,
        precense:
          electrophysValues.cervicalVestibularEvokedMyogenicPotential.right
            .precense,
        threshold:
          electrophysValues.cervicalVestibularEvokedMyogenicPotential.right
            .threshold,
        trend:
          electrophysValues.cervicalVestibularEvokedMyogenicPotential.right
            .trend,
      },
      left: {
        normality:
          electrophysValues.cervicalVestibularEvokedMyogenicPotential.left
            .normality,
        precense:
          electrophysValues.cervicalVestibularEvokedMyogenicPotential.left
            .precense,
        threshold:
          electrophysValues.cervicalVestibularEvokedMyogenicPotential.left
            .threshold,
        trend:
          electrophysValues.cervicalVestibularEvokedMyogenicPotential.left
            .trend,
      },
      notes: electrophysValues.cervicalVestibularEvokedMyogenicPotential.notes
        ? electrophysValues.cervicalVestibularEvokedMyogenicPotential.notes
        : "",
    },
    ocularVestibularEvokedMyogenicPotential: {
      right: {
        negPositive:
          electrophysValues.ocularVestibularEvokedMyogenicPotential.right
            .negPositive,
        presence:
          electrophysValues.ocularVestibularEvokedMyogenicPotential.right
            .presence,
        trend:
          electrophysValues.ocularVestibularEvokedMyogenicPotential.right.trend,
      },
      left: {
        negPositive:
          electrophysValues.ocularVestibularEvokedMyogenicPotential.left
            .negPositive,
        presence:
          electrophysValues.ocularVestibularEvokedMyogenicPotential.left
            .presence,
        trend:
          electrophysValues.ocularVestibularEvokedMyogenicPotential.left.trend,
      },
      notes: electrophysValues.ocularVestibularEvokedMyogenicPotential.notes
        ? electrophysValues.ocularVestibularEvokedMyogenicPotential.notes
        : "",
    },
  };

  const handleSave = (values) => {
    dispatch(
      electrophysReport({
        reportId: id,
        ...values,
      })
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(
        getElectrophys({
          reportId: id,
        })
      );
    }
  }, [dispatch, id]);

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

export default Electrophys;
