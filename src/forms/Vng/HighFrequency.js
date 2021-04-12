import React from "react";
import TableRow from "@material-ui/core/TableRow";
import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import Toggle from "components/reports/Toggle";
import BodyCell from "components/reports/BodyCell";
import TextArea from "components/reports/TextArea";
import NumberPopUp from "components/reports/NumberPopUp";

import { Box } from "@material-ui/core";

const HighFrequency = ({ formTitle, formKey, setFieldValue, values }) => {
  const data = values[formKey];
  const sections = [
    {
      title: "Seated",
      key: "seated",
      parentKey: `${formKey}.seated`,
    },
    {
      title: "Lateral Body Right",
      parentKey: `${formKey}.lateralRight`,
      key: "lateralRight",
    },
    {
      title: "Lateral Body Left",
      parentKey: `${formKey}.lateralLeft`,
      key: "lateralLeft",
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
              <Cell align="center" width="18%">
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
                    value={data[key]["normality"]}
                    onChange={(value) => {
                      setFieldValue(`${formKey}.${key}.normality`, value);
                    }}
                    options={[
                      { title: "Normal", value: "normal" },
                      { title: "Abnormal", value: "abnormal" },
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
                    direction={"row"}
                    togglesize={{
                      width: "51px",
                      height: "38px",
                    }}
                    name={`${formKey}.${key}`}
                    value={data[key]["beatDirection"]}
                    onChange={(value) =>
                      setFieldValue(`${formKey}.${key}.beatDirection`, value)
                    }
                    options={[
                      { title: "R", value: "r" },
                      { title: "L", value: "l" },
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

export default HighFrequency;
