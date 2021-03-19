import React, { Fragment, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import { Box, CircularProgress } from "@material-ui/core";
import CreateReportFooter from "components/CreateReportFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  vatVorteqReport,
  getVatVorteq,
  LoadingStates,
} from "../../redux/reducers/reportReducer";
import { setStepNewReport } from "redux/reducers/uiReducer";

import ReportCard from "components/reports/ReportCard";
import Toggle from "components/reports/Toggle";
import Divider from "@material-ui/core/Divider";
import TextArea from "components/reports/TextArea";
import Section from "components/reports/Section";

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  const { setFieldValue, isSubmitting, values } = props;
  const reportLoading = useSelector((state) => state.reportReducer.loading);
  const rows = [
    {
      title: "Lateral",
      key: "lateral",
    },
    {
      title: "Vertical",
      key: "vertical",
    },
  ];

  const questions = [
    {
      key: "normality",
      options: [
        {
          title: "Normal",
          value: "normal",
        },
        {
          title: "Abnormal",
          value: "abnormal",
        },
      ],
    },
    {
      key: "gain",
      options: [
        {
          title: "High Gain",
          value: "high",
        },
        {
          title: "Reduce Gain",
          value: "reduce",
        },
      ],
    },
    {
      key: "lag",
      options: [
        {
          title: "Phase Lag",
          value: "phaseLag",
        },
        {
          title: "Asymmetry",
          value: "asymmetry",
        },
      ],
    },
  ];

  return isSubmitting ||
    reportLoading === LoadingStates.REPORT_CREATION_LOADING ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <ReportCard
        cardsize={{ width: "680px" }}
        title="Vestibular Autorotation Test"
      >
        {rows.map(({ title, key }) => (
          <Box mb={5} key={key}>
            <Section size={{ width: "88%" }}>
              <span>{title}</span>
              {questions.map(({ key: fieldKey, options }) => (
                <Toggle
                  key={fieldKey}
                  togglesize={{
                    width: "120px",
                    height: "38px",
                  }}
                  name={`${key}.${fieldKey}`}
                  value={values[key][fieldKey]}
                  onChange={(value) =>
                    setFieldValue(`${key}.${fieldKey}`, value)
                  }
                  options={options}
                />
              ))}
            </Section>
            <Divider />
          </Box>
        ))}
        <TextArea
          rowsMin={3}
          placeholder="Notes"
          value={values["notes"]}
          onChange={(value) => setFieldValue(`notes`, value)}
        />
      </ReportCard>
    </>
  );
};

const VAT = (props) => {
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;
  const dispatch = useDispatch();
  const vatVorteqValues = useSelector((state) => state.reportReducer.vatVorteq);
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);

  const initialValues = {
    lateral: {
      normality: vatVorteqValues.lateral.normality
        ? vatVorteqValues.lateral.normality
        : "",
      gain: vatVorteqValues.lateral.gain ? vatVorteqValues.lateral.gain : "",
      lag: vatVorteqValues.lateral.lag ? vatVorteqValues.lateral.lag : "",
    },
    vertical: {
      normality: vatVorteqValues.vertical.normality,
      gain: vatVorteqValues.vertical.gain,
      lag: vatVorteqValues.vertical.lag,
    },
    notes: vatVorteqValues.notes ? vatVorteqValues.notes : "",
  };

  const handleSave = (values) => {
    dispatch(
      vatVorteqReport({
        reportId: id,
        ...values,
      })
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(
        getVatVorteq({
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

export default VAT;
