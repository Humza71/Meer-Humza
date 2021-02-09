import React from "react";
import Cell from "components/reports/Cell";
import BodyCell from "components/reports/BodyCell";
import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Toggle from "components/reports/Toggle";
import TextArea from "components/reports/TextArea";

import { Box } from "@material-ui/core";

const OculuMotors = ({ formTitle, formKey, setFieldValue, values }) => {
  const data = values[formKey];

  const oculuMotorsQuestions = [
    {
      title: "Saccades",
      key: "saccades",
      options: [
        {
          title: "Normal",
          value: "normal",
        },
        {
          title: "Abnormal",
          value: "abnormal",
        },
      ],
    },
    {
      title: "Vertigo",
      key: "vertigo",
      options: [
        {
          title: "Yes",
          value: "yes",
        },
        {
          title: "No",
          value: "no",
        },
      ],
    },
    {
      title: "Smooth Pursuit",
      key: "smoothPursuit",
      options: [
        {
          title: "Normal",
          value: "normal",
        },
        {
          title: "Abnormal",
          value: "abnormal",
        },
      ],
    },
    {
      title: "Optokinetic",
      key: "optokinetic",
      options: [
        {
          title: "Normal",
          value: "normal",
        },
        {
          title: "Abnormal",
          value: "abnormal",
        },
      ],
    },
  ];

  return (
    <ReportCard title={formTitle}>
      <>
        <ReportTable
          Columns={() =>
            oculuMotorsQuestions.map(({ title }) => (
              <Cell align="center">{title}</Cell>
            ))
          }
        >
          {oculuMotorsQuestions.map(({ title, key, options }) => (
            <BodyCell>
              <Box mb={2.5} mt={2.5}>
                <Toggle
                  name={`${formKey}.${key}`}
                  value={data[key]}
                  onChange={(value) =>
                    setFieldValue(`${formKey}.${key}`, value)
                  }
                  options={options}
                />
              </Box>
            </BodyCell>
          ))}
        </ReportTable>
      </>
      <TextArea
        value={data["notes"]}
        onChange={(value) => setFieldValue(`${formKey}.notes`, value)}
      />
    </ReportCard>
  );
};

export default OculuMotors;
