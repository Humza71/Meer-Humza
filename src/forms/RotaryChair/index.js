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
  right: "",
  left: "",
  notes: "",
};

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  const { setFieldValue, isSubmitting, values } = props;

  return isSubmitting ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <ReportCard cardsize={{ width: "680px" }} title="Rotary Chair">
        <Section size={{ width: "183px" }}>
          <span>Right</span>
          <Toggle
            name={`right`}
            value={values["right"]}
            onChange={(value) => setFieldValue(`right`, value)}
            options={[
              { title: "Normal", value: "normal" },
              { title: "Abnormal", value: "abnormal" },
            ]}
          />
        </Section>
        <Divider />
        <Box mt={5}>
          <Section size={{ width: "88%" }}>
            <span>Left</span>
            <Toggle
              name={`left`}
              value={values["left"]}
              onChange={(value) => setFieldValue(`left`, value)}
              options={[
                { title: "Normal", value: "normal" },
                { title: "Abnormal", value: "abnormal" },
              ]}
            />
            <Toggle
              togglesize={{
                width: "144px",
                height: "38px",
              }}
              name={`left`}
              value={values["left"]}
              onChange={(value) => setFieldValue(`left`, value)}
              options={[
                { title: "High Gain", value: "highGain" },
                { title: "Reduced Gain", value: "rg" },
              ]}
            />
            <Toggle
              togglesize={{
                width: "210px",
                height: "38px",
              }}
              name={`left`}
              value={values["left"]}
              onChange={(value) => setFieldValue(`left`, value)}
              options={[
                { title: "Short Time Constants", value: "stp" },
                { title: "Long Time Constants", value: "ltc" },
              ]}
            />
          </Section>
        </Box>
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

const RotaryChair = () => {
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

export default RotaryChair;
