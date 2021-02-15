import React from "react";

import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import Toggle from "components/reports/Toggle";
import { Box, TableRow } from "@material-ui/core";
import BodyCell from "components/reports/BodyCell";
import TextArea from "components/reports/TextArea";
import Input from "components/reports/Input";

const ElectrophyForm = (props) => {
  const { setFieldValue, values } = props;
  const data = values["eco"];
  const ecoQuestions = [
    {
      title: "",
      key: "normality",
      direction: "row",
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

  const rows = [
    { title: "Right", key: "right" },
    { title: "Left", key: "left" },
  ];

  return (
    <ReportCard
      cardsize={{ width: "915px" }}
      title="Electrocochleography(ECoG)"
    >
      <ReportTable
        Columns={() => (
          <>
            <Cell align="center" width="20%"></Cell>
            {ecoQuestions.map(({ title, key }) => (
              <Cell align="left" key={key} width="20%">
                {title}
              </Cell>
            ))}
            <Cell align="center" width="50%">
              SP/AP Ratio
            </Cell>
          </>
        )}
      >
        {rows.map(({ title: rowTitle, key }) => (
          <TableRow key={key}>
            <BodyCell>{rowTitle}</BodyCell>
            {ecoQuestions.map(({ key: fieldKey, options, direction }) => (
              <BodyCell key={fieldKey}>
                <Toggle
                  direction={direction}
                  togglesize={{
                    width: "84px",
                    height: "38px",
                  }}
                  name={`${key}.${fieldKey}`}
                  value={data[key][fieldKey]}
                  onChange={(value) => {
                    setFieldValue(`eco.${key}.${fieldKey}`, value);
                  }}
                  options={options}
                />
              </BodyCell>
            ))}
            <BodyCell>
              <Box ml={10}>
                <Input
                  fieldsize={{ width: "356px" }}
                  onChange={(value) => setFieldValue(`eco.${key}.notes`, value)}
                />
              </Box>
            </BodyCell>
          </TableRow>
        ))}
      </ReportTable>
      <TextArea
        rowsMin={3}
        placeholder="Notes"
        value={data["notes"]}
        onChange={(value) => setFieldValue(`notes`, value)}
      />
    </ReportCard>
  );
};

export default ElectrophyForm;
