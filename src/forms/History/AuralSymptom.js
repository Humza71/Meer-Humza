import React from "react";

import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import TextArea from "components/reports/TextArea";
import Toggle from "components/reports/Toggle";

import { Divider, Box, CircularProgress, TableRow } from "@material-ui/core";
import BodyCell from "components/reports/BodyCell";

const AuralSymptom = (props) => {
  const { setFieldValue, isSubmitting, values } = props;

  const options = [
    {
      title: "Bilateral",
      value: "bilateral",
    },
    {
      title: "Right Ear",
      value: "rightEar",
    },
    {
      title: "Left Ear",
      value: "leftEar",
    },
  ];

  return isSubmitting ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
    <ReportCard cardsize={{ width: "850px" }} title="Aural Symptoms">
      <Box mb={2.5}></Box>
      <Divider />
      <ReportTable
        Columns={() => (
          <>
            <Cell align="center">Sudden Hearing Loss</Cell>
            <Cell align="center">Aural Pressure/Fullness</Cell>
            <Cell align="center">Otorrhea</Cell>
            <Cell align="center">Tinnitus</Cell>
            <Cell align="center">Otalgia</Cell>
          </>
        )}
      >
        <TableRow>
          <BodyCell>
            <Toggle
              togglesize={{
                width: "148px",
                height: "38px",
              }}
              name={`auralSymptom.shl`}
              value={values["auralSymptom"]["shl"]}
              onChange={(value) => setFieldValue(`auralSymptom.shl`, value)}
              options={options}
            />
          </BodyCell>
          <BodyCell>
            <Toggle
              togglesize={{
                width: "148px",
                height: "38px",
              }}
              name={`auralSymptom.ap`}
              value={values["auralSymptom"]["ap"]}
              onChange={(value) => setFieldValue(`auralSymptom.ap`, value)}
              options={options}
            />
          </BodyCell>
          <BodyCell>
            <Toggle
              togglesize={{
                width: "148px",
                height: "38px",
              }}
              name={`auralSymptom.otorrhea`}
              value={values["auralSymptom"]["otorrhea"]}
              onChange={(value) =>
                setFieldValue(`auralSymptom.otorrhea`, value)
              }
              options={options}
            />
          </BodyCell>
          <BodyCell>
            <Toggle
              togglesize={{
                width: "148px",
                height: "38px",
              }}
              name={`auralSymptom.tinnitus`}
              value={values["auralSymptom"]["tinnitus"]}
              onChange={(value) =>
                setFieldValue(`auralSymptom.tinnitus`, value)
              }
              options={options}
            />
          </BodyCell>
          <BodyCell>
            <Toggle
              togglesize={{
                width: "148px",
                height: "38px",
              }}
              name={`auralSymptom.otalgia`}
              value={values["auralSymptom"]["otalgia"]}
              onChange={(value) => setFieldValue(`auralSymptom.otalgia`, value)}
              options={options}
            />
          </BodyCell>
        </TableRow>
      </ReportTable>
      <TextArea
        rowsMin={3}
        placeholder="Notes"
        value={values["auralSymptom"]["notes"]}
        onChange={(value) => setFieldValue(`auralSymptom.notes`, value)}
      />
    </ReportCard>
  );
};

export default AuralSymptom;
