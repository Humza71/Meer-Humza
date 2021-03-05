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
} from "../../redux/reducers/reportReducer";

const initialValues = {
  hpi: {
    firstNotedProblem: new Date(),
    mostRecentEpisode: new Date(),
    symptoms: "",
    symptomDuration: "",
    symptomDurationUnit: "",
    provokesWith: "",
    notes: "",
  },
  auralSymptom: {
    shl: "",
    ap: "",
    otorrhea: "",
    tinnitus: "",
    otalgia: "",
  },
  healthCondition: {
    conditions: [],
    Migraine: "",
    OrthopedicLimitations: "",
    ConcussionHeadInjury: "",
    CVATIA: "",
    RecentHeadImaging: "",
    Other: "",
  },
};

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  const { setFieldValue, isSubmitting, values } = props;

  const labels = [
    "History of Present Illness (HPI)",
    "AURAL SYMPTOMS",
    "Other health conditions",
  ];

  return isSubmitting ? (
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
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;
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
  }, []);
  const handleSubmit = async (values) => {};

  return (
    <Fragment>
      <Formik
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

export default History;
