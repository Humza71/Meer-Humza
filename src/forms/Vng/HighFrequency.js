import React from "react";
import TableRow from "@material-ui/core/TableRow";
import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import Toggle from "components/reports/Toggle";
import BodyCell from "components/reports/BodyCell";
import Input from "components/reports/Input";
import TextArea from "components/reports/TextArea";

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
      title: "Lateral Right",
      parentKey: `${formKey}.lateralRight`,
      key: "lateralRight",
    },
    {
      title: "Lateral Left",
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
                    ]}
                  />
                </Box>
              </BodyCell>
              <BodyCell>
                <Box mb={2.5} mt={2.5}>
                  <Input
                    value={data[key]["deg"]}
                    onChange={(e) =>
                      setFieldValue(`${formKey}.${key}.deg`, e.target.value)
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
