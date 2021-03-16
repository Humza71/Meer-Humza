import React, { Fragment, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import { Box, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import HPI from "./HPI";
import AuralSymptom from "./AuralSymptom";
import HealthConditionForm from "./HealthConditionForm";
import CreateReportFooter from "components/CreateReportFooter";
import Tabs from "components/Tabs";
import FlexBox from "components/FlexBox";
import { TabWrapper } from "components/Tabs";
import {
  historyReport,
  getHistoryReport,
  LoadingStates,
} from "../../redux/reducers/reportReducer";
import { setStepNewReport } from "redux/reducers/uiReducer";

const validationSchema = Yup.object().shape({
  history: Yup.object(),
});

const InnerForm = (props) => {
  const { setFieldValue, isSubmitting, values } = props;
  const reportLoading = useSelector((state) => state.reportReducer.loading);

  const labels = [
    "History of Present Illness (HPI)",
    "AURAL SYMPTOMS",
    "Other health conditions",
  ];

  return isSubmitting ||
    reportLoading === LoadingStates.REPORT_CREATION_LOADING ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
    <div id="historyTab">
      <FlexBox>
        <Tabs rootEl="#historyTab" labels={labels}>
          <TabWrapper style={{ scrollBehavior: "smooth" }}>
            <section id="History of Present Illness (HPI)">
              <HPI
                values={values}
                setFieldValue={setFieldValue}
                isSubmitting={isSubmitting}
              />
            </section>
            <section id="AURAL SYMPTOMS">
              <AuralSymptom
                values={values}
                setFieldValue={setFieldValue}
                isSubmitting={isSubmitting}
              />
            </section>
            <section id="Other health conditions">
              <HealthConditionForm
                values={values}
                setFieldValue={setFieldValue}
                isSubmitting={isSubmitting}
              />
            </section>
          </TabWrapper>
        </Tabs>
      </FlexBox>
    </div>
  );
};

const History = (props) => {
  const historyValues =
    useSelector((state) => state.reportReducer.history) || {};
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);
  const initialValues = {
    presentIllness: {
      symptomDurationRoomSpin:
        historyValues.presentIllness["symptomDurationRoomSpin"] || "",
      symptomDurationPatientSpin:
        historyValues.presentIllness["symptomDurationPatientSpin"] || "",
      symptomDurationImbalance:
        historyValues.presentIllness["symptomDurationImbalance"] || "",
      symptomDurationLightHeaded:
        historyValues.presentIllness["symptomDurationLightHeaded"] || "",
      symptomDurationOther:
        historyValues.presentIllness["symptomDurationOther"] || "",

      symptomDurationUnitRoomSpin:
        historyValues.presentIllness["symptomDurationUnitRoomSpin"] || "",
      symptomDurationUnitPatientSpin:
        historyValues.presentIllness["symptomDurationUnitPatientSpin"] || "",
      symptomDurationUnitImbalance:
        historyValues.presentIllness["symptomDurationUnitImbalance"] || "",
      symptomDurationUnitLightHeaded:
        historyValues.presentIllness["symptomDurationUnitLightHeaded"] || "",
      symptomDurationUnitOther:
        historyValues.presentIllness["symptomDurationOther"] || "",

      provokesWithRoomSpin:
        historyValues.presentIllness["provokesWithRoomSpin"] || "",
      provokesWithPatientSpin:
        historyValues.presentIllness["provokesWithPatientSpin"] || "",
      provokesWithImbalance:
        historyValues.presentIllness["provokesWithImbalance"] || "",
      provokesWithLightHeaded:
        historyValues.presentIllness["provokesWithLightHeaded"] || "",
      provokesWithOther:
        historyValues.presentIllness["provokesWithOther"] || "",

      firstNotedProblem: historyValues.presentIllness.firstNotedProblem
        ? new Date(historyValues.presentIllness.firstNotedProblem)
        : new Date(),
      mostRecentEpisode: historyValues.presentIllness.mostRecentEpisode
        ? new Date(historyValues.presentIllness.mostRecentEpisode)
        : new Date(),
      symptoms: historyValues.presentIllness.symptoms || [],
      symptomDuration: historyValues.presentIllness.symptomDuration,
      symptomDurationUnit: historyValues.presentIllness.symptomDurationUnit,
      provokesWith: historyValues.presentIllness.provokesWith,
      notes: historyValues.presentIllness.notes
        ? historyValues.presentIllness.notes
        : "",
    },
    auralSymptom: {
      suddenHearingLoss: historyValues.auralSymptom.suddenHearingLoss,
      auralPressure: historyValues.auralSymptom.auralPressure,
      otorrhea: historyValues.auralSymptom.otorrhea,
      tinnitus: historyValues.auralSymptom.tinnitus,
      otalgia: historyValues.auralSymptom.otalgia,
    },
    healthCondition: {
      conditions: historyValues.healthCondition.conditions || [],
      migraine: historyValues.healthCondition.migraine
        ? historyValues.healthCondition.migraine
        : "",
      orthopedicLimitations: historyValues.healthCondition.orthopedicLimitations
        ? historyValues.healthCondition.orthopedicLimitations
        : "",
      concussionHeadInjury: historyValues.healthCondition.concussionHeadInjury
        ? historyValues.healthCondition.concussionHeadInjury
        : "",
      cbatia: historyValues.healthCondition.cvatia
        ? historyValues.healthCondition.cvatia
        : "",
      recentHeadImaging: historyValues.healthCondition.recentHeadImaging
        ? historyValues.healthCondition.recentHeadImaging
        : "",
      other: historyValues.healthCondition.other
        ? historyValues.healthCondition.other
        : "",
    },
  };

  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id = "" } = params;
  const dispatch = useDispatch();
  const handleSave = (values) => {
    dispatch(
      historyReport({
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
        getHistoryReport({
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

  // const handleSubmit = async () => {
  //   dispatch(setStepNewReport(stepNewReport + 1));
  // };

  return (
    <Fragment>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={(values) => {
          console.log(values, "my values");
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

export default History;
