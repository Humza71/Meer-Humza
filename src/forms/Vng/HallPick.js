import React from "react";

import TableRow from "@material-ui/core/TableRow";
import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import BodyCell from "components/reports/BodyCell";
import Toggle from "components/reports/Toggle";
import TextArea from "components/reports/TextArea";
import NumberPopUp from "components/reports/NumberPopUp";

import { Box } from "@material-ui/core";

const HallPick = ({ formTitle, formKey, setFieldValue, values }) => {
  const data = values[formKey];

  const sections = [
    {
      title: "Right",
      key: "right",
      parentKey: `${formKey}.right`,
    },
    {
      title: "Left",
      parentKey: `${formKey}.left`,
      key: "left",
    },
  ];

  return (
    <ReportCard title={formTitle}>
      <>
        <ReportTable
          Columns={() => (
            <>
              <Cell align="center" />
              <Cell align="center" />
              <Cell align="center">Vertigo</Cell>
              <Cell align="center" width="110%">
                Beat Direction
              </Cell>
              <Cell align="center"> DEG./SEC</Cell>
            </>
          )}
        >
          {sections.map(({ title, parentKey, key }) => (
            <TableRow key={key}>
              <BodyCell verticalAlign={"middle"}>{title}</BodyCell>
              <BodyCell>
                <Box mb={2.5} mt={2.5}>
                  <Toggle
                    name={`${formKey}.${key}`}
                    value={data[key]["index"]}
                    onChange={(value) =>
                      setFieldValue(`${formKey}.${key}.index`, value)
                    }
                    options={[
                      { title: "Negative", value: "negative" },
                      { title: "Positive", value: "positive" },
                    ]}
                  />
                </Box>
              </BodyCell>
              <BodyCell>
                <Box mb={2.5} mt={2.5}>
                  <Toggle
                    name={`${formKey}.${key}`}
                    value={data[key]["vertigo"]}
                    onChange={(value) =>
                      setFieldValue(`${formKey}.${key}.vertigo`, value)
                    }
                    options={[
                      { title: "Yes", value: "yes" },
                      { title: "No", value: "no" },
                    ]}
                  />
                </Box>
              </BodyCell>
              <BodyCell verticalAlign={"middle"}>
                <Box mb={2.5} mt={2.5}>
                  <Toggle
                    exclusive={false}
                    togglesize={{
                      width: "110px",
                      height: "59px",
                    }}
                    direction={"row"}
                    name={`${formKey}.${key}`}
                    value={data[key]["beatDirection"]}
                    onChange={(value) =>
                      setFieldValue(`${formKey}.${key}.beatDirection`, value)
                    }
                    options={[
                      { title: "Up & Right Torsion", value: "ur" },
                      { title: "Up & Left Torsion", value: "ul" },
                      { title: "Down & Right Torsion", value: "dr" },
                      { title: "Down & Left Torsion", value: "dl" },
                    ]}
                  />
                </Box>
              </BodyCell>
              <BodyCell verticalAlign={"middle"}>
                <Box mb={2.5} mt={2.5}>
                  <NumberPopUp
                    value={data[key]["deg"]}
                    onChange={(value) =>
                      setFieldValue(`${formKey}.${key}.deg`, value)
                    }
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
          onChange={(value) => setFieldValue(`${formKey}.notes`, value)}
        />
      </>
    </ReportCard>
  );
};

export default HallPick;
