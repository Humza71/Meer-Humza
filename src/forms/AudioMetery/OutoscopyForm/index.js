import React from "react";

import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import Toggle from "components/reports/Toggle";
import BodyCell from "components/reports/BodyCell";
import TextArea from "components/reports/TextArea";
import { TableRow } from "@material-ui/core";
import Input from "components/reports/Input";

const OutoscopyForm = (props) => {
  const { setFieldValue, values } = props;
  const data = values["otoscopy"];
  const otoscopyQuestions = [
    {
      title: "",
      key: "result",
      direction: "column",
      options: [
        {
          title: "Unremarkable",
          value: "unremarkable",
        },
        {
          title: "Remarkable",
          value: "remarkable",
        },
      ],
    },
  ];
  const rows = [
    { title: "Right Ear", key: "rightEar" },
    { title: "Left Ear", key: "leftEar" },
  ];

  return (
    <ReportCard cardsize={{ width: "635px" }} title="Otoscopy">
      <ReportTable
        Columns={() => (
          <>
            <Cell align="center" width="15%"></Cell>
            {otoscopyQuestions.map(({ title, key }) => (
              <Cell align="center" key={key} width="15%">
                {title}
              </Cell>
            ))}
            <Cell align="center" width="35%"></Cell>
          </>
        )}
      >
        {rows.map(({ title: rowTitle, key }) => (
          <TableRow key={key}>
            <BodyCell verticalAlign={"middle"}>{rowTitle}</BodyCell>
            {otoscopyQuestions.map(({ key: fieldKey, options, direction }) => (
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
                    setFieldValue(`otoscopy.${key}.${fieldKey}`, value)
                  }
                  options={options}
                />
              </BodyCell>
            ))}
            <BodyCell verticalAlign={"middle"}>
              <Input
                fieldsize={{ width: "185px" }}
                placeholder={
                  `${key}` === "leftEar" ? "Left Ear Notes" : "Right Ear Notes"
                }
                value={data[key]["instruction"]}
                onChange={(e) =>
                  setFieldValue(`otoscopy.${key}.instruction`, e.target.value)
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
        onChange={(value) => setFieldValue(`otoscopy.notes`, value)}
      />
    </ReportCard>
  );
};

export default OutoscopyForm;
