import React from "react";

import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import TextArea from "components/reports/TextArea";
import Toggle from "components/reports/Toggle";

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
} from "@material-ui/core";
import BodyCell from "components/reports/BodyCell";
import Input from "components/reports/Input";

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
    {
      title: "Nothing",
      value: "nothing",
    },
  ];

  return isSubmitting ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
    <ReportCard
      cardsize={{ width: "987px" }}
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
            <Cell align="center">DURATION OF SYMPTOMS</Cell>
            <Cell align="center" width="50%">
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
            />
          </BodyCell>
          <BodyCell>
            <Toggle
              togglesize={{
                width: "148px",
                height: "38px",
              }}
              name={`hpi.symptomDuration`}
              value={values["hpi"]["symptomDuration"]}
              onChange={(value) => setFieldValue(`hpi.symptomDuration`, value)}
              options={durationOption}
            />
          </BodyCell>
          <BodyCell>
            <Toggle
              togglesize={{
                width: "210px",
                height: "38px",
              }}
              name={`hpi.provokesWith`}
              value={values["hpi"]["provokesWith"]}
              onChange={(value) => setFieldValue(`hpi.provokesWith`, value)}
              options={provokesOption}
            />
            <Input
              placeholder="Other"
              fieldsize={{ width: "210px", height: "38px" }}
            />
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
