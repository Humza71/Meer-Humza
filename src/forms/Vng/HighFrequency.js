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
  DirectionOptions,
  StyledInput,
  RLOptions,
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

const HighFrequency = ({ formTitle, formKey, setFieldValue, values }) => {
  const data = values[formKey];
  const sections = [
    {
      title: "Seated",
      key: "seated",
      parentKey: `${formKey}.seated`,
    },
    {
      title: "Lateral Right",
      parentKey: `${formKey}.lateralRight`,
      key: "lateralRight",
    },
    {
      title: "Lateral Left",
      parentKey: `${formKey}.lateralLeft`,
      key: "lateralLeft",
    },
  ];

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
                  <StyledCell align="center" />
                  <StyledCell align="center" />
                  <StyledCell align="center">Vertigo</StyledCell>
                  <StyledCell align="center">Beat Direction</StyledCell>
                  <StyledCell align="center">DEG./SEC</StyledCell>
                </TableRow>
              </StyledHeader>
              <TableBody>
                {sections.map(({ title, parentKey, key }) => (
                  <TableRow key={key}>
                    <StyledBodyCell>{title}</StyledBodyCell>
                    <StyledBodyCell>
                      <Box mb={2.5} mt={2.5}>
                        <NormalityOptions
                          formKey={`${parentKey}`}
                          values={data[key]}
                          setFieldValue={setFieldValue}
                          fieldkey="normality"
                        />
                      </Box>
                    </StyledBodyCell>
                    <StyledBodyCell>
                      <Box mb={2.5} mt={2.5}>
                        <ConsentOptions
                          formKey={`${parentKey}`}
                          values={data[key]}
                          setFieldValue={setFieldValue}
                          fieldkey="vertigo"
                        />
                      </Box>
                    </StyledBodyCell>
                    <StyledBodyCell>
                      <Box mb={2.5} mt={2.5}>
                        <RLOptions
                          formKey={`${parentKey}`}
                          values={data[key]}
                          setFieldValue={setFieldValue}
                          fieldkey="beatDirection"
                        />
                      </Box>
                    </StyledBodyCell>
                    <StyledBodyCell>
                      <Box mb={2.5} mt={2.5}>
                        <StyledInput
                          value={data[key]["deg"]}
                          onChange={(e) =>
                            setFieldValue(
                              `${formKey}.${key}.deg`,
                              e.target.value
                            )
                          }
                        />
                      </Box>
                    </StyledBodyCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TextArea
            rowsMin={3}
            placeholder="Notes"
            value={data["notes"]}
            onChange={(e) => setFieldValue(`${formKey}.notes`, e.target.value)}
          />
        </>
      </CardContent>
    </OutCard>
  );
};

export default HighFrequency;
