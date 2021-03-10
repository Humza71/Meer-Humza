import React, { Fragment, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import {
  electrophysReport,
  getElectrophys,
  LoadingStates,
} from "../../redux/reducers/reportReducer";
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

  const initialValues = {
    abr: {
      right: {
        absoluteLatency: electrophysValues.abr.right.absoluteLatency,
        interWaveLatency: electrophysValues.abr.right.interWaveLatency,
        morphology: electrophysValues.abr.right.morphology,
      },
      left: {
        absoluteLatency: electrophysValues.abr.left.absoluteLatency,
        interWaveLatency: electrophysValues.abr.left.interWaveLatency,
        morphology: electrophysValues.abr.left.morphology,
      },
      notes: electrophysValues.abr.notes ? electrophysValues.abr.notes : "",
    },
    eco: {
      right: {
        normality: electrophysValues.eco.right.normality,
        ratio: electrophysValues.eco.right.ratio,
      },
      left: {
        normality: electrophysValues.eco.left.normality,
        ratio: electrophysValues.eco.left.ratio,
      },
      notes: electrophysValues.eco.notes ? electrophysValues.eco.notes : "",
    },
    cvemp: {
      right: {
        normality: electrophysValues.cvemp.right.normality,
        precense: electrophysValues.cvemp.right.precense,
        threshold: electrophysValues.cvemp.right.threshold,
        trend: electrophysValues.cvemp.right.trend,
      },
      left: {
        normality: electrophysValues.cvemp.left.normality,
        precense: electrophysValues.cvemp.left.precense,
        threshold: electrophysValues.cvemp.left.threshold,
        trend: electrophysValues.cvemp.left.trend,
      },
      notes: electrophysValues.cvemp.notes ? electrophysValues.cvemp.notes : "",
    },
    ovemp: {
      right: {
        negPositive: electrophysValues.ovemp.right.negPositive,
        presence: electrophysValues.ovemp.right.presence,
        trend: electrophysValues.ovemp.right.trend,
      },
      left: {
        negPositive: electrophysValues.ovemp.left.negPositive,
        presence: electrophysValues.ovemp.left.presence,
        trend: electrophysValues.ovemp.left.trend,
      },
      notes: electrophysValues.ovemp.notes ? electrophysValues.ovemp.notes : "",
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

export default Electrophys;
