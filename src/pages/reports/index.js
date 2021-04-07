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
import { headCells } from "lib/dumyData";

const Button = styled(MuiButton)`
  margin-right: 20px;
`;
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
          <Button variant="outlined" size="medium" color="secondary">
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle("Dashboard"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(getAllReports());
  }, [dispatch]);

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
      created_at,
      userName,
      encounterDate,
      lastName,
      firstName,
      staffInformation,
      impression,
      clinic,
      updated_at,
      _id,
      dateOfBirth,
      status,
    }) => ({
      date: created_at ? new Date(created_at).toLocaleDateString("en-US") : "",
      lastName,
      firstName,
      birthday: dateOfBirth
        ? new Date(dateOfBirth).toLocaleDateString("en-US")
        : "",
      physician: staffInformation.providerName,
      technician: staffInformation.technicianName,
      impression,
      updatedAt: updated_at
        ? new Date(updated_at).toLocaleDateString("en-US")
        : new Date(created_at).toLocaleDateString("en-US"),
      clinic: "Audiology Center of Maine",
      user: userName,
      _id: _id,
      status: status === "generated" ? "Generated" : "Draft",
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
