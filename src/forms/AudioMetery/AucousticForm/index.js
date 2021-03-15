import React from "react";

import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import Toggle from "components/reports/Toggle";
import BodyCell from "components/reports/BodyCell";
import TextArea from "components/reports/TextArea";
import { TableRow } from "@material-ui/core";

const AucousticForm = (props) => {
  const { setFieldValue, values } = props;
  const data = values["acousticImmittance"];
  const aucousticQuestions = [
    {
      title: "Tympanogram",
      key: "tympanogram",
      direction: "column",
      options: [
        {
          title: "Type A",
          value: "typeA",
        },
        {
          title: "Type As",
          value: "typeAs",
        },
        {
          title: "Type Ad",
          value: "typeAd",
        },
        {
          title: "Type B",
          value: "typeB",
        },
        {
          title: "Type C",
          value: "typeC",
        },
      ],
    },
    {
      title: "Ispi.Reflexes",
      key: "ispi",
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
    {
      title: "Contra.Reflexes",
      key: "contraFlex",
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
    {
      title: "Reflex Decay",
      key: "reflex",
      direction: "column",
      options: [
        {
          title: "Negative",
          value: "negative",
        },
        {
          title: "Positive",
          value: "positive",
        },
      ],
    },
  ];

  const rows = [
    { title: "Right Ear", key: "rightEar" },
    { title: "Left Ear", key: "leftEar" },
  ];

  return (
    <ReportCard cardsize={{ width: "635px" }} title="Acoustic Immittance">
      <ReportTable
        Columns={() => (
          <>
            <Cell align="center" width="15%"></Cell>
            {aucousticQuestions.map(({ title, key }) => (
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
            {aucousticQuestions.map(({ key: fieldKey, options, direction }) => (
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
                    setFieldValue(
                      `acousticImmittance.${key}.${fieldKey}`,
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
        onChange={(value) => setFieldValue(`acousticImmittance.notes`, value)}
      />
    </ReportCard>
  );
};

export default AucousticForm;
