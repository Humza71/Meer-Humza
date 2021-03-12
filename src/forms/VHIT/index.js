import React, { Fragment, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import CreateReportFooter from "components/CreateReportFooter";
import { useDispatch, useSelector } from "react-redux";
import VhitForm from "./VhitForm";
import { vHitReport, getVHit } from "redux/reducers/reportReducer";
import { setStepNewReport } from "redux/reducers/uiReducer";

const validationSchema = Yup.object().shape({});

const VHIT = (props) => {
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;
  const dispatch = useDispatch();
  const vHitValues = useSelector((state) => state.reportReducer.vHit);
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);

  const initialValues = {
    lateral: {
      normality: vHitValues.lateral.normality || "",
      saccades: vHitValues.lateral.saccades || "",
      reduceGain: vHitValues.lateral.reduceGain || "",
    },
    ralp: {
      normality: vHitValues.ralp.normality || "",
      saccades: vHitValues.ralp.saccades || "",
      reduceGain: vHitValues.ralp.reduceGain || "",
    },
    larp: {
      normality: vHitValues.larp.normality || "",
      saccades: vHitValues.larp.saccades || "",
      reduceGain: vHitValues.larp.reduceGain || "",
    },
    notes: vHitValues.notes || "",
  };
  const handleSave = (values) => {
    dispatch(
      vHitReport({
        reportId: id,
        ...values,
      })
    );
  };
  useEffect(() => {
    if (id) {
      dispatch(
        getVHit({
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
            <VhitForm {...formProps} />
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

export default VHIT;
