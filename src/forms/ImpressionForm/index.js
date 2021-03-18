import React, { Fragment, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import CreateReportFooter from "components/CreateReportFooter";
import ReportCard from "components/reports/ReportCard";
import { Typography, Divider, Box, CircularProgress } from "@material-ui/core";
import Toggle from "components/reports/Toggle";
import AdvancedSelect from "components/AdvancedSelect";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import {
  LoadingStates,
  getImpressionPlan,
  impressionPlanReport,
  allMacros,
  macrosByName,
  updateMacros,
} from "../../redux/reducers/reportReducer";
import { setStepNewReport } from "redux/reducers/uiReducer";
import CKEditor from "ckeditor4-react";
import { config } from "../../constants";

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
  const dispatch = useDispatch();
  const { setFieldValue, values, selectedNames } = props;
  const reportLoading = useSelector((state) => state.reportReducer.loading);
  const macrosValues = useSelector((state) => state.reportReducer.macros) || [];

  // const impressionValues = useSelector(
  //   (state) => state.reportReducer.impression
  // );
  // const macrosForForm = useSelector(
  //   (state) => state.reportReducer.macrosForForm
  // );
  // const selectedMacros = useSelector(
  //   (state) => state.reportReducer.selectedMacros
  // );
  // const [macroNames, setMacroNames] = useState([]);

  // useEffect(() => {
  //   const namesData = macrosForForm.flat().map(({ name }) => name);
  //   debugger;
  //   setMacroNames(namesData);
  // }, [macrosForForm]);

  // useEffect(() => {
  //   if (Array.isArray(macroNames)) {
  //     macroNames.map(
  //       (item) =>
  //         !values.impressionAndPlan.macro.some(({ name }) => item === name) &&
  //         dispatch(
  //           macrosByName({
  //             name: item,
  //           })
  //         )
  //     );
  //   }
  // }, [macroNames]);

  // useEffect(() => {
  //   debugger;
  //   setMacroNames(
  //     selectedNames.filter((name) =>
  //       macroNames.length === 0
  //         ? true
  //         : macroNames.some((item) => item === name)
  //     )
  //   );
  // }, [selectedNames]);

  const handleonMacroChange = (data) => {
    // data.map((item) => {
    //   const macroIndex = values.impressionAndPlan.macro.findIndex(
    //     ({ name }) => item !== name
    //   );

    if (data.length > values.impressionAndPlan.macro.length) {
      const name = data[data.length - 1];
      // const name = data.find(({ name }) =>
      //   values.impressionAndPlan.macro.some((item) => item.name === name)
      // );

      dispatch(
        macrosByName({
          name,
          overAllImpression: values.impressionAndPlan.overAllImpression,
          // names: data,
        })
      );
    } else {
      let macroIndex = -1;
      data.map((item) => {
        macroIndex = values.impressionAndPlan.macro.findIndex(
          ({ name }) => item !== name
        );
      });
      dispatch(
        updateMacros({
          macroIndex,
          overAllImpression: values.impressionAndPlan.overAllImpression,
        })
      );
      // const name = values.impressionAndPlan.macro.find(
      //   ({ name }) => !data.some((item) => item === name)
      // ).name;
    }

    // setFieldValue(`impressionAndPlan.macro`, newMacros);
    // debugger;
    // {
    //   values.impressionAndPlan.macro
    //     .filter((item) => person.age < 60)
    //     .map((filteredPerson) => <li>{filteredPerson.name}</li>);
    // }
  };

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
          <AdvancedSelect
            multiple
            value={selectedNames}
            onChange={(e) => {
              handleonMacroChange(e.target.value);
            }}
            label={"Enter your desired shortcut to activate a macro."}
            name="macro"
            variant="outlined"
            options={macrosValues.map((item, index) => ({
              label: item,
              value: item,
            }))}
            renderValue={() => "Macros"}
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
  // const macrosValues = useSelector((state) => state.reportReducer.macros);

  var initialValues = {
    impressionAndPlan: {
      overAllImpression: impressionValues.impressionAndPlan.overAllImpression,
      macro: selectedMacros.length > 0 ? selectedMacros : [],
    },
  };

  // useEffect(() => {
  //   initialValues.impressionAndPlan.macro = selectedMacros;
  //   debugger;
  // }, [selectedMacros]);

  // useEffect(() => {
  //   initialValues.impressionAndPlan.macro =
  //     impressionValues.impressionAndPlan.macro;
  //   debugger;
  // }, [impressionValues]);

  const handleSave = (values) => {
    dispatch(
      impressionPlanReport({
        status: "draft",
        reportId: id,
        ...values,
      })
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

  const handleSubmit = async (values) => {
    try {
      handleSave(values);
      dispatch(setStepNewReport(stepNewReport));
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
