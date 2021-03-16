import React, { Fragment, useEffect } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import CreateReportFooter from "components/CreateReportFooter";
import { Box, CircularProgress } from "@material-ui/core";
import ReportCard from "components/reports/ReportCard";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import FullEditor from "ckeditor5-build-full";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import {
  CommentsReport,
  LoadingStates,
  getComments,
} from "../../redux/reducers/reportReducer";
import { setStepNewReport } from "redux/reducers/uiReducer";

const EditorWrapper = styled.div`
  .ck-editor__editable {
    min-height: 300px;
  }
`;

// const initialValues = {
//   comments: "",
// };

const validationSchema = Yup.object().shape({});

const InnerForm = ({ setFieldValue, values }) => {
  const reportLoading = useSelector((state) => state.reportReducer.loading);
  return reportLoading === LoadingStates.REPORT_CREATION_LOADING ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <ReportCard title={"Additional Tests & Comments"}>
        <EditorWrapper>
          <CKEditor
            enableReinitialize
            data={values["comments"]}
            config={{
              toolbar: [
                "bold",
                "italic",
                "indent",
                "underline",
                "fontColor",
                "bulletedList",
                "numberedList",
              ],
            }}
            editor={FullEditor}
            onChange={(evt, editor) => {
              const data = editor.getData();
              setFieldValue(`comments`, data);
            }}
          />
        </EditorWrapper>
      </ReportCard>
    </>
  );
};

const CommentsForm = (props) => {
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;
  const dispatch = useDispatch();
  const commentsValues = useSelector((state) => state.reportReducer.comments);
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);

  const initialValues = {
    comments: commentsValues,
  };

  const handleSave = (values) => {
    dispatch(
      CommentsReport({
        reportId: id,
        ...values,
      })
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(
        getComments({
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

export default CommentsForm;
