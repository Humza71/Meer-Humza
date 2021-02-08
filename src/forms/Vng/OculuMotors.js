import React from "react";

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
import styled from "styled-components/macro";

import {
  StyledHeader,
  StyledCell,
  StyledBodyCell,
  NormalityOptions,
  ConsentOptions,
  OutCard,
  TextArea,
} from "./styledComponents";

import {
  Box,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Typography as MuiTypography,
  TextareaAutosize,
  Input,
} from "@material-ui/core";

const Typography = styled(MuiTypography)(spacing);

const OculuMotors = ({ formTitle, formKey, setFieldValue, values }) => {
  const data = values[formKey];
  return (
    <OutCard mb={6}>
      <CardContent>
        <Box my={4}>
          <Typography variant="h4" color="inherit" gutterBottom>
            {formTitle}
          </Typography>
        </Box>
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
                      <NormalityOptions
                        formKey={formKey}
                        values={data}
                        setFieldValue={setFieldValue}
                        fieldkey="saccades"
                      />
                    </Box>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Box mb={2.5} mt={2.5}>
                      <ConsentOptions
                        formKey={formKey}
                        values={data}
                        setFieldValue={setFieldValue}
                        fieldkey="vertigo"
                      />
                    </Box>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Box mb={2.5} mt={2.5}>
                      <NormalityOptions
                        formKey={formKey}
                        values={data}
                        setFieldValue={setFieldValue}
                        fieldkey="smoothPursuit"
                      />
                    </Box>
                  </StyledBodyCell>
                  <StyledBodyCell>
                    <Box mb={2.5} mt={2.5}>
                      <NormalityOptions
                        formKey={formKey}
                        values={data}
                        setFieldValue={setFieldValue}
                        fieldkey="optokinetic"
                      />
                    </Box>
                  </StyledBodyCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TextArea
            rowsMin={3}
            placeholder="Notes"
            value={data["notes"]}
            onChange={(e) => setFieldValue(`${formKey}.notes`)}
          />
        </>
      </CardContent>
    </OutCard>
  );
};

export default OculuMotors;
