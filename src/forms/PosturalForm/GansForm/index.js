import React from "react";
import { gsPerformanceTest } from "./model.js";

import Toggle from "components/reports/Toggle";
import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import TextArea from "components/reports/TextArea";
import TableCell from "@material-ui/core/TableCell";
import styled from "styled-components/macro";
import { Box } from "@material-ui/core";
import Cell from "components/reports/Cell";
import TableRow from "@material-ui/core/TableRow";

const BodyCell = styled(TableCell)`
  text-align: center;
  padding: 5px;
  vertical-align: baseline;
`;

const BorderCell = styled(BodyCell)`
  border-right: 1px solid #dadce0;
`;

const GansForm = ({ values, setFieldValue }) => {
  return (
    <ReportCard title="Gans Sensory Organization Performance Test ©">
      <>
        <ReportTable
          Columns={() =>
            gsPerformanceTest.map(({ title }, index) => (
              <Cell align="center" key={index}>
                {title}
              </Cell>
            ))
          }
        >
          <TableRow>
            {gsPerformanceTest.map(({ title, key, options }) => (
              <BorderCell key={key}>
                <Box my={4}>
                  <img
                    src={`/static/img/reports/postural/${title}.svg`}
                    alt="img"
                  />
                </Box>
                <Box mb={2.5}>
                  <Toggle
                    name={`gsPerformanceTest.${key}`}
                    value={values["gsPerformanceTest"][key]}
                    onChange={(value) =>
                      setFieldValue(`gsPerformanceTest.${key}`, value)
                    }
                    options={options}
                  />
                </Box>
              </BorderCell>
            ))}
          </TableRow>
        </ReportTable>
        <TextArea
          value={values["gsPerformanceTest"]["notes"]}
          onChange={(value) => setFieldValue(`gsPerformanceTest.notes`, value)}
        />
      </>
    </ReportCard>
  );
};

export default GansForm;
