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
//   gsoTest: {
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
//     soTest: {
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
    gsoTest: {
      condition1: posturalValues.gsoTest.condition1,
      condition2: posturalValues.gsoTest.condition2,
      condition3: posturalValues.gsoTest.condition3,
      condition4: posturalValues.gsoTest.condition4,
      condition5: posturalValues.gsoTest.condition5,
      condition6: posturalValues.gsoTest.condition6,
      steppingFakuda: posturalValues.gsoTest.steppingFakuda,
      notes: posturalValues.gsoTest.notes ? posturalValues.gsoTest.notes : "",
    },
    cdpTest: {
      soTest: {
        condition1: posturalValues.cdpTest.soTest.condition1,
        condition2: posturalValues.cdpTest.soTest.condition2,
        condition3: posturalValues.cdpTest.soTest.condition3,
        condition4: posturalValues.cdpTest.soTest.condition4,
        condition5: posturalValues.cdpTest.soTest.condition5,
        condition6: posturalValues.cdpTest.soTest.condition6,
      },
      mcTest: {
        bt: posturalValues.cdpTest.mcTest.bt,
        ft: posturalValues.cdpTest.mcTest.ft,
      },
      adTest: {
        tu: posturalValues.cdpTest.adTest.tu,
        td: posturalValues.cdpTest.adTest.td,
      },
      notes: posturalValues.cdpTest.notes ? posturalValues.cdpTest.notes : "",
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
