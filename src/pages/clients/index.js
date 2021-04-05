import React from "react";
import styled from "styled-components/macro";
import Helmet from "react-helmet";
import {
  Grid as MuiGrid,
  Typography,
  Box,
  Button as MuiButton,
} from "@material-ui/core";
import { Ballot as BallotIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import ClientTable from "./clientTable";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllClinic } from "redux/reducers/clientReducer";

const Button = styled(MuiButton)`
  .MuiButton-root {
    background-color: #09a85b;
  }
  .MuiButton-label {
    color: white;
  }
`;
const useStyles = makeStyles((theme) => ({
  root: {
    background: "#09A85B",
    "&:hover": {
      backgroundColor: "#09A85B",
    },
  },
}));

const Grid = styled(MuiGrid)(spacing);

export const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "COMPANY NAME",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "COMPANY EMAIL",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "COMPANY PHONE",
  },
  {
    id: "license",
    numeric: false,
    disablePadding: false,
    label: "TOTAL LICENSES",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "ACTIONS",
  },
];

// const myData = [
//   createData("Techverx", "Techverx12@gmail.com", "+923033445678", "1"),
//   createData("Nestle", "Techverx22@gmail.com", "+923034543478", "2"),
//   createData("Fruita", "Techverx45@gmail.com", "+923034545645", "3"),
//   createData("Lik", "Techverx56@gmail.com", "+923034545458", "4"),
// ];

const ClientReportHeader = () => {
  const classes = useStyles();
  const history = useHistory();

  const addNewCompany = () => {
    history.push("/clients/company/new");
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
              View and manage Clients
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Button
            className={classes.root}
            onClick={addNewCompany}
            variant="outlined"
            size="medium"
            mr={3}
          >
            Add New Company
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const AdvancedTable = () => {
  const dispatch = useDispatch();
  const allClinics = useSelector((state) => state.clientReducer.allClinics);
  //  const clinic = useSelector((state) => state.clientReducer.clinic);

  React.useEffect(() => {
    dispatch(getAllClinic());
  }, [dispatch]);

  const myData = allClinics.map(
    ({
      email,
      addresses,
      city,
      created_at,
      name,
      phoneNumber,
      state,
      updated_at,
      zipCode,
      noOfLicenses,
      _id,
    }) => ({
      name,
      email,
      phone: phoneNumber,
      license: noOfLicenses,
      id: _id,
    })
  );

  return (
    <Box p={12}>
      <Helmet title="Dashboard" />
      <ClientReportHeader />
      <ClientTable myData={myData} data={myData} columns={headCells} />
    </Box>
  );
};

export default AdvancedTable;
