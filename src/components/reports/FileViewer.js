import FileViewer from "react-file-viewer";

const Viewer = ({ file, type }) => {
  return <FileViewer fileType={type} filePath={file} />;
};

export default Viewer;
