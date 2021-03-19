import React, { Fragment, useEffect } from "react";
import styled from "styled-components/macro";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert as MuiAlert } from "@material-ui/lab";
import { Box, CircularProgress } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { useDispatch, useSelector } from "react-redux";
import GansForm from "./GansForm";
import PostugraphyForm from "./PostugraphyForm";
import CreateReportFooter from "components/CreateReportFooter";
import Tabs from "components/Tabs";
import FlexBox from "components/FlexBox";
import { TabWrapper } from "components/Tabs";
import {
  posturalStabilityReport,
  getPosturalStability,
  LoadingStates,
} from "../../redux/reducers/reportReducer";
import { setStepNewReport } from "redux/reducers/uiReducer";

const Alert = styled(MuiAlert)(spacing);

// const initialValues = {
//   gsPerformanceTest: {
//     condition1: "",
//     condition2: "",
//     condition3: "",
//     condition4: "",
//     condition5: "",
//     condition6: "",
//     steppingFakuda: "",
//     notes: "",
//   },
//   cdpTest: {
//     sensoryOrganizationTest: {
//       condition1: "",
//       condition2: "",
//       condition3: "",
//       condition4: "",
//       condition5: "",
//       condition6: "",
//     },
//     mcTest: {
//       bt: "",
//       ft: "",
//     },
//     adTest: {
//       tu: "",
//       td: "",
//     },
//     notes: "",
//   },
// };

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  const {
    //errors,
    //handleBlur,
    //handleChange,
    setFieldValue,
    isSubmitting,
    //touched,
    values,
    status,
  } = props;
  const reportLoading = useSelector((state) => state.reportReducer.loading);
  const labels = [
    "Gans Sensory Organization Performance Test ©",
    "Computerized Dynamic Posturography",
  ];

  return (
    <>
      {status && status.sent && (
        <Alert severity="success" my={3}>
          Your data has been submitted successfully!
        </Alert>
      )}
      {isSubmitting ||
      reportLoading === LoadingStates.REPORT_CREATION_LOADING ? (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress />
        </Box>
      ) : (
        <FlexBox>
          <Tabs labels={labels}>
            <TabWrapper>
              <section id="Gans Sensory Organization Performance Test ©">
                <GansForm values={values} setFieldValue={setFieldValue} />
              </section>
              <section id="Computerized Dynamic Posturography">
                <PostugraphyForm
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </section>
            </TabWrapper>
          </Tabs>
        </FlexBox>
      )}
    </>
  );
};

const PosturalForm = (props) => {
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;
  const dispatch = useDispatch();
  const posturalValues =
    useSelector((state) => state.reportReducer.posturalStability) || {};
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);

  const initialValues = {
    gsPerformanceTest: {
      condition1: posturalValues.gsPerformanceTest.condition1,
      condition2: posturalValues.gsPerformanceTest.condition2,
      condition3: posturalValues.gsPerformanceTest.condition3,
      condition4: posturalValues.gsPerformanceTest.condition4,
      condition5: posturalValues.gsPerformanceTest.condition5,
      condition6: posturalValues.gsPerformanceTest.condition6,
      steppingFakuda: posturalValues.gsPerformanceTest.steppingFakuda,
      notes: posturalValues.gsPerformanceTest.notes
        ? posturalValues.gsPerformanceTest.notes
        : "",
    },
    computerizedDynamicPosturography: {
      sensoryOrganizationTest: {
        condition1:
          posturalValues.computerizedDynamicPosturography
            .sensoryOrganizationTest.condition1,
        condition2:
          posturalValues.computerizedDynamicPosturography
            .sensoryOrganizationTest.condition2,
        condition3:
          posturalValues.computerizedDynamicPosturography
            .sensoryOrganizationTest.condition3,
        condition4:
          posturalValues.computerizedDynamicPosturography
            .sensoryOrganizationTest.condition4,
        condition5:
          posturalValues.computerizedDynamicPosturography
            .sensoryOrganizationTest.condition5,
        condition6:
          posturalValues.computerizedDynamicPosturography
            .sensoryOrganizationTest.condition6,
      },
      motorControlTest: {
        backwardTranslations:
          posturalValues.computerizedDynamicPosturography.motorControlTest
            .backwardTranslations,
        forwardTranslations:
          posturalValues.computerizedDynamicPosturography.motorControlTest
            .forwardTranslations,
      },
      adaptationTest: {
        toesUp:
          posturalValues.computerizedDynamicPosturography.adaptationTest
            ?.toesUp,
        toesDown:
          posturalValues.computerizedDynamicPosturography.adaptationTest
            ?.toesDown,
      },
      notes: posturalValues.computerizedDynamicPosturography.notes
        ? posturalValues.computerizedDynamicPosturography.notes
        : "",
    },
  };

  const handleSave = (values) => {
    dispatch(
      posturalStabilityReport({
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
        getPosturalStability({
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
  useEffect(() => {
    if (id) {
      props.history.push(`/report/create/${id}/${stepNewReport}`);
    }
  }, [id, stepNewReport, props.history]);

  console.log(posturalValues, "hehehe");
  return (
    <Fragment>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={(values) => {
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

export default PosturalForm;
