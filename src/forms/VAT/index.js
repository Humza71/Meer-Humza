import React, { Fragment } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import { Box, CircularProgress } from "@material-ui/core";
import CreateReportFooter from "components/CreateReportFooter";

import ReportCard from "components/reports/ReportCard";
import Toggle from "components/reports/Toggle";
import Divider from "@material-ui/core/Divider";
import TextArea from "components/reports/TextArea";
import Section from "components/reports/Section";

const initialValues = {
  lateral: {
    normality: "",
    gain: "",
    lag: "",
  },
  vertical: {
    normality: "",
    gain: "",
    lag: "",
  },
  notes: "",
};

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  const { setFieldValue, isSubmitting, values } = props;
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

  return isSubmitting ? (
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
          onChange={(e) => setFieldValue(`notes`, e.target.value)}
        />
      </ReportCard>
    </>
  );
};

const VAT = () => {
  const handleSubmit = async () => {};
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
            <CreateReportFooter {...formProps} onSave={() => {}} />
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

export default VAT;
