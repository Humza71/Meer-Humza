import React from "react";

import ReportCard from "components/reports/ReportCard";
import { Grid } from "@material-ui/core";
// import ReportTable from "components/reports/Table";
// import Cell from "components/reports/Cell";
// import Toggle from "components/reports/Toggle";
// import BodyCell from "components/reports/BodyCell";
// import TextArea from "components/reports/TextArea";
// import { TableRow } from "@material-ui/core";
// import Input from "components/reports/Input";

const ScreeningTest = (props) => {
  const { setFieldValue, values } = props;
  const data = values["audiogram"];
  const audiogramQuestions = [
    {
      title: "",
      key: "dpoae",
      direction: "column",
      options: [
        {
          title: "Normal",
          value: "normal",
        },
        {
          title: "Conductive",
          value: "conductive",
        },
        {
          title: "sensorineural",
          value: "Sensorineural",
        },
        {
          title: "Mixed",
          value: "mixed",
        },
      ],
    },
  ];

  const rows = [
    { title: "Right Ear", key: "rightEar" },
    { title: "Left Ear", key: "leftEar" },
  ];

  return (
    <ReportCard cardsize={{ width: "1168px" }} title="">
      <Grid container>
        <Grid item xs={6}>
          <ReportCard
            cardsize={{ width: "500px" }}
            title="Vertebral Artery Screening Test (VAST)"
          ></ReportCard>
        </Grid>
        <Grid item xs={6}>
          <ReportCard
            cardsize={{ width: "500px" }}
            title="Cervical Dizziness Screening Test"
          ></ReportCard>
        </Grid>
      </Grid>
    </ReportCard>
  );
};

export default ScreeningTest;
