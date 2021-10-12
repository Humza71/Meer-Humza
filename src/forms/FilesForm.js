import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";

import { Alert as MuiAlert } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import { Box, CircularProgress } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import Viewer from "components/reports/FileViewer";

import CreateReportFooter from "components/CreateReportFooter";
import { setStepNewReport } from "redux/reducers/uiReducer";
import ReportCard from "components/reports/ReportCard";
import FileChip from "components/reports/FileChip";
import Modal from "components/Modal";
import { useHistory } from "react-router";
import {
  getFiles,
  filesReport,
  removeFile,
} from "redux/reducers/reportReducer";

const Alert = styled(MuiAlert)(spacing);

const FileIcon = styled.img`
  width: 76px;
  height: 55px;
`;

const SectionHeading = styled.p`
  font-size: 10px;
  font-weight: 600px;
  margin: 24px 0 5px 0;
  color: #09539e;
`;

const DropZoneWrapper = styled.div`
  .dropZoneWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .MuiDropzoneArea-textContainer {
    text-align: center;
    flex-direction: column-reverse;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .MuiDropzoneArea-textContainer p {
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
    line-height: 25.55px;
  }
`;

const MainWrapper = styled.div``;

const ImageWrapper = styled.div`
  height: 400px;
`;
const validationSchema = Yup.object().shape({
  files: Yup.array(),
});

const InnerForm = (props) => {
  const [preview, setPreview] = useState(false);
  const [currentFile, setCurrentFile] = useState({});
  const [type, setType] = useState("");
  const {
    errors,
    handleBlur,
    setFieldValue,
    isSubmitting,
    touched,
    values,
    status,
  } = props;
  const dispatch = useDispatch();
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;
  const reportFiles = useSelector((state) => state.reportReducer.files);

  const { files = [] } = values;
  const hasFiles = reportFiles.length > 0;

  const onDeleteSuccess = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFieldValue("files", newFiles);
  };

  const handleDelete = (index) => {
    const { id: fileId = "" } = files[index] || [];
    if (fileId.length !== 0) {
      dispatch(removeFile(id, fileId, index, onDeleteSuccess));
    } else {
      onDeleteSuccess(index);
    }
  };
  return (
    <ReportCard
      title="Upload your files"
      cardsize={{
        width: "672px",
      }}
    >
      {status && status.sent && (
        <Alert severity="success" my={3}>
          Your data has been submitted successfully!
        </Alert>
      )}

      {isSubmitting ? (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress />
        </Box>
      ) : (
        <DropZoneWrapper>
          <DropzoneArea
            clearOnUnmount
            showPreviews={false}
            showPreviewsInDropzone={false}
            dropzoneText="Drop files here or browse"
            dropzoneClass="dropZoneWrapper"
            showFileNamesInPreview={true}
            showFileNames={true}
            value={files}
            maxFiles={10}
            Icon={() => <FileIcon src={"/static/img/fileIcon.png"} />}
            onChange={(value) => {
              if (value.length > 0) {
                // const removeDuplicates = value.map(
                //   (item) => !files.some((myFile) => item.name !== myFile.name)
                // );
                const removeDuplicates = [
                  ...new Map(
                    [...value, ...files].map((item) => [item["name"], item])
                  ).values(),
                ];
                // const duplicates = [
                //   ...new Map(
                //     [...values, ...files].map((item) => [item["name"], item])
                //   ).values(),
                // ];

                // const duplicates = [
                //   ...new Map(
                //     [...files].map((item) => [item["name"], item])
                //   ).values(),
                // ];

                // const duplicates = [
                //   ...new Map(
                //     [...files, ...value].map((item) => [item["name"], item])
                //   ).values(),
                // ];

                // const moreDuplicates = [
                //   ...new Map(
                //     [...values, ...files].map((item) => [item["value"], item])
                //   ).value(),
                // ];
                // const reducerFunction = (acc, item) => acc * item;
                // const sum = value.reduce((acc, item) => acc + item, 0);
                // const factorial = value.reduce(reducerFunction, 1);

                setFieldValue("files", removeDuplicates);
              }
              // if (value.length > 0) {
              //   setFieldValue("files", [value[0], ...files]);
              // }
            }}
            error={Boolean(touched.files && errors.files)}
            helperText={touched.files && errors.files}
            onBlur={handleBlur}
          />
          {hasFiles && (
            <div>
              <SectionHeading>UPLOADED FILES</SectionHeading>
              {files.map((item, i) => (
                <FileChip
                  item={item}
                  key={i}
                  name={item.name}
                  handlePreview={() => {
                    const arr = files[i].filePath.split(".");
                    const length = arr.length;
                    const type = arr[length - 1];
                    setType(type);
                    setCurrentFile(files[i]);
                    setPreview(true);
                  }}
                  handleDelete={() => handleDelete(i)}
                />
              ))}
            </div>
          )}
        </DropZoneWrapper>
      )}
      <Modal
        title={currentFile["name"]}
        open={preview}
        handleClose={() => setPreview(false)}
        width="55%"
        height="500px"
      >
        <ImageWrapper>
          <Viewer file={currentFile.filePath} type={type} />
        </ImageWrapper>
      </Modal>
    </ReportCard>
  );
};

const FilesForm = (props) => {
  const files = useSelector((state) => state.reportReducer.files);
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);
  const history = useHistory();
  const { match = {} } = props || {};
  const { params = {} } = match;
  const { id } = params;
  const dispatch = useDispatch();

  const initialValues = {
    files: files ? files : [],
  };

  const handleSave = (values) => {
    const moreImages = values.files.filter((item) => item.type && item);
    dispatch(filesReport(moreImages, id));
  };
  useEffect(() => {
    if (id) {
      history.push(`/report/create/${id}/${stepNewReport}`);
    }
  }, [id, stepNewReport, history]);

  const handleSubmit = async (values) => {
    try {
      handleSave(values);
      dispatch(setStepNewReport(stepNewReport + 1));
    } catch (error) {}
  };

  React.useEffect(() => {
    if (id) {
      dispatch(getFiles(id));
    }
  }, [id, dispatch]);

  return (
    <React.Fragment>
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
          <MainWrapper>
            <Form>
              <InnerForm {...formProps} {...props} />
              <CreateReportFooter
                {...formProps}
                handleSave={() => handleSave(formProps.values)}
              />
            </Form>
          </MainWrapper>
        )}
      </Formik>
    </React.Fragment>
  );
};
export default FilesForm;
