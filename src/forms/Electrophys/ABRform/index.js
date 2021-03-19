import React from "react";

import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import Toggle from "components/reports/Toggle";
import BodyCell from "components/reports/BodyCell";
import TextArea from "components/reports/TextArea";
import { TableRow } from "@material-ui/core";

const ABRform = (props) => {
  const { setFieldValue, values } = props;
  const data = values["auditoryBrainstemResponse"];
  const abrQuestions = [
    {
      title: "ABSOLUTE LATENCIES",
      key: "absoluteLatency",
      direction: "column",
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
      title: "INTER-WAVE LATENCIES",
      key: "interWaveLatency",
      direction: "column",
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
      title: "MORPHOLOGY",
      key: "morphology",
      direction: "row",
      options: [
        {
          title: "Good",
          value: "good",
        },
        {
          title: "Moderate",
          value: "moderate",
        },
        {
          title: "Poor",
          value: "poor",
        },
      ],
    },
  ];

  const rows = [
    { title: "Right", key: "right" },
    { title: "Left", key: "left" },
  ];

  return (
    <ReportCard
      cardsize={{ width: "915px" }}
      title="Auditory Brainstem Response (ABR)"
    >
      <ReportTable
        Columns={() => (
          <>
            <Cell align="center"></Cell>
            {abrQuestions.map(({ title, key }) => (
              <Cell align="center" key={key}>
                {title}
              </Cell>
            ))}
          </>
        )}
      >
        {rows.map(({ title: rowTitle, key }) => (
          <TableRow key={key}>
            <BodyCell>{rowTitle}</BodyCell>
            {abrQuestions.map(({ key: fieldKey, options, direction }) => (
              <BodyCell key={fieldKey}>
                <Toggle
                  direction={direction}
                  togglesize={{
                    width: "84px",
                    height: "38px",
                  }}
                  name={`${key}.${fieldKey}`}
                  value={data[key][fieldKey]}
                  onChange={(value) =>
                    setFieldValue(
                      `auditoryBrainstemResponse.${key}.${fieldKey}`,
                      value
                    )
                  }
                  options={options}
                />
              </BodyCell>
            ))}
          </TableRow>
        ))}
      </ReportTable>
      <TextArea
        rowsMin={3}
        placeholder="Notes"
        value={data["notes"]}
        onChange={(value) =>
          setFieldValue(`auditoryBrainstemResponse.notes`, value)
        }
      />
    </ReportCard>
  );
};

export default ABRform;
