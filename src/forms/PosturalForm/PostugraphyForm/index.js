import React from "react";
import { cdpTestQuestions, mcTestQuestions, adTest } from "./model.js";

import Toggle from "components/reports/Toggle";
import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import TextArea from "components/reports/TextArea";
import Cell from "components/reports/Cell";
import BodyCell from "components/reports/BodyCell";

import { Box, Card as MuiCard, CardContent } from "@material-ui/core";

const PostugraphyForm = ({ values, setFieldValue }) => {
  return (
    <ReportCard title="Computerized Dynamic Posturography">
      <CardContent>
        <ReportTable
          Columns={() => (
            <>
              {cdpTestQuestions.map(({ title = "", key }) =>
                title ? (
                  <Cell align="center" key={key}>
                    {title}
                  </Cell>
                ) : (
                  <Cell align="center" width="22%" key={key}>
                    {title}
                  </Cell>
                )
              )}
            </>
          )}
        >
          {cdpTestQuestions.map(({ title, options, key }) => (
            <>
              {options.length === 0 ? (
                <BodyCell key={key}>{title}</BodyCell>
              ) : (
                <BodyCell key={key}>
                  <Box mb={2.5} mt={2.5}>
                    <Toggle
                      name={`cdpTest.soTest.${key}`}
                      value={values["cdpTest"]["soTest"][key]}
                      onChange={(value) =>
                        setFieldValue(`cdpTest.soTest.${key}`, value)
                      }
                      options={options}
                    />
                  </Box>
                </BodyCell>
              )}
            </>
          ))}
        </ReportTable>
        <ReportTable
          Columns={() => (
            <>
              {mcTestQuestions.map(({ title, key }) =>
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
          {mcTestQuestions.map(({ title, options, key }) => (
            <>
              {options.length === 0 ? (
                <BodyCell>{title}</BodyCell>
              ) : (
                <BodyCell>
                  <Box mb={2.5} mt={2.5}>
                    <Toggle
                      name={`cdpTest.mcTest.${key}`}
                      value={values["cdpTest"]["mcTest"][key]}
                      onChange={(value) =>
                        setFieldValue(`cdpTest.mcTest.${key}`, value)
                      }
                      options={options}
                    />
                  </Box>
                </BodyCell>
              )}
            </>
          ))}
        </ReportTable>
      </CardContent>

      <CardContent>
        <ReportTable
          Columns={() => (
            <>
              {adTest.map(({ title, key }) =>
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
          {adTest.map(({ title, options, key }) => (
            <>
              {options.length === 0 ? (
                <BodyCell key={key}>{title}</BodyCell>
              ) : (
                <BodyCell key={key}>
                  <Box mb={2.5} mt={2.5}>
                    <Toggle
                      name={`cdpTest.adTest.${key}`}
                      value={values["cdpTest"]["adTest"][key]}
                      onChange={(value) =>
                        setFieldValue(`cdpTest.adTest.${key}`, value)
                      }
                      options={options}
                    />
                  </Box>
                </BodyCell>
              )}
            </>
          ))}
        </ReportTable>
        <TextArea
          value={values["cdpTest"]["notes"]}
          onChange={(value) => setFieldValue(`cdpTest.notes`, value)}
        />
      </CardContent>
    </ReportCard>
  );
};

export default PostugraphyForm;
