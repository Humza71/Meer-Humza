import React from "react";

import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import Toggle from "components/reports/Toggle";
import BodyCell from "components/reports/BodyCell";
import TextArea from "components/reports/TextArea";
import { TableRow } from "@material-ui/core";

const OtoacousticForm = (props) => {
  const { setFieldValue, values } = props;
  const data = values["oe"];
  const otoacousticQuestions = [
    {
      title: "DPOAE",
      key: "dpoae",
      direction: "column",
      options: [
        {
          title: "Present",
          value: "present",
        },
        {
          title: "Absent",
          value: "absent",
        },
      ],
    },
    {
      title: "TEOAE",
      key: "teoae",
      direction: "column",
      options: [
        {
          title: "Present",
          value: "present",
        },
        {
          title: "Reduced",
          value: "reduced",
        },
        {
          title: "Absent",
          value: "absent",
        },
      ],
    },
  ];

  const rows = [
    { title: "Right Ear", key: "rightEar" },
    { title: "Left Ear", key: "leftEar" },
  ];

  return (
    <ReportCard cardsize={{ width: "635px" }} title="Otoacoustic Emissions">
      <ReportTable
        Columns={() => (
          <>
            <Cell align="center" width="15%"></Cell>
            {otoacousticQuestions.map(({ title, key }) => (
              <Cell align="center" key={key} width="15%">
                {title}
              </Cell>
            ))}
          </>
        )}
      >
        {rows.map(({ title: rowTitle, key }) => (
          <TableRow key={key}>
            <BodyCell>{rowTitle}</BodyCell>
            {otoacousticQuestions.map(
              ({ key: fieldKey, options, direction }) => (
                <BodyCell key={fieldKey}>
                  <Toggle
                    direction={direction}
                    togglesize={{
                      width: "105px",
                      height: "38px",
                    }}
                    name={`${key}.${fieldKey}`}
                    value={data[key][fieldKey]}
                    onChange={(value) =>
                      setFieldValue(`ai.${key}.${fieldKey}`, value)
                    }
                    options={options}
                  />
                </BodyCell>
              )
            )}
          </TableRow>
        ))}
      </ReportTable>
      <TextArea
        rowsMin={3}
        placeholder="Notes"
        value={data["notes"]}
        onChange={(value) => setFieldValue(`ai.notes`, value)}
      />
    </ReportCard>
  );
};

export default OtoacousticForm;
