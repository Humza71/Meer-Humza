import React, { Fragment, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import CreateReportFooter from "components/CreateReportFooter";
import ReportCard from "components/reports/ReportCard";
import { Typography, Divider, Box } from "@material-ui/core";
import Toggle from "components/reports/Toggle";
import AdvancedSelect from "components/AdvancedSelect";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import { setStepNewReport } from "redux/reducers/uiReducer";

const Lable = styled(Typography)`
  color: #09539e;
`;

const OptionWrapper = styled.div`
  width: 25%;
`;

const initialValues = {
  normality: "",
};

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  const { setFieldValue, values } = props;
  return (
    <>
      <ReportCard title={"Impression & plan"}>
        <Lable variant="overline" display="block" gutterBottom>
          OVERALL IMPRESSION
        </Lable>
        <OptionWrapper>
          <Toggle
            direction={"row"}
            togglesize={{
              width: "105px",
              height: "38px",
            }}
            name={`normality`}
            value={values["normality"]}
            onChange={(value) => setFieldValue(`normality`, value)}
            options={[
              { title: "Normal", value: "normal" },
              { title: "Abnormal", value: "abnormal" },
            ]}
          />
        </OptionWrapper>
        <Divider />
        <Box mt={2}>
          <AdvancedSelect
            label={"Enter your desired shortcut to activate a macro."}
            name="macro"
            variant="outlined"
          />
        </Box>
      </ReportCard>
    </>
  );
};

const ImpressionForm = (props) => {
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;
  const dispatch = useDispatch();
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);

  const handleSave = (values) => {
    // dispatch(
    //   rotaryChairReport({
    //     reportId: id,
    //     ...values,
    //   })
    // );
  };

  useEffect(() => {
    if (id) {
      // dispatch(
      //   getRotaryChair({
      //     reportId: id,
      //   })
      // );
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

export default ImpressionForm;
