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
  const { firstNotedProblem, mostRecentEpisode } = values["presentIllness"];

  const symtomsOptions = [
    {
      title: "Room Spins",
      value: "RoomSpin",
    },
    {
      title: "Patient Spins",
      value: "PatientSpin",
    },
    {
      title: "Imbalance",
      value: "Imbalance",
    },
    {
      title: "LightHeaded",
      value: "LightHeaded",
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
      value: "LyingDown",
    },
    {
      title: "Sitting Up",
      value: "SittingUp",
    },
    {
      title: "Rolling Over",
      value: "RollingOver",
    },
    {
      title: "Horizontal Head Movement",
      value: "HorizontalHeadMovement",
    },
    {
      title: "Vertical Head Pitch",
      value: "VerticalHeadPitch",
    },
    {
      title: "Walking",
      value: "Walking",
    },
  ];

  const resetInputValues = (key) => {
    symtomsOptions
      .filter(({ value }) => !key.some((item) => item === value))
      .map(({ value }) =>
        setFieldValue(`presentIllness.symptomDuration${value}`, "")
      );
  };

  const otherOption = {
    title: "Other",
    value: "Other",
  };

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
                value={firstNotedProblem}
                onChange={(value) =>
                  setFieldValue("presentIllness.firstNotedProblem", value)
                }
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
                value={mostRecentEpisode}
                onChange={(value) =>
                  setFieldValue("presentIllness.mostRecentEpisode", value)
                }
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
              exclusive={false}
              name={`presentIllness.symptoms`}
              value={values["presentIllness"]["symptoms"]}
              onChange={(value) => {
                setFieldValue(`presentIllness.symptoms`, value);
                resetInputValues(value);
              }}
              options={symtomsOptions}
            />
            <Input
              placeholder="Other"
              fieldsize={{ width: "148px", height: "38px" }}
              // value={values["hpi"]["symptoms"]}
              onChange={(e) =>
                setFieldValue(`presentIllness.symptoms`, [
                  ...values["presentIllness"]["symptoms"],
                  e.target.value,
                ])
              }
            />
          </BodyCell>
          <BodyCell>
            <FlexBox direction="row">
              <FlexBox direction="column">
                {[...symtomsOptions, otherOption].map((item, index) => (
                  <Box mb={2} key={index}>
                    <Input
                      disabled={
                        [...symtomsOptions, otherOption].length - 1 === index
                          ? false
                          : !values.presentIllness.symptoms.some(
                              (item) => item === symtomsOptions[index]?.value
                            )
                      }
                      fieldsize={{ width: "147px", height: "41px" }}
                      placeholder="Enter a value"
                      value={
                        values["presentIllness"][`symptomDuration${item.value}`]
                      }
                      onChange={({ target }) =>
                        setFieldValue(
                          `presentIllness.symptomDuration${item.value}`,
                          target.value
                        )
                      }
                    />
                  </Box>
                ))}
              </FlexBox>
              <Box ml={2}>
                {[...symtomsOptions, otherOption].map((item, index) => (
                  <Box mb={2} key={index}>
                    <InputLabel htmlFor="filled-age-native-simple"></InputLabel>
                    <Select
                      disabled={
                        [...symtomsOptions, otherOption].length - 1 === index
                          ? false
                          : !values.presentIllness.symptoms.some(
                              (item) => item === symtomsOptions[index]?.value
                            )
                      }
                      variant="outlined"
                      native
                      label="Select"
                      value={
                        values["presentIllness"][
                          `symptomDurationUnit${item.value}`
                        ]
                      }
                      onChange={({ target }) => {
                        setFieldValue(
                          `presentIllness.symptomDurationUnit${item.value}`,
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
            {[...symtomsOptions, otherOption].map((item, index) => (
              <Box mb={2} key={index}>
                <InputLabel htmlFor="filled-age-native-simple"></InputLabel>
                <Select
                  disabled={
                    durationOption.length - 1 === index
                      ? false
                      : !values.presentIllness.symptoms.some(
                          (item) => item === symtomsOptions[index]?.value
                        )
                  }
                  variant="outlined"
                  native
                  width="110px"
                  label="Select"
                  value={values["presentIllness"][`provokesWith${item.value}`]}
                  onChange={({ target }) => {
                    setFieldValue(
                      `presentIllness.provokesWith${item.value}`,
                      target.value
                    );
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
        value={values["presentIllness"]["notes"]}
        onChange={(value) => setFieldValue(`presentIllness.notes`, value)}
      />
    </ReportCard>
  );
};

export default HPI;
