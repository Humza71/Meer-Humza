import React from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles";

import Cropper from "react-easy-crop";
import { Box, Grid, Button as MuiButton, Modal } from "@material-ui/core";

const Button = styled(MuiButton)`
  .MuiButton-label {
    color: white;
    background-color: transparent;
  }
`;
const useStyles = makeStyles((theme) => ({
  root: {
    float: "right",
    background: "#09539e",
    "&:hover": {
      backgroundColor: "#09539e",
    },
  },
  outlinedPrimary: {
    color: "white",
  },
  margin: {
    marginTop: "465px",
  },
}));
const CropImage = ({ setFieldValue }) => {
  const classes = useStyles();
  const [image, setImage] = React.useState("");
  const [crop, setCrop] = React.useState({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = React.useState(1);
  const [aspect] = React.useState(4 / 4);
  const [open, setOpen] = React.useState(false);
  const [cropArea, setCropArea] = React.useState({});

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const formImage = (fileName) => {
    const canvas = document.createElement("canvas");
    canvas.width = cropArea.width;
    canvas.height = cropArea.height;
    const imageTag = new Image();
    imageTag.src = image;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imageTag,
      cropArea.x,
      cropArea.y,
      cropArea.width,
      cropArea.height,
      0,
      0,
      cropArea.width,
      cropArea.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          blob.name = fileName;
          resolve(blob);
        },
        "image/jpeg",
        1
      );
    });
  };
  const test = async () => {
    const croppedImg = await formImage("logo");
    let file = new File([croppedImg], "fileName.jpg", { type: "image/jpeg" });
    setFieldValue("logo", file);
    setOpen(false);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCropArea(croppedAreaPixels);
    console.log(croppedArea, croppedAreaPixels);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };
  const handleCloseDialogue = () => {
    setOpen(false);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  return (
    <>
      <Modal open={open} onClose={handleCloseDialogue}>
        <div
          style={{
            width: "50%",
            position: "relative",
            backgroundColor: "black",
            height: "500px",
            marginLeft: "430px",
            marginTop: "100px",
          }}
        >
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
          />

          <Box>
            <Button
              className={[classes.root, classes.margin]}
              color="primary"
              variant="outlined"
              onClick={test}
            >
              Done
            </Button>
          </Box>
        </div>
      </Modal>
      <Grid container spacing={12}>
        Upload Company logo
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            getBase64(file).then((data) => setImage(data));
            setOpen(true);
            // setFieldValue(`logo`, e.target.files[0]);
          }}
        />
      </Grid>
    </>
  );
};

export default CropImage;
