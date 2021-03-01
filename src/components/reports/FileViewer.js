import FileViewer from "react-file-viewer";

const Viewer = ({ file, type }) => {
  const getBase64 = () => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  return <FileViewer fileType={type} filePath={getBase64(file)} />;
};

export default Viewer;
