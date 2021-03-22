import React from "react";
import styled from "styled-components/macro";

import { makeStyles } from "@material-ui/core/styles";
import { Box, CircularProgress } from "@material-ui/core";

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
  Button,
  // Popover,
  // Tooltip as MuiTooltip,
  Menu,
  MenuItem,
  Typography as MuiTypography,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import {
  MoreVert as MoreVertIcon,
  Menu as MenuIcon,
  ViewHeadline as ViewHeadlineIcon,
} from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { spacing } from "@material-ui/system";

import SearchInput from "components/SearchInput";
import AdvancedSelect from "components/AdvancedSelect";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPdf, LoadingStates } from "../redux/reducers/dashboardReducer";

const Paper = styled(MuiPaper)(spacing);
const Toolbar = styled(MuiToolbar)(spacing);

const Typography = styled(MuiTypography)`
  margin-left: 10px;
`;
// const myListItemIcon = styled(ListItemIcon)`
//   margin-bottom: 5px;
// `;
// const Tooltip = styled(MuiTooltip)`
//   font-size: 2em;
// `;
// const Popover = styled(MuiPopover)`
//   margin-bottom: 30px;
// `;
// const theme = createMuiTheme({
//   overrides: {
//     MuiTooltip: {
//       tooltip: {
//         fontSize: "2em",
//         color: "yellow",
//         backgroundColor: "red",
//       },
//     },
//   },
// });

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

const SmallAdvancedSelect = styled(AdvancedSelect)`
  height: 36px;
  width: 120px;
`;

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// const filterReports = (
//   data,
//   searchString,
//   filteredClinics,
//   columns,
//   filteredColumns
// ) => {
//   return data.filter((item) => {
//     if (filteredClinics.indexOf(item.clinic) === -1) return false;
//     if (!searchString || !searchString.length) return true;

//     for (let filteredColumn of filteredColumns) {
//       let column = columns.find((i) => i.label === filteredColumn);
//       if (
//         column &&
//         item[column.id].toLowerCase().indexOf(searchString.toLowerCase()) !== -1
//       )
//         return true;
//     }

//     return false;
//   });
// };

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

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

  const getInitialClinics = () => {
    let initialClinics = [];
    for (let item of data) {
      if (initialClinics.indexOf(item.clinic) === -1) {
        initialClinics.push(item.clinic);
      }
    }
    return initialClinics;
  };

  return (
    <Toolbar p={0} mb={2}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <SearchInput
            placeholder="Search for a report"
            value={searchString}
            onChange={handleSearchChange}
            grayBackground={true}
          />
        </Grid>

        <Grid item>
          <SmallAdvancedSelect
            value={filteredColumns}
            onChange={handleColumnFilterChange}
            name="columns"
            label="Columns"
            options={columns
              .filter((item) => item.id !== "actions")
              .map((item) => ({
                label: item.label,
                value: item.label,
              }))}
            variant="outlined"
            renderValue={() => "Columns"}
            multiple
          />
        </Grid>

        <Grid item>
          <SmallAdvancedSelect
            value={filteredClinics}
            onChange={handleClinicFilterChange}
            name="clinics"
            label="Clinics"
            options={getInitialClinics().map((item) => ({
              label: item,
              value: item,
            }))}
            variant="outlined"
            renderValue={() => "Clinics"}
            multiple
            hidelabeltop={true}
          />
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
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [tableFormat, setTableFormat] = React.useState("padding");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchString, setSearchString] = React.useState("");
  const [filteredColumns, setFilteredColumns] = React.useState(
    columns.filter((item) => item.id !== "actions").map((item) => item.label)
  );
  const pdfLoading = useSelector((state) => state.dashboardReducer.loading);

  const history = useHistory();
  const getInitialClinics = () => {
    let initialClinics = [];
    for (let item of data) {
      if (initialClinics.indexOf(item.clinic) === -1) {
        initialClinics.push(item.clinic);
      }
    }
    return initialClinics;
  };
  const [filteredClinics, setFilteredClinics] = React.useState(
    getInitialClinics()
  );

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

  const downloadPdf = (reportId) => {
    dispatch(getPdf(reportId));
  };

  const movetoCreate = (id) => {
    history.push(`/report/create/${id}`);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  const Actions = ({ id }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const [downloading, setDownloading] = React.useState(false);
    // React.useEffect(() => {
    //   debugger;
    // }, [downloading]);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <MoreVertIcon onClick={handleClick} />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>
            <Typography color="primary" variant="inherit">
              ACTIONS
            </Typography>
          </MenuItem>

          <MenuItem onClick={() => movetoCreate(id)}>
            <EditIcon color="primary" />

            <Typography variant="inherit">Edit</Typography>
          </MenuItem>
          <MenuItem>
            <SaveAltIcon color="primary" />
            <Typography
              onClick={() => {
                setAnchorEl(true);
                downloadPdf(id, () => {});
              }}
              variant="inherit"
            >
              Download
            </Typography>
          </MenuItem>
          <MenuItem>
            <DeleteIcon color="primary" />

            <Typography variant="inherit">Delete</Typography>
          </MenuItem>
        </Menu>
      </>
    );
  };

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
          />{" "}
          {pdfLoading === LoadingStates.PDF_LOADING ? (
            <Box display="flex" justifyContent="center" my={6}>
              <CircularProgress size="1rem" />
            </Box>
          ) : (
            <TableBody>
              {data.map((row, index) => {
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
                        <Actions id={row._id} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}

              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ReportTable;
