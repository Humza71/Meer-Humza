import React from "react";
import styled from "styled-components/macro";

import { useDispatch, useSelector } from "react-redux";
import { setStepNewReport } from "redux/reducers/uiReducer";
import { useHistory } from "react-router";

import {
  Button as MuiButton,
  Box,
  Grid,
  MobileStepper as MuiMobileStepper,
  Typography,
} from "@material-ui/core";
import {
  Close as CloseIcon,
  ChevronRight as ChevronRightIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { spacing } from "@material-ui/system";

const Button = styled(MuiButton)(spacing);
const CircleButton = styled(Button)`
  border: 1px solid gray;
  border-radius: 100%;
  min-width: 35px;
  color: gray;
`;
const MobileStepper = styled(MuiMobileStepper)`
  background: transparent;
  padding: 0;
  margin-top: 5px;
  width: 100%;
  .MuiMobileStepper-progress {
    width: 100%;
  }
`;

const Wrapper = styled(Box)`
  background: white;
`;

const CreateReportFooter = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);
  console.log(props);
  const handleClose = () => {
    console.log("Close");
    history.push("/report");
  };
  const handleBack = () => {
    console.log("BackWard");
    dispatch(setStepNewReport(stepNewReport - 1));
  };
  const handleNext = () => {
    console.log("Forward");
    dispatch(setStepNewReport(stepNewReport + 1));
  };

  return (
    <Wrapper position="absolute" width="100%" bottom={0} p={3}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={2} sm={2} md={1}>
          {stepNewReport === 0 ? (
            <CircleButton aria-label="close" size="small" onClick={handleClose}>
              <CloseIcon />
            </CircleButton>
          ) : (
            <CircleButton aria-label="close" size="small" onClick={handleBack}>
              <ArrowBackIcon />
            </CircleButton>
          )}
        </Grid>
        <Grid item xs={10} sm={10} md={6}>
          <Box display="flex" flexDirection="column">
            <Typography color="primary">
              STEP {stepNewReport + 1} OF 13
            </Typography>
            <MobileStepper
              variant="progress"
              steps={14}
              position="static"
              activeStep={stepNewReport + 1}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" size="medium" color="primary" mr={5}>
              Save as draft
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              endIcon={<ChevronRightIcon />}
              onClick={handleNext}
            >
              Next Page
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default CreateReportFooter;
