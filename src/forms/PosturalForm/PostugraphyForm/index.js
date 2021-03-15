import React from "react";
import {
  computerizedDynamicPosturographyTestQuestions,
  motorControlTestQuestions,
  adaptationTest,
} from "./model.js";

import Toggle from "components/reports/Toggle";
import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import TextArea from "components/reports/TextArea";
import Cell from "components/reports/Cell";
import BodyCell from "components/reports/BodyCell";
import TableRow from "@material-ui/core/TableRow";

import { Box, CardContent } from "@material-ui/core";

const PostugraphyForm = ({ values, setFieldValue }) => {
  return (
    <ReportCard title="Computerized Dynamic Posturography">
      <CardContent>
        <ReportTable
          Columns={() => (
            <>
              {computerizedDynamicPosturographyTestQuestions.map(
                ({ title = "", key }, index) =>
                  title ? (
                    <Cell align="center" key={index}>
                      {title}
                    </Cell>
                  ) : (
                    <Cell align="center" width="22%" key={index}>
                      {title}
                    </Cell>
                  )
              )}
            </>
          )}
        >
          <TableRow>
            {computerizedDynamicPosturographyTestQuestions.map(
              ({ title, options, key }, index) =>
                options.length === 0 ? (
                  <BodyCell key={key}>{title}</BodyCell>
                ) : (
                  <BodyCell key={key}>
                    <Box mb={2.5} mt={2.5}>
                      <Toggle
                        name={`computerizedDynamicPosturography.sensoryOrganizationTest.${key}`}
                        value={
                          values["computerizedDynamicPosturography"][
                            "sensoryOrganizationTest"
                          ][key]
                        }
                        onChange={(value) =>
                          setFieldValue(
                            `computerizedDynamicPosturography.sensoryOrganizationTest.${key}`,
                            value
                          )
                        }
                        options={options}
                      />
                    </Box>
                  </BodyCell>
                )
            )}
          </TableRow>
        </ReportTable>
        <ReportTable
          Columns={() => (
            <>
              {motorControlTestQuestions.map(({ title, key }) =>
                title ? (
                  <Cell align="center" width="35%" key={key}>
                    {title}
                  </Cell>
                ) : (
                  <Cell align="left" width="22%" key={key}></Cell>
                )
              )}
            </>
          )}
        >
          <TableRow>
            {motorControlTestQuestions.map(({ title, options, key }, index) =>
              options.length === 0 ? (
                <BodyCell key={index}>{title}</BodyCell>
              ) : (
                <BodyCell key={index}>
                  <Box mb={2.5} mt={2.5}>
                    <Toggle
                      name={`computerizedDynamicPosturography.motorControlTest.${key}`}
                      value={
                        values["computerizedDynamicPosturography"][
                          "motorControlTest"
                        ][key]
                      }
                      onChange={(value) =>
                        setFieldValue(
                          `computerizedDynamicPosturography.motorControlTest.${key}`,
                          value
                        )
                      }
                      options={options}
                    />
                  </Box>
                </BodyCell>
              )
            )}
          </TableRow>
        </ReportTable>
      </CardContent>

      <CardContent>
        <ReportTable
          Columns={() => (
            <>
              {adaptationTest.map(({ title, key }) =>
                title ? (
                  <Cell align="center" width="35%" key={key}>
                    {title}
                  </Cell>
                ) : (
                  <Cell align="left" width="22%" key={key}></Cell>
                )
              )}
            </>
          )}
        >
          <TableRow>
            {adaptationTest.map(({ title, options, key }, index) =>
              options.length === 0 ? (
                <BodyCell key={key}>{title}</BodyCell>
              ) : (
                <BodyCell key={key}>
                  <Box mb={2.5} mt={2.5}>
                    <Toggle
                      name={`computerizedDynamicPosturography.adaptationTest.${key}`}
                      value={
                        values["computerizedDynamicPosturography"][
                          "adaptationTest"
                        ][key]
                      }
                      onChange={(value) =>
                        setFieldValue(
                          `computerizedDynamicPosturography.adaptationTest.${key}`,
                          value
                        )
                      }
                      options={options}
                    />
                  </Box>
                </BodyCell>
              )
            )}
          </TableRow>
        </ReportTable>
        <TextArea
          value={values["computerizedDynamicPosturography"]["notes"]}
          onChange={(value) =>
            setFieldValue(`computerizedDynamicPosturography.notes`, value)
          }
        />
      </CardContent>
    </ReportCard>
  );
};

export default PostugraphyForm;
