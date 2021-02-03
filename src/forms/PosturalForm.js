import React, { Fragment } from "react";
import styled from "styled-components/macro";

import * as Yup from "yup";
import { Formik } from "formik";

import { Alert as MuiAlert } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import DateFnsUtils from "@date-io/date-fns";
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
} from "@material-ui/core";
import {
  ToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@material-ui/lab";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

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

  const MCTOptions = ({ fieldkey, children }) => (
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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <OutCard mb={6}>
        <CardContent>
          <Box my={4}>
            <Typography variant="h4" color="inherit" gutterBottom>
              Gans Sensory Organization Performance Test ©
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
                      <StyledCell align="center">CONDITION 1</StyledCell>
                      <StyledCell align="center">CONDITION 2</StyledCell>
                      <StyledCell align="center">CONDITION 3</StyledCell>
                      <StyledCell align="center">CONDITION 4</StyledCell>
                      <StyledCell align="center">CONDITION 5</StyledCell>
                      <StyledCell align="center">CONDITION 6</StyledCell>
                      <StyledCell align="center">STEPPING FAKUDA</StyledCell>
                    </TableRow>
                  </StyledHeader>
                  <TableBody>
                    <TableRow>
                      <BorderCell>
                        <Box my={4}>
                          <img src="/static/img/reports/postural/Condition1.svg" />
                        </Box>
                        <Box mb={2.5}>
                          <ConditionOption fieldkey="condition1" />
                        </Box>
                      </BorderCell>
                      <BorderCell>
                        <Box my={4}>
                          <img src="/static/img/reports/postural/Condition2.svg" />
                        </Box>
                        <Box mb={2.5}>
                          <ConditionOption fieldkey="condition2" />
                        </Box>
                      </BorderCell>
                      <BorderCell>
                        <Box my={4}>
                          <img src="/static/img/reports/postural/Condition3.svg" />
                        </Box>
                        <Box mb={2.5}>
                          <ConditionOption fieldkey="condition3" />
                        </Box>
                      </BorderCell>
                      <BorderCell>
                        <Box my={4}>
                          <img src="/static/img/reports/postural/Condition4.svg" />
                        </Box>
                        <Box mb={2.5}>
                          <ConditionOption fieldkey="condition4" />
                        </Box>
                      </BorderCell>
                      <BorderCell>
                        <Box my={4}>
                          <img src="/static/img/reports/postural/Condition5.svg" />
                        </Box>
                        <Box mb={2.5}>
                          <ConditionOption fieldkey="condition5" />
                        </Box>
                      </BorderCell>
                      <BorderCell>
                        <Box my={4}>
                          <img src="/static/img/reports/postural/Condition6.svg" />
                        </Box>
                        <Box mb={2.5}>
                          <ConditionOption fieldkey="condition6" />
                        </Box>
                      </BorderCell>
                      <StyledBodyCell>
                        <Box my={4}>
                          <img src="/static/img/reports/postural/Condition7.svg" />
                        </Box>
                        <Box mb={2.5}>
                          <ConditionOption fieldkey="condition7">
                            <ToggleButton value="right" aria-label="right">
                              Right
                            </ToggleButton>
                            <ToggleButton value="left" aria-label="left">
                              Left
                            </ToggleButton>
                          </ConditionOption>
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
              Computerized Dynamic Posturography
            </Typography>
          </Box>
          <TableContainer>
            <Table aria-label="simple table">
              <StyledHeader>
                <TableRow>
                  <StyledCell align="center" width="25%"></StyledCell>
                  <StyledCell align="center">CONDITION 1</StyledCell>
                  <StyledCell align="center">CONDITION 2</StyledCell>
                  <StyledCell align="center">CONDITION 3</StyledCell>
                  <StyledCell align="center">CONDITION 4</StyledCell>
                  <StyledCell align="center">CONDITION 5</StyledCell>
                  <StyledCell align="center">CONDITION 6</StyledCell>
                </TableRow>
              </StyledHeader>
              <TableBody>
                <TableRow>
                  <StyledBodyCell>Sensory Organization Test</StyledBodyCell>
                  <StyledBodyCell>
                    <Box mb={2.5} mt={2.5}>
                      <ConditionOption fieldkey="condition1" />
                    </Box>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Box mb={2.5} mt={2.5}>
                      <ConditionOption fieldkey="condition2" />
                    </Box>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Box mb={2.5} mt={2.5}>
                      <ConditionOption fieldkey="condition3" />
                    </Box>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Box mb={2.5} mt={2.5}>
                      <ConditionOption fieldkey="condition4" />
                    </Box>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Box mb={2.5} mt={2.5}>
                      <ConditionOption fieldkey="condition5" />
                    </Box>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Box mb={2.5} mt={2.5}>
                      <ConditionOption fieldkey="condition6" />
                    </Box>
                  </StyledBodyCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table aria-label="simple table">
              <StyledHeader>
                <TableRow>
                  <StyledCell align="left" width="25%"></StyledCell>
                  <StyledCell align="center" width="35%">
                    Backward Translations
                  </StyledCell>
                  <StyledCell align="center" width="35%">
                    Forward Translations
                  </StyledCell>
                </TableRow>
              </StyledHeader>
              <TableBody>
                <TableRow>
                  <StyledBodyCell>Motor Control Test</StyledBodyCell>
                  <StyledBodyCell>
                    <Box mb={2.5} mt={2.5}>
                      <MCTOptions fieldkey="bt" />
                    </Box>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Box mb={2.5} mt={2.5}>
                      <MCTOptions fieldkey="ft" />
                    </Box>
                  </StyledBodyCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardContent>
          <TableContainer>
            <Table aria-label="simple table">
              <StyledHeader>
                <TableRow>
                  <StyledCell align="left" width="25%"></StyledCell>
                  <StyledCell align="center" width="35%">
                    Toes-Up
                  </StyledCell>
                  <StyledCell align="center" width="35%">
                    Toes-Down
                  </StyledCell>
                </TableRow>
              </StyledHeader>
              <TableBody>
                <TableRow>
                  <StyledBodyCell>Adaptation Test</StyledBodyCell>
                  <StyledBodyCell>
                    <Box mb={2.5} mt={2.5}>
                      <MCTOptions fieldkey="tu" />
                    </Box>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Box mb={2.5} mt={2.5}>
                      <MCTOptions fieldkey="td" />
                    </Box>
                  </StyledBodyCell>
                </TableRow>
              </TableBody>
            </Table>
            <TextArea rowsMin={3} placeholder="Notes" />
          </TableContainer>
        </CardContent>
      </OutCard>
    </MuiPickersUtilsProvider>
  );
};

const PosturalForm = () => {
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

export default PosturalForm;
