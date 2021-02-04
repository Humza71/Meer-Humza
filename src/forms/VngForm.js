import React, { Fragment } from "react";
import styled from "styled-components/macro";

import * as Yup from "yup";
import { Formik } from "formik";

import { Alert as MuiAlert } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {
  Box,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Typography as MuiTypography,
  TextareaAutosize,
  Input,
} from "@material-ui/core";
import {
  ToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@material-ui/lab";

const Card = styled(MuiCard)(spacing);
const Alert = styled(MuiAlert)(spacing);
const Typography = styled(MuiTypography)(spacing);

const OutCard = styled(Card)`
  width: 950px;
  margin: 36px auto;
`;

const ToggleButtonGroup = styled(MuiToggleButtonGroup)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .MuiToggleButton-root {
    border: 1px solid rgba(0, 0, 0, 0.12) !important;
    border-radius: 4px !important;
    width: 85px;
    height: 38px;
    margin-bottom: 9px;
    max-width: 120px;
  }
  .MuiToggleButton-root.Mui-selected {
    border: 1px solid #09539e !important;
    background: #f8fbff !important;
    color: #09539e !important;
  }
`;

const HorizontalToggle = styled(ToggleButtonGroup)`
  flex-direction: row !important;
  .MuiToggleButton-root {
    width: 51px !important;
    height: 38px !important;
    max-width: 120px;
  }
`;

const HallPickToggle = styled(HorizontalToggle)`
  .MuiToggleButton-root {
    width: 90px !important;
    height: 44px !important;
    font-size: 10px !important;
  }
`;

const StyledHeader = styled(TableHead)`
  background: #f8fbff;
`;
const StyledCell = styled(TableCell)`
  color: #09539e;
`;

const StyledBodyCell = styled(TableCell)`
  text-align: center;
  padding: 5px;
  vertical-align: baseline;
`;

const BorderCell = styled(StyledBodyCell)`
  border-right: 1px solid #dadce0;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  padding: 8px 0 0 17px;
  margin: 24px 0px;
  background: #f8f9fa;
  border: 0;
  border-radius: 4px 4px 0px 0px;
`;

const StyledInput = styled(Input)`
  width: 72px;
  height: 38px;
  background: #f8f9fa;
  border-radius: 4px 4px 0px 0px;
  text-align: center;
`;

const initialValues = {
  condition1: "",
  lastName: "",
  birthday: new Date(),
  gender: "",
  encounterDate: new Date(),
  provider: "",
  technician: "",
};

const validationSchema = Yup.object().shape({
  // firstName: Yup.string().required("Required"),
  // lastName: Yup.string().required("Required"),
  // birthday: Yup.date().required("Required"),
  // encounterDate: Yup.date().required("Required"),
  // gender: Yup.string().required("Required"),
  // provider: Yup.number().required("Required"),
  // technician: Yup.number().required("Required"),
});

const InnerForm = (props) => {
  const {
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    isSubmitting,
    touched,
    values,
    status,
  } = props;

  const ConditionOption = ({ fieldkey, children }) => (
    <>
      <ToggleButtonGroup
        exclusive
        name={fieldkey}
        label=""
        value={values[`${fieldkey}`]}
        onBlur={handleBlur}
        onChange={(event, value) => setFieldValue(fieldkey, value)}
        aria-label={fieldkey}
      >
        <ToggleButton value="normal" aria-label="normal">
          Normal
        </ToggleButton>
        <ToggleButton value="sway" aria-label="sway">
          Sway
        </ToggleButton>
        <ToggleButton value="fall" aria-label="fall">
          Fall
        </ToggleButton>
        {children}
      </ToggleButtonGroup>
    </>
  );

  const NormalityOptions = ({ fieldkey, children }) => (
    <>
      <ToggleButtonGroup
        exclusive
        name={fieldkey}
        label=""
        value={values[`${fieldkey}`]}
        onBlur={handleBlur}
        onChange={(event, value) => setFieldValue(fieldkey, value)}
        aria-label={fieldkey}
      >
        <ToggleButton value="normal" aria-label="normal">
          Normal
        </ToggleButton>
        <ToggleButton value="abnormal" aria-label="abnormal">
          Abnormal
        </ToggleButton>
        {children}
      </ToggleButtonGroup>
    </>
  );

  const ConsentOptions = ({ fieldkey, children }) => (
    <>
      <ToggleButtonGroup
        exclusive
        name={fieldkey}
        label=""
        value={values[`${fieldkey}`]}
        onBlur={handleBlur}
        onChange={(event, value) => setFieldValue(fieldkey, value)}
        aria-label={fieldkey}
      >
        <ToggleButton value="normal" aria-label="normal">
          Yes
        </ToggleButton>
        <ToggleButton value="abnormal" aria-label="abnormal">
          No
        </ToggleButton>
        {children}
      </ToggleButtonGroup>
    </>
  );

  const DirectionOptions = ({ fieldkey, children }) => (
    <>
      <HorizontalToggle
        exclusive
        name={fieldkey}
        label=""
        value={values[`${fieldkey}`]}
        onBlur={handleBlur}
        onChange={(event, value) => setFieldValue(fieldkey, value)}
        aria-label={fieldkey}
      >
        <ToggleButton value="normal" aria-label="normal">
          R
        </ToggleButton>
        <ToggleButton value="abnormal" aria-label="abnormal">
          L
        </ToggleButton>
        <ToggleButton value="abnormal" aria-label="abnormal">
          U
        </ToggleButton>
        <ToggleButton value="abnormal" aria-label="abnormal">
          D
        </ToggleButton>
        {children}
      </HorizontalToggle>
    </>
  );

  const RLOptions = ({ fieldkey, children }) => (
    <>
      <ToggleButtonGroup
        exclusive
        name={fieldkey}
        label=""
        value={values[`${fieldkey}`]}
        onBlur={handleBlur}
        onChange={(event, value) => setFieldValue(fieldkey, value)}
        aria-label={fieldkey}
      >
        <ToggleButton value="normal" aria-label="normal">
          Yes
        </ToggleButton>
        <ToggleButton value="abnormal" aria-label="abnormal">
          No
        </ToggleButton>
        {children}
      </ToggleButtonGroup>
    </>
  );

  const CarolicOptions = ({ fieldkey, children }) => (
    <>
      <ToggleButtonGroup
        exclusive
        name={fieldkey}
        label=""
        value={values[`${fieldkey}`]}
        onBlur={handleBlur}
        onChange={(event, value) => setFieldValue(fieldkey, value)}
        aria-label={fieldkey}
      >
        <ToggleButton value="normal" aria-label="normal">
          UW
        </ToggleButton>
        <ToggleButton value="abnormal" aria-label="abnormal">
          DP
        </ToggleButton>
        {children}
      </ToggleButtonGroup>
    </>
  );

  const IndexOptions = ({ fieldkey, children }) => (
    <>
      <ToggleButtonGroup
        exclusive
        name={fieldkey}
        label=""
        value={values[`${fieldkey}`]}
        onBlur={handleBlur}
        onChange={(event, value) => setFieldValue(fieldkey, value)}
        aria-label={fieldkey}
      >
        <ToggleButton value="normal" aria-label="normal">
          Negative
        </ToggleButton>
        <ToggleButton value="abnormal" aria-label="abnormal">
          Positive
        </ToggleButton>
        {children}
      </ToggleButtonGroup>
    </>
  );

  const HallPickOptions = ({ fieldkey, children }) => (
    <>
      <HallPickToggle
        exclusive
        name={fieldkey}
        label=""
        value={values[`${fieldkey}`]}
        onBlur={handleBlur}
        onChange={(event, value) => setFieldValue(fieldkey, value)}
        aria-label={fieldkey}
      >
        <ToggleButton value="normal" aria-label="normal">
          {"Up & Right Torsion"}
        </ToggleButton>
        <ToggleButton value="abnormal" aria-label="abnormal">
          {"Up & Left Torsion"}
        </ToggleButton>
        <ToggleButton value="abnormal" aria-label="abnormal">
          {"Down & Right Torsion"}
        </ToggleButton>
        <ToggleButton value="abnormal" aria-label="abnormal">
          {"Down & Left Torsion"}
        </ToggleButton>
        {children}
      </HallPickToggle>
    </>
  );

  return (
    <>
      <OutCard mb={6}>
        <CardContent>
          <Box my={4}>
            <Typography variant="h4" color="inherit" gutterBottom>
              Oculo-motors
            </Typography>
          </Box>
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
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <StyledHeader>
                    <TableRow>
                      <StyledCell align="center">Saccades</StyledCell>
                      <StyledCell align="center">Vertigo</StyledCell>
                      <StyledCell align="center">Smooth Pursuit</StyledCell>
                      <StyledCell align="center">Optokinetic</StyledCell>
                    </TableRow>
                  </StyledHeader>
                  <TableBody>
                    <TableRow>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TextArea rowsMin={3} placeholder="Notes" />
            </>
          )}
        </CardContent>
      </OutCard>
      <OutCard mb={6}>
        <CardContent>
          <Box my={4}>
            <Typography variant="h4" color="inherit" gutterBottom>
              Gaze-Vision Denied
            </Typography>
          </Box>

          {isSubmitting ? (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <StyledHeader>
                    <TableRow>
                      <StyledCell align="center" />
                      <StyledCell align="center" />
                      <StyledCell align="center">Vertigo</StyledCell>
                      <StyledCell align="center">Beat Direction</StyledCell>
                      <StyledCell align="center"> DEG./SEC</StyledCell>
                    </TableRow>
                  </StyledHeader>
                  <TableBody>
                    <TableRow>
                      <StyledBodyCell>Center</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Right</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Left</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Up</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TextArea rowsMin={3} placeholder="Notes" />
            </>
          )}
        </CardContent>
      </OutCard>
      <OutCard mb={6}>
        <CardContent>
          <Box my={4}>
            <Typography variant="h4" color="inherit" gutterBottom>
              Gaze - Vision Enabled
            </Typography>
          </Box>

          {isSubmitting ? (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <StyledHeader>
                    <TableRow>
                      <StyledCell align="center" />
                      <StyledCell align="center" />
                      <StyledCell align="center">Vertigo</StyledCell>
                      <StyledCell align="center">Beat Direction</StyledCell>
                      <StyledCell align="center"> DEG./SEC</StyledCell>
                    </TableRow>
                  </StyledHeader>
                  <TableBody>
                    <TableRow>
                      <StyledBodyCell>Center</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Right</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Left</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Up</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TextArea rowsMin={3} placeholder="Notes" />
            </>
          )}
        </CardContent>
      </OutCard>
      <OutCard mb={6}>
        <CardContent>
          <Box my={4}>
            <Typography variant="h4" color="inherit" gutterBottom>
              High Frequency Headshake
            </Typography>
          </Box>

          {isSubmitting ? (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <StyledHeader>
                    <TableRow>
                      <StyledCell align="center" />
                      <StyledCell align="center" />
                      <StyledCell align="center">Vertigo</StyledCell>
                      <StyledCell align="center">Beat Direction</StyledCell>
                      <StyledCell align="center">DEG./SEC</StyledCell>
                    </TableRow>
                  </StyledHeader>
                  <TableBody>
                    <TableRow>
                      <StyledBodyCell>Seated</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <RLOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Lateral Body Right</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <RLOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Lateral Body Left</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <RLOptions fieldkey="rlOption" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TextArea rowsMin={3} placeholder="Notes" />
            </>
          )}
        </CardContent>
      </OutCard>
      <OutCard mb={6}>
        <CardContent>
          <Box my={4}>
            <Typography variant="h4" color="inherit" gutterBottom>
              Positionals – Vision Denied
            </Typography>
          </Box>

          {isSubmitting ? (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <StyledHeader>
                    <TableRow>
                      <StyledCell align="center" />
                      <StyledCell align="center" />
                      <StyledCell align="center">Vertigo</StyledCell>
                      <StyledCell align="center">Beat Direction</StyledCell>
                      <StyledCell align="center"> DEG./SEC</StyledCell>
                    </TableRow>
                  </StyledHeader>
                  <TableBody>
                    <TableRow>
                      <StyledBodyCell>Supine</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Head Right</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Head Left</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Body Right</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Body Left</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TextArea rowsMin={3} placeholder="Notes" />
            </>
          )}
        </CardContent>
      </OutCard>
      <OutCard mb={6}>
        <CardContent>
          <Box my={4}>
            <Typography variant="h4" color="inherit" gutterBottom>
              Positionals – Vision Enabled
            </Typography>
          </Box>

          {isSubmitting ? (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <StyledHeader>
                    <TableRow>
                      <StyledCell align="center" />
                      <StyledCell align="center" />
                      <StyledCell align="center">Vertigo</StyledCell>
                      <StyledCell align="center">Beat Direction</StyledCell>
                      <StyledCell align="center"> DEG./SEC</StyledCell>
                    </TableRow>
                  </StyledHeader>
                  <TableBody>
                    <TableRow>
                      <StyledBodyCell>Supine</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Head Right</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Head Left</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Body Right</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Body Left</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <DirectionOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TextArea rowsMin={3} placeholder="Notes" />
            </>
          )}
        </CardContent>
      </OutCard>

      <OutCard mb={6}>
        <CardContent>
          <Box my={4}>
            <Typography variant="h4" color="inherit" gutterBottom>
              Hallpike
            </Typography>
          </Box>

          {isSubmitting ? (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <StyledHeader>
                    <TableRow>
                      <StyledCell align="center" />
                      <StyledCell align="center" />
                      <StyledCell align="center">Vertigo</StyledCell>
                      <StyledCell align="center">Beat Direction</StyledCell>
                      <StyledCell align="center"> DEG./SEC</StyledCell>
                    </TableRow>
                  </StyledHeader>
                  <TableBody>
                    <TableRow>
                      <StyledBodyCell>Right</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <IndexOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <HallPickOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Left</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <IndexOptions fieldkey="condition2" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <NormalityOptions fieldkey="condition1" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <HallPickOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TextArea rowsMin={3} placeholder="Notes" />
            </>
          )}
        </CardContent>
      </OutCard>
      <OutCard mb={6}>
        <CardContent>
          <Box my={4}>
            <Typography variant="h4" color="inherit" gutterBottom>
              Calorics
            </Typography>
          </Box>

          {isSubmitting ? (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <StyledHeader>
                    <TableRow>
                      <StyledCell align="center" />
                      <StyledCell align="center">WARM</StyledCell>
                      <StyledCell align="center">COOL</StyledCell>
                      <StyledCell align="center">VERTIGO</StyledCell>
                      <StyledCell align="center"></StyledCell>
                      <StyledCell align="center">FIXATION INDEX</StyledCell>
                      <StyledCell align="center">BILATERAL WEAKNESS</StyledCell>
                    </TableRow>
                  </StyledHeader>
                  <TableBody>
                    <TableRow>
                      <StyledBodyCell>Right</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <CarolicOptions />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <IndexOptions />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                    <TableRow>
                      <StyledBodyCell>Left</StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <StyledInput />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <ConsentOptions fieldkey="condition4" />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <CarolicOptions />
                        </Box>
                      </StyledBodyCell>
                      <StyledBodyCell>
                        <Box mb={2.5} mt={2.5}>
                          <IndexOptions />
                        </Box>
                      </StyledBodyCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TextArea rowsMin={3} placeholder="Notes" />
            </>
          )}
        </CardContent>
      </OutCard>
    </>
  );
};

const VngForm = () => {
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
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

export default VngForm;
