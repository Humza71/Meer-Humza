import React from "react";

import TableRow from "@material-ui/core/TableRow";
import { Checkbox as MuiCheckBox } from "@material-ui/core";

import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import BodyCell from "components/reports/BodyCell";
import Toggle from "components/reports/Toggle";
import TextArea from "components/reports/TextArea";
import NumberPopUp from "components/reports/NumberPopUp";
import styled from "styled-components/macro";
import { Box } from "@material-ui/core";

export const Checkbox = styled(MuiCheckBox)`
  transform: scale(1.5);
`;

const Calorics = ({ formTitle, formKey, setFieldValue, values }) => {
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
              <Cell align="center">WARM</Cell>
              <Cell align="center">COOL</Cell>
              <Cell align="center">VERTIGO</Cell>
              <Cell align="center"></Cell>
              <Cell align="center">FIXATION INDEX</Cell>
              <Cell align="center">BILATERAL WEAKNESS</Cell>
            </>
          )}
        >
          {sections.map(({ title, parentKey, key }) => (
            <TableRow key={key}>
              <BodyCell>{title}</BodyCell>
              <BodyCell>
                <Box mb={2.5} mt={2.5}>
                  <NumberPopUp
                    value={data[key]["warm"]}
                    onChange={(value) =>
                      setFieldValue(`${formKey}.${key}.warm`, value)
                    }
                  />
                </Box>
              </BodyCell>
              <BodyCell>
                <Box mb={2.5} mt={2.5}>
                  <NumberPopUp
                    value={data[key]["cool"]}
                    onChange={(value) =>
                      setFieldValue(`${formKey}.${key}.cool`, value)
                    }
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
                    name={`${formKey}.${key}`}
                    value={data[key]}
                    onChange={(value) =>
                      setFieldValue(`${formKey}.${key}`, value)
                    }
                    options={[
                      { title: "UW", value: "uw" },
                      { title: "DP", value: "dp" },
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
                    mb={2.5}
                    mt={2.5}
                    options={[
                      { title: "Negative", value: "negative" },
                      { title: "Positive", value: "positive" },
                    ]}
                  />
                </Box>
              </BodyCell>
              {title === "Right" && (
                <BodyCell style={{}}>
                  <Box pt={5}>
                    <Checkbox
                      checked={data["bilateralWeakness"]}
                      inputProps={{
                        "aria-label": "checked",
                      }}
                      onChange={(e) => {
                        setFieldValue(
                          `${formKey}.bilateralWeakness`,
                          e.target.checked
                        );
                      }}
                    />
                  </Box>
                </BodyCell>
              )}
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

export default Calorics;
