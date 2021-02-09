import React from "react";
import { gsoTestQuestion } from "./model.js";

import Toggle from "components/reports/Toggle";
import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import TextArea from "components/reports/TextArea";
import TableCell from "@material-ui/core/TableCell";
import styled from "styled-components/macro";
import { Box } from "@material-ui/core";
import Cell from "components/reports/Cell";

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
            gsoTestQuestion.map(({ title }) => (
              <Cell align="center">{title}</Cell>
            ))
          }
        >
          {gsoTestQuestion.map(({ title, key, options }) => (
            <BorderCell key={key}>
              <Box my={4}>
                <img src={`/static/img/reports/postural/${title}.svg`} />
              </Box>
              <Box mb={2.5}>
                <Toggle
                  name={`gsoTest.${key}`}
                  value={values["gsoTest"][key]}
                  onChange={(value) => setFieldValue(`gsoTest.${key}`, value)}
                  options={options}
                />
              </Box>
            </BorderCell>
          ))}
        </ReportTable>
        <TextArea
          value={values["gsoTest"]["notes"]}
          onChange={(value) => setFieldValue(`gsoTest.notes`, value)}
        />
      </>
    </ReportCard>
  );
};

export default GansForm;
