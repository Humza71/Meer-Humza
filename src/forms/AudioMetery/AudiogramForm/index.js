import React from "react";

import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import Toggle from "components/reports/Toggle";
import BodyCell from "components/reports/BodyCell";
import TextArea from "components/reports/TextArea";
import { TableRow } from "@material-ui/core";
import Input from "components/reports/Input";

const AudiogramForm = (props) => {
  const { setFieldValue, values } = props;
  const data = values["audioGram"];
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
    <ReportCard cardsize={{ width: "635px" }} title="Audiogram">
      <ReportTable
        Columns={() => (
          <>
            <Cell align="center" width="15%"></Cell>
            {audiogramQuestions.map(({ title, key }) => (
              <Cell align="center" key={key} width="15%">
                {title}
              </Cell>
            ))}
            <Cell align="center" width="25%"></Cell>
          </>
        )}
      >
        {rows.map(({ title: rowTitle, key }) => (
          <TableRow key={key}>
            <BodyCell>{rowTitle}</BodyCell>
            {audiogramQuestions.map(({ key: fieldKey, options, direction }) => (
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
                    setFieldValue(`audioGram.${key}.${fieldKey}`, value)
                  }
                  options={options}
                />
              </BodyCell>
            ))}
            <BodyCell>
              <Input
                fieldsize={{ width: "224px" }}
                value={data[key]["instruction"]}
                onChange={(e) =>
                  setFieldValue(`audioGram.${key}.instruction`, e.target.value)
                }
              />
            </BodyCell>
          </TableRow>
        ))}
      </ReportTable>
      <TextArea
        rowsMin={3}
        placeholder="Notes"
        value={data["notes"]}
        onChange={(value) => setFieldValue(`audioGram.notes`, value)}
      />
    </ReportCard>
  );
};

export default AudiogramForm;
