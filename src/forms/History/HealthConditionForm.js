import React from "react";

import ReportCard from "components/reports/ReportCard";
import Toggle from "components/reports/Toggle";
import Input from "components/reports/Input";

import { Grid, Box, CircularProgress } from "@material-ui/core";

const AuralSymptom = (props) => {
  const { setFieldValue, isSubmitting, values } = props;

  const conditionCol1 = [
    {
      title: "Peripheral Neuropathy",
      value: "peripheralNeuropathy",
    },
    {
      title: "Anxiety/Stress",
      value: "anxiety",
    },
    {
      title: "Depression",
      value: "depression",
    },
    {
      title: "Motion Sickness/Intolerance",
      value: "motionSick",
    },
    {
      title: "Diabetes",
      value: "diabetes",
    },
    {
      title: "Respiratory Problems ",
      value: "respiratory",
    },
    {
      title: "Thyroid Dysfunction",
      value: "thyroidDysfunction",
    },
  ];

  const conditionCol2 = [
    {
      title: "Hypertension",
      value: "hypertension",
    },
    {
      title: "Hypotensionnxiety/Stress",
      value: "hypotension",
    },
    {
      title: "Meniere’s Disease",
      value: "Meniere’s Disease",
    },
    {
      title: "Migraine",
      value: "Migraine",
    },
    {
      title: "Orthopedic Limitations",
      value: "Orthopedic Limitations",
    },
    {
      title: "Concussion/Head Injury",
      value: "Concussion/Head Injury",
    },
    {
      title: "CVA/TIA",
      value: "CVA/TIA",
    },
    {
      title: "Recent Head Imaging",
      value: "Recent Head Imaging",
    },
    {
      title: "Other",
      value: "Other",
    },
  ];

  return isSubmitting ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
    <ReportCard cardsize={{ width: "987px" }} title="Our Health Conditions">
      <Grid container spacing={6}>
        <Grid item xs={3}>
          <Toggle
            togglesize={{
              width: "210px",
              height: "38px",
            }}
            exclusive={false}
            name={`healthCondition.conditions`}
            value={values["healthCondition"]["conditions"]}
            onChange={(value) =>
              setFieldValue(`healthCondition.conditions`, value)
            }
            options={conditionCol1}
          />
        </Grid>
        <Grid container>
          <Toggle
            togglesize={{
              width: "210px",
              height: "38px",
            }}
            exclusive={false}
            name={`healthCondition.conditions`}
            value={values["healthCondition"]["conditions"]}
            onChange={(value) =>
              setFieldValue(`healthCondition.conditions`, value)
            }
            options={conditionCol2}
          />
        </Grid>
      </Grid>
    </ReportCard>
  );
};

export default AuralSymptom;
