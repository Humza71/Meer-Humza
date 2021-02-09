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
  StyledInput,
  DirectionOptions,
  IndexOptions,
  CarolicOptions,
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

const Calorics = ({ formTitle, formKey, setFieldValue, values }) => {
  const data = values[formKey];

  const sections = [
    {
      title: "Right",
      key: "right",
      parentKey: `${formKey}.right`,
    },
    {
      title: "Left",
      parentKey: `${formKey}.left`,
      key: "left",
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
                  <StyledCell align="center">WARM</StyledCell>
                  <StyledCell align="center">COOL</StyledCell>
                  <StyledCell align="center">VERTIGO</StyledCell>
                  <StyledCell align="center"></StyledCell>
                  <StyledCell align="center">FIXATION INDEX</StyledCell>
                  <StyledCell align="center">BILATERAL WEAKNESS</StyledCell>
                </TableRow>
              </StyledHeader>
              <TableBody>
                {sections.map(({ title, parentKey, key }) => (
                  <TableRow key={key}>
                    <StyledBodyCell>{title}</StyledBodyCell>
                    <StyledBodyCell>
                      <Box mb={2.5} mt={2.5}>
                        <StyledInput
                          value={data[key]["warm"]}
                          onChange={(e) =>
                            setFieldValue(
                              `${formKey}.${key}.warm`,
                              e.target.value
                            )
                          }
                        />
                      </Box>
                    </StyledBodyCell>
                    <StyledBodyCell>
                      <Box mb={2.5} mt={2.5}>
                        <StyledInput
                          value={data[key]["cool"]}
                          onChange={(e) =>
                            setFieldValue(
                              `${formKey}.${key}.cool`,
                              e.target.value
                            )
                          }
                        />
                      </Box>
                    </StyledBodyCell>
                    <StyledBodyCell>
                      <Box mb={2.5} mt={2.5}>
                        <ConsentOptions
                          formKey={`${parentKey}`}
                          values={data[key]}
                          setFieldValue={setFieldValue}
                          fieldkey="uwDp"
                        />
                      </Box>
                    </StyledBodyCell>
                    <StyledBodyCell>
                      <Box mb={2.5} mt={2.5}>
                        <CarolicOptions
                          formKey={`${parentKey}`}
                          values={data[key]}
                          setFieldValue={setFieldValue}
                          fieldkey="fixationIndex"
                        />
                      </Box>
                    </StyledBodyCell>
                    <StyledBodyCell>
                      <Box mb={2.5} mt={2.5}>
                        <IndexOptions
                          formKey={`${parentKey}`}
                          values={data[key]}
                          setFieldValue={setFieldValue}
                          fieldkey="bW"
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

export default Calorics;
