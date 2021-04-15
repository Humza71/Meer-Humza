import React from "react";

import ReportCard from "components/reports/ReportCard";
import ReportTable from "components/reports/Table";
import Cell from "components/reports/Cell";
import Toggle from "components/reports/Toggle";
import { Box, CircularProgress, TableRow } from "@material-ui/core";
import BodyCell from "components/reports/BodyCell";
import TextArea from "components/reports/TextArea";
import { useSelector } from "react-redux";
import { LoadingStates } from "redux/reducers/reportReducer";

const VhitForm = (props) => {
  const { setFieldValue, isSubmitting, values } = props;
  const reportLoading = useSelector((state) => state.reportReducer.loading);
  const vhitQuestions = [
    {
      title: "",
      key: "normality",
      direction: "column",
      options: [
        {
          title: "Normal",
          value: "normal",
        },
        {
          title: "Abnormal",
          value: "abnormal",
        },
      ],
    },
    {
      title: "Saccades",
      key: "saccades",
      direction: "row",
      options: [
        {
          title: "Right",
          value: "right",
        },
        {
          title: "Left",
          value: "left",
        },
      ],
    },
    {
      title: "Reduce Gain",
      key: "reduceGain",
      direction: "row",
      options: [
        {
          title: "Right",
          value: "right",
        },
        {
          title: "Left",
          value: "left",
        },
      ],
    },
  ];

  const rows = [
    { title: "Lateral", key: "lateral" },
    { title: "RALP", key: "ralp" },
    { title: "LARP", key: "larp" },
  ];

  return isSubmitting ||
    reportLoading === LoadingStates.REPORT_CREATION_LOADING ? (
    <Box display="flex" justifyContent="center" my={6}>
      <CircularProgress />
    </Box>
  ) : (
    <ReportCard cardsize={{ width: "680px" }} title="Video Head Impulse Test">
      <ReportTable
        Columns={() => (
          <>
            <Cell align="center"></Cell>
            {vhitQuestions.map(({ title, key }) => (
              <Cell
                align="center"
                width={key !== "normality" && "32%"}
                key={key}
              >
                {title}
              </Cell>
            ))}
          </>
        )}
      >
        {rows.map(({ title: rowTitle, key }) => (
          <TableRow key={key}>
            <BodyCell verticalAlign={"middle"}>{rowTitle}</BodyCell>
            {vhitQuestions.map(({ key: fieldKey, options, direction }) => (
              <BodyCell verticalAlign={"middle"} key={fieldKey}>
                <Toggle
                  exclusive={
                    fieldKey === "saccades" || fieldKey === "reduceGain"
                      ? false
                      : true
                  }
                  direction={direction}
                  togglesize={{
                    width: "84px",
                    height: "38px",
                  }}
                  name={`${key}.${fieldKey}`}
                  value={values[key][fieldKey]}
                  onChange={(value) =>
                    setFieldValue(`${key}.${fieldKey}`, value)
                  }
                  options={options}
                />
              </BodyCell>
            ))}
          </TableRow>
        ))}
      </ReportTable>
      <TextArea
        rowsMin={3}
        placeholder="Notes"
        value={values["notes"]}
        onChange={(value) => setFieldValue(`notes`, value)}
      />
    </ReportCard>
  );
};

export default VhitForm;
