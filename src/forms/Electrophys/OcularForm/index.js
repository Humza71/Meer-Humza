import React from "react";

import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import Toggle from "components/reports/Toggle";
import { TableRow } from "@material-ui/core";
import BodyCell from "components/reports/BodyCell";
import TextArea from "components/reports/TextArea";

const OcularForm = (props) => {
  const { setFieldValue, values } = props;
  const data = values["ovemp"];
  const cervicalQuestions = [
    {
      title: "",
      key: "negPositive",
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
      title: "",
      key: "presence",
      width: "209px",
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
      title: "",
      key: "trend",
      width: "240px",
      direction: "column",
      options: [
        {
          title: "Enhanced",
          value: "enhanced",
        },
        {
          title: "Delayed",
          value: "delayed",
        },
        {
          title: "Reduced",
          value: "reduced",
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
      title="Ocular Vestibular Evoked Myogenic Potential (oVEMP)"
    >
      <ReportTable
        Columns={() => (
          <>
            <Cell align="center" width="20%"></Cell>
            {cervicalQuestions.map(({ title, key }) => (
              <Cell align="left" key={key} width="20%">
                {title}
              </Cell>
            ))}
          </>
        )}
      >
        {rows.map(({ title: rowTitle, key }) => (
          <TableRow key={key}>
            <BodyCell>{rowTitle}</BodyCell>
            {cervicalQuestions.map(
              ({ key: fieldKey, options, direction, width = "84px" }) => (
                <BodyCell key={fieldKey}>
                  <Toggle
                    direction={direction}
                    togglesize={{
                      width: width,
                      height: "38px",
                    }}
                    name={`${key}.${fieldKey}`}
                    value={data[key][fieldKey]}
                    onChange={(value) => {
                      setFieldValue(`ovemp.${key}.${fieldKey}`, value);
                    }}
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
        onChange={(value) => setFieldValue(`ovemp.notes`, value)}
      />
    </ReportCard>
  );
};

export default OcularForm;
