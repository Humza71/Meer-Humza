import React, { Fragment, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import { Box, CircularProgress } from "@material-ui/core";
import CreateReportFooter from "components/CreateReportFooter";
import ScreeningTest from "./ScreeningTest";
import { useDispatch, useSelector } from "react-redux";
import {
  screeningsReport,
  LoadingStates,
  getScreenings,
} from "../../redux/reducers/reportReducer";
import { setStepNewReport } from "redux/reducers/uiReducer";

// const initialValues = {
//   vast: {
//     right: {
//       negPositive: "",
//     },
//     left: {
//       negPositive: "",
//     },
//     notes: "",
//   },
//   cervical: {
//     right: {
//       negPositive: "",
//     },
//     left: {
//       negPositive: "",
//     },
//     notes: "",
//   },
//   actuity: {
//     horizontal: {
//       negPositive: "",
//     },
//     vertical: {
//       negPositive: "",
//     },
//   },
//   impulse: {
//     right: {
//       negPositive: "",
//     },
//     left: {
//       negPositive: "",
//     },
//   },
// };

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
  const reportLoading = useSelector((state) => state.reportReducer.loading);
  return reportLoading === LoadingStates.REPORT_CREATION_LOADING ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <ScreeningTest {...props} forms={vastForms} />
      <ScreeningTest {...props} forms={aibForms} />
    </>
  );
};

const AudioMetery = (props) => {
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;
  const dispatch = useDispatch();
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);
  const screeningsValues = useSelector(
    (state) => state.reportReducer.screenings
  );

  const initialValues = {
    vast: {
      right: {
        negPositive: screeningsValues.vast.right.negPositive,
      },
      left: {
        negPositive: screeningsValues.vast.left.negPositive,
      },
      notes: screeningsValues.vast.notes ? screeningsValues.vast.notes : "",
    },
    cervical: {
      right: {
        negPositive: screeningsValues.cervical.right.negPositive,
      },
      left: {
        negPositive: screeningsValues.cervical.left.negPositive,
      },
      notes: screeningsValues.cervical.notes
        ? screeningsValues.cervical.notes
        : "",
    },
    actuity: {
      horizontal: {
        negPositive: screeningsValues.actuity.horizontal.negPositive,
      },
      vertical: {
        negPositive: screeningsValues.actuity.vertical.negPositive,
      },
      notes: screeningsValues.actuity.notes
        ? screeningsValues.actuity.notes
        : "",
    },
    impulse: {
      right: {
        negPositive: screeningsValues.impulse.right.negPositive,
      },
      left: {
        negPositive: screeningsValues.impulse.left.negPositive,
      },
      notes: screeningsValues.impulse.notes
        ? screeningsValues.impulse.notes
        : "",
    },
  };

  const handleSave = (values) => {
    dispatch(
      screeningsReport({
        reportId: id,
        ...values,
      })
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(
        getScreenings({
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
