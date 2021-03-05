import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import Helmet from "react-helmet";
import { useHistory } from "react-router";
import { getAllReports, LoadingStates } from "redux/reducers/dashboardReducer";

import {
  Grid as MuiGrid,
  Typography,
  Box,
  Button as MuiButton,
  CircularProgress,
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
  const allReportLoading = useSelector(
    (state) => state.dashboardReducer.loading
  );
  const allReports = useSelector((state) => state.dashboardReducer.allReports);
  console.log("my reports", allReports);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Dashboard"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(getAllReports());
  }, []);

  // {
  //   date,
  //   lastName,
  //   firstName,
  //   birthday,
  //   physician,
  //   technician,
  //   headDoctor,
  //   impression,
  //   updatedAt,
  //   clinic,
  //   user,
  // };

  const myData = allReports.map(
    ({
      encounterDate,
      lastName,
      firstName,
      dob,
      physician_id,
      technician_id,
      headDoctor,
      impression,
      updatedAt,
      clinic,
      _id,
    }) => ({
      date: encounterDate
        ? new Date(encounterDate).toLocaleDateString("en-US")
        : "",
      lastName,
      firstName,
      birthday: dob ? new Date(dob).toLocaleDateString("en-US") : "",
      physician: physician_id,
      technician: technician_id,
      headDoctor,
      impression,
      updatedAt,
      clinic: "Audiology Center of Maine",
      user: _id,
      _id: _id,
    })
  );

  return (
    <Box p={12}>
      <Helmet title="Dashboard" />
      <ReportHeader />
      {allReportLoading === LoadingStates.ALL_REPORTS_LOADING ? (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress />
        </Box>
      ) : (
        <ReportTable myData={myData} data={myData} columns={headCells} />
      )}
    </Box>
  );
};

export default Reports;
