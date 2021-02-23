import React, { Fragment } from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import CreateReportFooter from "components/CreateReportFooter";
import ReportCard from "components/reports/ReportCard";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import FullEditor from "ckeditor5-build-full";
import styled from "styled-components/macro";

const EditorWrapper = styled.div`
  .ck-editor__editable {
    min-height: 300px;
  }
`;

const initialValues = {
  comments: "",
};

const validationSchema = Yup.object().shape({});

const InnerForm = (props) => {
  return (
    <>
      <ReportCard title={"Additional Tests & Comments"}>
        <EditorWrapper>
          <CKEditor
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
              console.log(data);
            }}
          />
        </EditorWrapper>
      </ReportCard>
    </>
  );
};

const CommentsForm = () => {
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

export default CommentsForm;
