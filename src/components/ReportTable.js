import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { darken } from "polished";

import { makeStyles } from "@material-ui/core/styles";

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
  Toolbar as MuiToolbar,
  InputBase,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormLabel,
  Button,
} from "@material-ui/core";

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import {
  MoreVert as MoreVertIcon,
  Menu as MenuIcon,
  ViewHeadline as ViewHeadlineIcon,
} from "@material-ui/icons";
import { Search as SearchIcon } from "react-feather";

import { spacing } from "@material-ui/system";

const Paper = styled(MuiPaper)(spacing);

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 500,
    overflow: "auto",
  },
  columnsSelect: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;
  background-color: ${(props) => darken(0.05, props.theme.header.background)};
  ${(props) => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 40px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
  svg {
    width: 15px;
    height: 15px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;
  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)}px;
    padding-right: ${(props) => props.theme.spacing(2.5)}px;
    padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
    padding-left: ${(props) => props.theme.spacing(10)}px;
    width: 280px;
  }
`;
const Toolbar = styled(MuiToolbar)(spacing);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
const filterReports = (
  data,
  searchString,
  filteredClinics,
  columns,
  filteredColumns
) => {
  return data.filter((item) => {
    if (filteredClinics.indexOf(item.clinic) === -1) return false;
    if (!searchString || !searchString.length) return true;

    for (let filteredColumn of filteredColumns) {
      let column = columns.find((i) => i.label === filteredColumn);
      if (
        column &&
        item[column.id].toLowerCase().indexOf(searchString.toLowerCase()) !== -1
      )
        return true;
    }

    return false;
  });
};

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

let TableToolbar = (props) => {
  const {
    data,
    columns,
    rowsPerPage,
    page,
    filteredColumns,
    filteredClinics,
    searchString,
    tableFormat,
    setFilteredColumns,
    setFilteredClinics,
    setSearchString,
    setTableFormat,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;
  const classes = useStyles();

  const handleColumnFilterChange = (event) => {
    setFilteredColumns(event.target.value);
  };

  const handleClinicFilterChange = (event) => {
    setFilteredClinics(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };
  const handleTableFormatChange = (event, newFormat) => {
    setTableFormat(newFormat);
  };

  let initialClinics = [];
  for (let item of data) {
    if (initialClinics.indexOf(item.clinic) === -1) {
      initialClinics.push(item.clinic);
    }
  }

  return (
    <Toolbar p={0} mb={2}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Input
              placeholder="Search for a report"
              value={searchString}
              onChange={handleSearchChange}
            />
          </Search>
        </Grid>

        <Grid item>
          <FormControl variant="filled" className={classes.columnsSelect}>
            <Select
              labelId="columns-filter-label"
              id="columns-filter"
              multiple
              value={filteredColumns}
              onChange={handleColumnFilterChange}
              input={<Input />}
              renderValue={() => "Columns"}
              MenuProps={MenuProps}
            >
              <FormLabel component="legend">SELECT COLUMNS</FormLabel>
              {columns
                .filter((item) => item.id !== "actions")
                .map((column) => (
                  <MenuItem key={column.id} value={column.label}>
                    <Checkbox
                      checked={filteredColumns.indexOf(column.label) > -1}
                    />
                    <ListItemText primary={column.label} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl variant="filled" className={classes.columnsSelect}>
            <Select
              labelId="clinics-filter-label"
              id="clinics-filter"
              multiple
              value={filteredClinics}
              onChange={handleClinicFilterChange}
              input={<Input />}
              renderValue={() => "Clinics"}
              MenuProps={MenuProps}
            >
              <FormLabel component="legend">SELECT CLINICS</FormLabel>
              {initialClinics &&
                initialClinics.map((clinic) => (
                  <MenuItem key={clinic} value={clinic}>
                    <Checkbox checked={filteredClinics.indexOf(clinic) > -1} />
                    <ListItemText primary={clinic} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined">Inspection List</Button>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            size="small"
            value={tableFormat}
            exclusive
            onChange={handleTableFormatChange}
          >
            <ToggleButton value="padding">
              <MenuIcon />
            </ToggleButton>
            <ToggleButton value="noPadding">
              <ViewHeadlineIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

const ReportTableHead = (props) => {
  const { columns, filteredColumns, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map(
          (headCell) =>
            (filteredColumns.indexOf(headCell.label) !== -1 ||
              headCell.id === "actions") && (
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
            )
        )}
      </TableRow>
    </TableHead>
  );
};

const ReportTable = (props) => {
  const { data, columns } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [tableFormat, setTableFormat] = React.useState("padding");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchString, setSearchString] = React.useState("");
  const [filteredColumns, setFilteredColumns] = React.useState(
    columns.filter((item) => item.id !== "actions").map((item) => item.label)
  );
  const [filteredClinics, setFilteredClinics] = React.useState([]);

  useEffect(() => {
    let initialClinics = [];
    for (let item of data) {
      if (initialClinics.indexOf(item.clinic) === -1) {
        initialClinics.push(item.clinic);
      }
    }
    setFilteredClinics(initialClinics);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <Paper>
      <TableToolbar
        data={data}
        columns={columns}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        filteredColumns={filteredColumns}
        filteredClinics={filteredClinics}
        searchString={searchString}
        tableFormat={tableFormat}
        setFilteredColumns={setFilteredColumns}
        setFilteredClinics={setFilteredClinics}
        setSearchString={setSearchString}
        setTableFormat={setTableFormat}
      />
      <TableContainer className={classes.container}>
        <Table
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="reports table"
          stickyHeader
        >
          <ReportTableHead
            columns={columns}
            filteredColumns={filteredColumns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(
              filterReports(
                data,
                searchString,
                filteredClinics,
                columns,
                filteredColumns
              ),
              getComparator(order, orderBy)
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `report-table-${index}`;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={labelId}>
                    {columns.map(
                      (headCell) =>
                        filteredColumns.indexOf(headCell.label) !== -1 &&
                        headCell.id !== "actions" && (
                          <TableCell align="left" key={headCell.id}>
                            {row[headCell.id]}
                          </TableCell>
                        )
                    )}
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
    </Paper>
  );
};

export default ReportTable;
