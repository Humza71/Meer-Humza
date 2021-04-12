import React, { Fragment, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import CreateReportFooter from "components/CreateReportFooter";
import ReportCard from "components/reports/ReportCard";
import { Typography, Divider, Box, CircularProgress } from "@material-ui/core";
import Toggle from "components/reports/Toggle";
import AdvancedSelect from "components/AdvancedSelect";
import styled from "styled-components/macro";
import { useSelector, useDispatch } from "react-redux";
import {
  LoadingStates,
  getImpressionPlan,
  impressionPlanReport,
  allMacros,
  // macrosByName,
  // updateMacros,
} from "../../redux/reducers/reportReducer";
// import { setStepNewReport } from "redux/reducers/uiReducer";
import CKEditor from "ckeditor4-react";
import { config } from "../../constants";
// import props from "theme/props";

const EditorWrapper = styled.div`
  .ck-editor__editable {
    min-height: 300px;
  }
`;

const Lable = styled(Typography)`
  color: #09539e;
`;

const OptionWrapper = styled.div`
  width: 25%;
`;

// const initialValues = {
//   normality: "",
// };

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  // const dispatch = useDispatch();
  const { setFieldValue, values } = props;
  const reportLoading = useSelector((state) => state.reportReducer.loading);
  const macrosValues = useSelector((state) => state.reportReducer.macros) || [];

  return reportLoading === LoadingStates.REPORT_CREATION_LOADING ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
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
            value={values["impressionAndPlan"]["overAllImpression"]}
            onChange={(value) =>
              setFieldValue(`impressionAndPlan.overAllImpression`, value)
            }
            options={[
              { title: "Normal", value: "normal" },
              { title: "Abnormal", value: "abnormal" },
            ]}
          />
        </OptionWrapper>
        <Divider />
        <Box mt={2}>
          {console.log(
            "22222222222",
            values.impressionAndPlan.selectedMacroNames
          )}
          <AdvancedSelect
            multiple
            value={values.impressionAndPlan.selectedMacroNames}
            onChange={(e) => {
              setFieldValue(
                "impressionAndPlan.selectedMacroNames",
                e.target.value
              );
              setFieldValue(
                "impressionAndPlan.macro",
                e.target.value.map((item) => {
                  const itemName = item.split("-")[0];
                  const macroIndex = values.impressionAndPlan.macro.findIndex(
                    ({ name }) => name === itemName
                  );
                  if (macroIndex === -1) {
                    return {
                      name: itemName,
                      value: item.split("-")[1],
                    };
                  }
                  return {
                    name: itemName,
                    value: values.impressionAndPlan.macro[macroIndex].value,
                  };
                })
              );
            }}
            label={"Enter your desired shortcut to activate a macro."}
            name="macro"
            variant="outlined"
            options={macrosValues.map((item) => {
              // const descriptionText = item.value.replace(/<[^>]*>/g, "");
              const label = `${item.name} - ${item.value}`;
              return {
                label: label,
                value: label,
              };
            })}
            renderValue={(value = "") => (
              <>
                <h4>{value.map((name) => `${name.split("-")[0]},`)}</h4>
              </>
            )}
          />
        </Box>
        {values.impressionAndPlan.macro.map(({ name, value }, index) => (
          <EditorWrapper key={index}>
            <h3>{name}:</h3>
            <CKEditor
              data={value}
              config={config}
              onChange={(evt) => {
                const data = evt.editor.getData();
                const plainText = evt.editor.document.getBody().getText();
                let { impressionAndPlan = {} } = values || {};
                let { macro = [] } = impressionAndPlan || {};
                let macroIndex = macro.findIndex((item) => item.name === name);
                let newMacro = [...macro];
                if (macroIndex > -1) {
                  newMacro[macroIndex] = { name, value: data, plainText };
                  setFieldValue(`impressionAndPlan.macro`, newMacro);
                } else {
                  newMacro = [...newMacro, { name, value: data, plainText }];
                  setFieldValue(`impressionAndPlan.macro`, newMacro);
                }
              }}
            />
          </EditorWrapper>
        ))}
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
  const impressionValues = useSelector(
    (state) => state.reportReducer.impression
  );

  const selectedMacros = useSelector(
    (state) => state.reportReducer.selectedMacros
  );

  var initialValues = {
    impressionAndPlan: {
      overAllImpression: impressionValues.impressionAndPlan.overAllImpression,
      macro: selectedMacros.length > 0 ? selectedMacros : [],
      selectedMacroNames: [
        ...selectedMacros.map(({ name, value }) => `${name} - ${value}`),
      ],
    },
  };

  const handleSave = (values, generateReport = false) => {
    dispatch(
      impressionPlanReport(
        {
          status: "generated",
          reportId: id,
          ...values,
        },
        generateReport
      )
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(
        getImpressionPlan({
          reportId: id,
        })
      );
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(allMacros());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      props.history.push(`/report/create/${id}/${stepNewReport}`);
    }
  }, [id, stepNewReport, props.history]);

  const handleSubmit = async (e, values) => {
    e.preventDefault();
    try {
      handleSave(values, true);

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
          <form onSubmit={(e) => handleSubmit(e, formProps.values)}>
            <InnerForm
              {...formProps}
              selectedNames={[...selectedMacros].map(({ name }) => name)}
            />
            <CreateReportFooter
              {...formProps}
              isPublish={true}
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
