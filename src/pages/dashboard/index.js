import React from "react";
import styled from "styled-components/macro";

import { makeStyles } from "@material-ui/core/styles";
import Helmet from "react-helmet";

import {
  Grid,
  IconButton,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Box,
} from "@material-ui/core";

import { MoreVert as MoreVertIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Paper = styled(MuiPaper)(spacing);

const useStyles = makeStyles({
  container: {
    maxHeight: 550,
  },
});

function createData(
  date,
  lastName,
  firstName,
  birthday,
  physician,
  technician,
  headDoctor,
  impression,
  updatedAt,
  clinic,
  user
) {
  return {
    date,
    lastName,
    firstName,
    birthday,
    physician,
    technician,
    headDoctor,
    impression,
    updatedAt,
    clinic,
    user,
  };
}

const rows = [
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
  createData(
    "9/15/19",
    "John",
    "Doe",
    "2/10/67",
    "John Johnson",
    "John Johnson",
    "John Johnson",
    "NORMAL",
    "10/14/19 22:49",
    "Audiology Center of Maine",
    "John"
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "DATE",
  },
  { id: "lastName", numeric: false, disablePadding: false, label: "LAST NAME" },
  {
    id: "firstName",
    numeric: false,
    disablePadding: false,
    label: "FIRST NAME",
  },
  { id: "birthday", numeric: false, disablePadding: false, label: "DOB" },
  {
    id: "physician",
    numeric: false,
    disablePadding: false,
    label: "PHYSICIAN",
  },
  {
    id: "technician",
    numeric: false,
    disablePadding: false,
    label: "TECHNICIAN",
  },
  {
    id: "headDoctor",
    numeric: false,
    disablePadding: false,
    label: "HEAD DOCTOR",
  },
  {
    id: "impression",
    numeric: false,
    disablePadding: false,
    label: "OVERALL IMPRESSION",
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "MODIFIED",
  },
  {
    id: "clinic",
    numeric: false,
    disablePadding: false,
    label: "BY CLINIC",
  },
  {
    id: "user",
    numeric: false,
    disablePadding: false,
    label: "BY USER",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "ACTIONS",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

let EnhancedTableToolbar = (props) => {
  return (
    <Toolbar>
      <div>ToolBar</div>
    </Toolbar>
  );
};

function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar />
        <TableContainer className={classes.container}>
          <Table
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="reports table"
            stickyHeader
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `report-table-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={labelId}
                      selected={isItemSelected}
                    >
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.lastName}</TableCell>
                      <TableCell align="left">{row.firstName}</TableCell>
                      <TableCell align="left">{row.birthday}</TableCell>
                      <TableCell align="left">{row.physician}</TableCell>
                      <TableCell align="left">{row.technician}</TableCell>
                      <TableCell align="left">{row.headDoctor}</TableCell>
                      <TableCell align="left">{row.impression}</TableCell>
                      <TableCell align="left">{row.updatedAt}</TableCell>
                      <TableCell align="left">{row.clinic}</TableCell>
                      <TableCell align="left">{row.user}</TableCell>
                      <TableCell align="left">
                        <IconButton aria-label="actions">
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

const Dashboard = () => {
  return (
    <React.Fragment>
      <Helmet title="Dashboard" />
      <Box mb={6}>
        <Typography variant="h3" gutterBottom display="inline">
          View and manage reports
        </Typography>
      </Box>

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
