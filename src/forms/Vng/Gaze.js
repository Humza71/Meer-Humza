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

const Gaze = ({ formTitle, formKey, setFieldValue, values }) => {
  const data = values[formKey];
  const sections = [
    {
      title: "Center",
      key: "center",
      parentKey: `${formKey}.center`,
    },
    {
      title: "Right",
      parentKey: `${formKey}.right`,
      key: "right",
    },
    {
      title: "Left",
      parentKey: `${formKey}.left`,
      key: "left",
    },
    {
      title: "Up",
      parentKey: `${formKey}.up`,
      key: "up",
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
              <Cell align="center">Beat Direction</Cell>
              <Cell align="center"> DEG./SEC</Cell>
            </>
          )}
        >
          {sections.map(({ title, parentKey, key }) => (
            <TableRow key={key}>
              <BodyCell>{title}</BodyCell>
              <BodyCell>
                <Box mb={2.5} mt={2.5}>
                  <Toggle
                    name={`${formKey}.${key}`}
                    value={data[key]}
                    onChange={(value) =>
                      setFieldValue(`${formKey}.${key}`, value)
                    }
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
                    value={data[key]}
                    onChange={(value) =>
                      setFieldValue(`${formKey}.${key}`, value)
                    }
                    options={[
                      { title: "Yes", value: "yes" },
                      { title: "No", value: "no" },
                    ]}
                  />
                </Box>
              </BodyCell>
              <BodyCell>
                <Box mb={2.5} mt={2.5}>
                  <Toggle
                    direction={"row"}
                    togglesize={{
                      width: "51px",
                      height: "38px",
                    }}
                    name={`${formKey}.${key}`}
                    value={data[key]}
                    onChange={(value) =>
                      setFieldValue(`${formKey}.${key}`, value)
                    }
                    options={[
                      { title: "R", value: "r" },
                      { title: "L", value: "l" },
                      { title: "U", value: "u" },
                      { title: "D", value: "d" },
                    ]}
                  />
                </Box>
              </BodyCell>
              <BodyCell>
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

export default Gaze;
