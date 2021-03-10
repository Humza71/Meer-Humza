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

const validationSchema = Yup.object().shape({});

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
          <TabWrapper>
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
  const initialValues = {
    hpi: {
      symptomDurationRoomSpin:
        historyValues.hpi["symptomDurationRoomSpin"] || "",
      symptomDurationPatientSpin:
        historyValues.hpi["symptomDurationPatientSpin"] || "",
      symptomDurationImbalance:
        historyValues.hpi["symptomDurationImbalance"] || "",
      symptomDurationLightHeaded:
        historyValues.hpi["symptomDurationLightHeaded"] || "",
      symptomDurationOther: historyValues.hpi["symptomDurationOther"] || "",

      symptomDurationUnitRoomSpin:
        historyValues.hpi["symptomDurationUnitRoomSpin"] || "",
      symptomDurationUnitPatientSpin:
        historyValues.hpi["symptomDurationUnitPatientSpin"] || "",
      symptomDurationUnitImbalance:
        historyValues.hpi["symptomDurationUnitImbalance"] || "",
      symptomDurationUnitLightHeaded:
        historyValues.hpi["symptomDurationUnitLightHeaded"] || "",
      symptomDurationUnitOther: historyValues.hpi["symptomDuratiOnother"] || "",

      provokesWithRoomSpin: historyValues.hpi["provokesWithRoomSpin"] || "",
      provokesWithPatientSpin:
        historyValues.hpi["provokesWithPatientSpin"] || "",
      provokesWithImbalance: historyValues.hpi["provokesWithImbalance"] || "",
      provokesWithLightHeaded:
        historyValues.hpi["provokesWithLightHeaded"] || "",
      provokesWithOther: historyValues.hpi["symptomDurationOther"] || "",

      firstNotedProblem: historyValues.hpi.firstNotedProblem
        ? new Date(historyValues.hpi.firstNotedProblem)
        : new Date(),
      mostRecentEpisode: historyValues.hpi.mostRecentEpisode
        ? new Date(historyValues.hpi.mostRecentEpisode)
        : new Date(),
      symptoms: historyValues.hpi.symptoms || [],
      symptomDuration: historyValues.hpi.symptomDuration,
      symptomDurationUnit: historyValues.hpi.symptomDurationUnit,
      provokesWith: historyValues.hpi.provokesWith,
      notes: historyValues.hpi.notes ? historyValues.hpi.notes : "",
    },
    auralSymptom: {
      shl: historyValues.auralSymptom.shl,
      ap: historyValues.auralSymptom.ap,
      otorrhea: historyValues.auralSymptom.otorrhea,
      tinnitus: historyValues.auralSymptom.tinnitus,
      otalgia: historyValues.auralSymptom.otalgia,
    },
    healthCondition: {
      conditions: historyValues.healthCondition.conditions || [],
      Migraine: historyValues.healthCondition.Migraine
        ? historyValues.healthCondition.Migraine
        : "",
      OrthopedicLimitations: historyValues.healthCondition.OrthopedicLimitations
        ? historyValues.healthCondition.OrthopedicLimitations
        : "",
      ConcussionHeadInjury: historyValues.healthCondition.ConcussionHeadInjury
        ? historyValues.healthCondition.ConcussionHeadInjury
        : "",
      CVATIA: historyValues.healthCondition.CVATIA
        ? historyValues.healthCondition.CVATIA
        : "",
      RecentHeadImaging: historyValues.healthCondition.RecentHeadImaging
        ? historyValues.healthCondition.RecentHeadImaging
        : "",
      Other: historyValues.healthCondition.Other
        ? historyValues.healthCondition.Other
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
  const handleSubmit = async (values) => {};
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

export default History;
