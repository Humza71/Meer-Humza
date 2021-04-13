import React from "react";

import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import Toggle from "components/reports/Toggle";
import { TableRow } from "@material-ui/core";
import BodyCell from "components/reports/BodyCell";
import TextArea from "components/reports/TextArea";

const CervicalForm = (props) => {
  const { setFieldValue, values } = props;
  const data = values["cervicalVestibularEvokedMyogenicPotential"];
  const cervicalQuestions = [
    {
      title: "",
      key: "normality",
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
      key: "presence",
      width: "209px",
      direction: "column",
      options: [
        {
          title: "Postive Threshold Search",
          value: "positive",
        },
        {
          title: "Reduced",
          value: "reduced",
        },
      ],
    },
    {
      title: "",
      key: "threshold",
      width: "240px",
      direction: "column",
      options: [],
    },
    {
      title: "",
      key: "presence",
      width: "240px",
      direction: "column",
      options: [
        {
          title: "Enhanced",
          value: "enhanced",
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
      title="Cervical Vestibular Evoked Myogenic Potential (cVEMP)"
    >
      <ReportTable
        headerColor={
          cervicalQuestions.some(({ title }) => title)
            ? "#f8fbff"
            : "transparent"
        }
        Columns={() => (
          <>
            <Cell
              align="center"
              width="20%"
              backgroundColor="transparent"
            ></Cell>
            {cervicalQuestions.map(({ title, key }) => (
              <Cell
                align="left"
                backgroundColor={title ? "#09539e" : "transparent"}
                key={key}
                width="20%"
              >
                {title}
              </Cell>
            ))}
          </>
        )}
      >
        {rows.map(({ title: rowTitle, key }) => (
          <TableRow key={key}>
            <BodyCell verticalAlign={"middle"}>{rowTitle}</BodyCell>
            {cervicalQuestions.map(
              (
                { key: fieldKey, options, direction, width = "84px" },
                index
              ) => (
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
                      setFieldValue(
                        `cervicalVestibularEvokedMyogenicPotential.${key}.${fieldKey}`,
                        value
                      );
                    }}
                    options={options}
                  />
                  {cervicalQuestions.length === index + 1 && (
                    <Toggle
                      direction={"column"}
                      togglesize={{
                        width: width,
                        height: "38px",
                      }}
                      name={`${key}.${"delayed"}`}
                      value={data[key]["delayed"]}
                      onChange={(value) => {
                        setFieldValue(
                          `cervicalVestibularEvokedMyogenicPotential.${key}.delayed`,
                          value
                        );
                      }}
                      options={[
                        {
                          title: "Delayed",
                          value: "delayed",
                        },
                      ]}
                    />
                  )}
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
        onChange={(value) =>
          setFieldValue(
            `cervicalVestibularEvokedMyogenicPotential.notes`,
            value
          )
        }
      />
    </ReportCard>
  );
};

export default CervicalForm;
