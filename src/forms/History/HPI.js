import React from "react";

import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import TextArea from "components/reports/TextArea";
import Toggle from "components/reports/Toggle";
import Input from "components/reports/Input";
import InputLabel from "@material-ui/core/InputLabel";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Grid,
  Typography,
  Divider,
  Box,
  CircularProgress,
  TableRow,
  Select as MuiSelect,
} from "@material-ui/core";
import styled from "styled-components/macro";
import BodyCell from "components/reports/BodyCell";
import FlexBox from "components/FlexBox";

const Select = styled(MuiSelect)`
  select {
    padding: 13px !important;
    width: ${({ width = "76px" }) => width};
  }
`;

const HPI = (props) => {
  const { setFieldValue, isSubmitting, values } = props;
  const { fnp, recentEpisode } = values["hpi"];

  const symtomsOptions = [
    {
      title: "Room Spins",
      value: "roomSpin",
    },
    {
      title: "Patient Spins",
      value: "patientSpin",
    },
    {
      title: "Imbalance",
      value: "imbalance",
    },
    {
      title: "LightHeaded",
      value: "lightHeaded",
    },
  ];

  const durationOption = [
    {
      title: "Seconds",
      value: "sec",
    },
    {
      title: "Minutes",
      value: "min",
    },
    {
      title: "Hours",
      value: "hr",
    },
    {
      title: "Days",
      value: "day",
    },
    {
      title: "Contant",
      value: "constant",
    },
  ];

  const provokesOption = [
    {
      title: "Lying Down",
      value: "lyingDown",
    },
    {
      title: "Sitting Up",
      value: "sittingUp",
    },
    {
      title: "Rolling Over",
      value: "rollingOver",
    },
    {
      title: "Horizontal Head Movement",
      value: "horizontalHeadMovement",
    },
    {
      title: "Vertical Head Pitch",
      value: "verticalHeadPitch",
    },
    {
      title: "Walking",
      value: "walking",
    },
  ];

  // const disableInput = (index) => {
  //   const disable =
  //     (values["hpi"]["symptoms"] === "roomSpin" && index === 0) ||
  //     (values["hpi"]["symptoms"] === "patientSpin" && index === 1) ||
  //     (values["hpi"]["symptoms"] === "imbalance" && index === 2) ||
  //     (values["hpi"]["symptoms"] === "lightHeaded" && index === 3)
  //       ? false
  //       : true;

  //   debugger;
  //   return disable;
  // };

  return isSubmitting ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
    <ReportCard
      cardsize={{ width: "850px" }}
      title="History of Present Illness (HPI)"
    >
      <Box mb={2.5}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <Typography variant="h6" mb={1}>
                First Noticed Problem
              </Typography>
              <KeyboardDatePicker
                disableToolbar
                name="birthday"
                variant="inline"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                margin="normal"
                value={fnp}
                onChange={(value) => setFieldValue("hpi.fnp", value)}
                fullWidth
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" mb={1}>
                Most Recent Episode
              </Typography>
              <KeyboardDatePicker
                disableToolbar
                name="birthday"
                variant="inline"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                margin="normal"
                value={recentEpisode}
                onChange={(value) => setFieldValue("hpi.recentEpisode", value)}
                fullWidth
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </Box>
      <Divider />
      <ReportTable
        Columns={() => (
          <>
            <Cell align="center">SYMTOMS</Cell>
            <Cell align="center" width="30%">
              DURATION OF SYMPTOMS
            </Cell>
            <Cell align="center" width="40%">
              PROVOKES WITH
            </Cell>
          </>
        )}
      >
        <TableRow>
          <BodyCell>
            <Toggle
              togglesize={{
                width: "148px",
                height: "38px",
              }}
              name={`hpi.symptoms`}
              value={values["hpi"]["symptoms"]}
              onChange={(value) => setFieldValue(`hpi.symptoms`, value)}
              options={symtomsOptions}
            />
            <Input
              placeholder="Other"
              fieldsize={{ width: "148px", height: "38px" }}
              // value={values["hpi"]["symptoms"]}
              onChange={(e) => setFieldValue(`hpi.symptoms`, e.target.value)}
            />
          </BodyCell>
          <BodyCell>
            <FlexBox direction="row">
              <FlexBox direction="column">
                {durationOption.map((item, index) => (
                  <Box mb={2} key={index}>
                    <Input
                      disabled={
                        durationOption.length - 1 === index
                          ? false
                          : values["hpi"]["symptoms"] !==
                            symtomsOptions[index]?.value
                      }
                      fieldsize={{ width: "147px", height: "41px" }}
                      placeholder="Enter a value"
                      value={values["hpi"][`symptomDuration-${index}`]}
                      onChange={({ target }) =>
                        setFieldValue(
                          `hpi.symptomDuration-${index}`,
                          target.value
                        )
                      }
                    />
                  </Box>
                ))}
              </FlexBox>
              <Box ml={2}>
                {durationOption.map((item, index) => (
                  <Box mb={2} key={index}>
                    <InputLabel htmlFor="filled-age-native-simple"></InputLabel>
                    <Select
                      disabled={
                        durationOption.length - 1 === index
                          ? false
                          : values["hpi"]["symptoms"] !==
                            symtomsOptions[index]?.value
                      }
                      variant="outlined"
                      native
                      label="Select"
                      value={values["hpi"][`symptomDuration-unit-${index}`]}
                      onChange={({ target }) => {
                        setFieldValue(
                          `hpi.symptomDuration-unit-${index}`,
                          target.value
                        );
                      }}
                      inputProps={{
                        name: "age",
                        id: "filled-age-native-simple",
                      }}
                    >
                      <option value="Seconds">Seconds</option>
                      <option value="Minutes">Minutes</option>
                      <option value="Hours">Hours</option>
                    </Select>
                  </Box>
                ))}
              </Box>
            </FlexBox>
          </BodyCell>
          <BodyCell>
            {Array(5)
              .fill()
              .map((item, index) => (
                <Box mb={2} key={index}>
                  <InputLabel htmlFor="filled-age-native-simple"></InputLabel>
                  <Select
                    disabled={
                      durationOption.length - 1 === index
                        ? false
                        : values["hpi"]["symptoms"] !==
                          symtomsOptions[index]?.value
                    }
                    variant="outlined"
                    native
                    width="110px"
                    label="Select"
                    value={values["hpi"][`provokesWith-${index}`]}
                    onChange={({ target }) => {
                      setFieldValue(`hpi.provokesWith-${index}`, target.value);
                    }}
                    inputProps={{
                      name: "age",
                      id: "filled-age-native-simple",
                    }}
                  >
                    {provokesOption.map(({ title, value }) => (
                      <option value={value} key={value}>
                        {title}
                      </option>
                    ))}
                  </Select>
                </Box>
              ))}
          </BodyCell>
        </TableRow>
      </ReportTable>
      <TextArea
        rowsMin={3}
        placeholder="Notes"
        value={values["hpi"]["notes"]}
        onChange={(value) => setFieldValue(`hpi.notes`, value)}
      />
    </ReportCard>
  );
};

export default HPI;
