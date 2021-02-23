import React from "react";

import ReportCard from "components/reports/ReportCard";
import { Grid, Box } from "@material-ui/core";

// import ReportTable from "components/reports/Table";
// import Cell from "components/reports/Cell";
import Toggle from "components/reports/Toggle";
// import BodyCell from "components/reports/BodyCell";
import TextArea from "components/reports/TextArea";
// import { TableRow } from "@material-ui/core";

const ScreeningTest = ({ forms, values, setFieldValue }) => {
  return (
    <ReportCard cardsize={{ width: "1168px" }} title="">
      <Grid container>
        {forms.map(({ title, rows, rowOptions, sectionKey }, index) => (
          <Grid item xs={6} key={index}>
            <ReportCard cardsize={{ width: "500px" }} title={title}>
              {rows.map((name, index) => (
                <Grid container key={index}>
                  <Grid item xs={3}>
                    <Box mt={3}>
                      <span>{rowOptions[name].rowTitle}</span>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Toggle
                      direction={"row"}
                      togglesize={{
                        width: "101px",
                        height: "38px",
                      }}
                      name={`${sectionKey}.${rowOptions[name].valueKey}`}
                      value={
                        values[sectionKey][name][rowOptions[name].valueKey]
                      }
                      onChange={(value) =>
                        setFieldValue(
                          `${sectionKey}.${name}.${rowOptions[name].valueKey}`,
                          value
                        )
                      }
                      options={rowOptions[name].options}
                    />
                  </Grid>
                </Grid>
              ))}
              <TextArea
                rowsMin={3}
                placeholder="Notes"
                value={values[sectionKey]["notes"]}
                onChange={(e) =>
                  setFieldValue(`${sectionKey}.notes`, e.target.value)
                }
              />
            </ReportCard>
          </Grid>
        ))}
      </Grid>
    </ReportCard>
  );
};

export default ScreeningTest;
