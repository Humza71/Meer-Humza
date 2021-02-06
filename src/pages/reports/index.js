import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
import Helmet from "react-helmet";
import { useHistory } from "react-router";

import {
  Grid as MuiGrid,
  Typography,
  Box,
  Button as MuiButton,
} from "@material-ui/core";
import { Ballot as BallotIcon } from "@material-ui/icons";
import { spacing } from "@material-ui/system";

import ButtonDropDown from "components/ButtonDropDown";
import ReportTable from "components/ReportTable";

import { setHeaderTitle } from "redux/reducers/uiReducer";
import { rows, headCells } from "lib/dumyData";

const Button = styled(MuiButton)(spacing);
const Grid = styled(MuiGrid)(spacing);

const ReportHeader = () => {
  const history = useHistory();
  const optionsForNewReportDropDown = ["Upload file"];

  const onNewReport = () => {
    history.push("/report/create");
    console.log("On New Report");
  };
  const handleMenuItemClick = (event, index) => {
    console.log("Clicked: ", optionsForNewReportDropDown[index]);
  };
  return (
    <React.Fragment>
      <Grid container justify="space-between" alignItems="center" mb={5}>
        <Grid item>
          <Box alignItems="center" display="flex" justifyContent="start">
            <Box mr={1} color="#444444">
              <BallotIcon />
            </Box>
            <Typography variant="h4" gutterBottom display="inline">
              View and manage reports
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Button variant="outlined" size="medium" color="secondary" mr={3}>
            Reporting View
          </Button>
          <ButtonDropDown
            variant="contained"
            size="medium"
            color="secondary"
            mainText="New Report"
            options={optionsForNewReportDropDown}
            handleMainClick={onNewReport}
            handleMenuItemClick={handleMenuItemClick}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Reports = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Dashboard"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box p={12}>
      <Helmet title="Dashboard" />
      <ReportHeader />
      <ReportTable data={rows} columns={headCells} />
    </Box>
  );
};

export default Reports;
