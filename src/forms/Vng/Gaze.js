import React from "react";

import * as Yup from "yup";
import { Formik } from "formik";

import { spacing } from "@material-ui/system";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
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
} from "./styledComponents";

import {
  Box,
  CardContent,
  Typography as MuiTypography,
} from "@material-ui/core";

const Typography = styled(MuiTypography)(spacing);

const Gaze = ({ setFieldValue, values }) => {
  let formKey = "gazeDenied";
  const data = values[formKey];
  const sections = [
    {
      title: "Center",
      key: "center",
      parentKey: `${formKey}.center`,
    },
    {
      title: "Right",
      parentKey: `${formKey}.right`,
      key: "right",
    },
    {
      title: "Left",
      parentKey: `${formKey}.left`,
      key: "left",
    },
    {
      title: "Up",
      parentKey: `${formKey}.up`,
      key: "up",
    },
  ];
  return (
    <OutCard mb={6}>
      <CardContent>
        <Box my={4}>
          <Typography variant="h4" color="inherit" gutterBottom>
            Gaze - Vision Denied
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
                  <StyledCell align="center"> DEG./SEC</StyledCell>
                </TableRow>
              </StyledHeader>
              <TableBody>
                {sections.map(({ title, parentKey, key }) => (
                  <TableRow key={key}>
                    <StyledBodyCell>{title}</StyledBodyCell>
                    <StyledBodyCell>
                      <Box mb={2.5} mt={2.5}>
                        <ConsentOptions
                          formKey={parentKey}
                          values={data[key]}
                          setFieldValue={setFieldValue}
                          fieldkey="consent"
                        />
                      </Box>
                    </StyledBodyCell>
                    <StyledBodyCell>
                      <Box mb={2.5} mt={2.5}>
                        <NormalityOptions
                          formKey={parentKey}
                          values={data[key]}
                          setFieldValue={setFieldValue}
                          fieldkey="vertigo"
                        />
                      </Box>
                    </StyledBodyCell>
                    <StyledBodyCell>
                      <Box mb={2.5} mt={2.5}>
                        <DirectionOptions
                          formKey={parentKey}
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

export default Gaze;
