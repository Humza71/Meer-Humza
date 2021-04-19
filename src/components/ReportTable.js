import React from "react";
import styled from "styled-components/macro";

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  CircularProgress,
  InputAdornment,
  Modal,
} from "@material-ui/core";
import { User as UserIcon } from "react-feather";

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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  ToggleButton,
  ToggleButtonGroup,
  // Alert,
  // AlertTitle,
} from "@material-ui/lab";
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
import {
  getPdf,
  LoadingStates,
  deleteReportById,
} from "../redux/reducers/dashboardReducer";

const Paper = styled(MuiPaper)(spacing);
const Toolbar = styled(MuiToolbar)(spacing);

const Typography = styled(MuiTypography)`
  margin-left: 10px;
`;

// const smallTypography = styled(MuiTypography)`
//   margin-left: 10px;
// `;

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
  root: {
    marginBottom: "20px",
  },
  item: {
    width: `40%`,
  },
  body: {
    width: "35px",
    backgroundColor: "green",
    padding: "9px",
    borderRadius: "4px",
    color: "white",
  },
  _body: {
    width: "35px",
    backgroundColor: "orange",
    padding: "9px",
    borderRadius: "4px",
    color: "white",
  },
}));

const SmallAdvancedSelect = styled(AdvancedSelect)`
  height: 36px;
  width: 120px;
`;

const DateField = styled(TextField)`
  label {
    font-size: 20px;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-weight: 500;
    color: black;
    line-height: 20px;
    margin-top: -15px;
    white-space: nowrap;
  }
`;

const ProvideWrapper = styled.div`
  display: flex;
  flex-direction: ${({ direction = "row" }) => direction};
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
    setInspectionList,
    inspectionList,
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
  const user = useSelector((state) => state.authReducer.user) || [];

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

  const setInspection = () => {
    setInspectionList(!inspectionList);
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
            disabled={user.role === "super_admin" ? false : true}
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
          <Button onClick={setInspection} variant="outlined">
            Inspection List
          </Button>
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
  const [inspectionList, setInspectionList] = React.useState(false);
  const [filteredColumns, setFilteredColumns] = React.useState(
    columns.filter((item) => item.id !== "actions").map((item) => item.label)
  );
  const [searchParams, setSearchParams] = React.useState({
    testDate: "",
    birthday: "",
    firstName: "",
    lastName: "",
    technicianIds: {},
    providerIds: {},
  });
  const loader = useSelector((state) => state.dashboardReducer.loading);
  const providers = useSelector((state) => state.reportReducer.providers) || [];
  const technicians =
    useSelector((state) => state.reportReducer.technicians) || [];

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

  const Actions = ({ id, status }) => {
    // getModalStyle is not a pure function, we roll the style only on the first render
    // const [modalStyle] = React.useState(getModalStyle);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [myReportId, setMyReportId] = React.useState("");
    // function getModalStyle() {
    //   const top = 50;
    //   const left = 50;
    //   return {
    //     top: `${top}%`,
    //     left: `${left}%`,
    //     transform: `translate(-${top}%, -${left}%)`,
    //   };
    // }

    // const useStyles = makeStyles((theme) => ({
    //   paper: {
    //     position: "absolute",
    //     width: 400,
    //     backgroundColor: theme.palette.background.paper,
    //     border: "2px solid #000",
    //     boxShadow: theme.shadows[5],
    //     padding: theme.spacing(2, 4, 3),
    //   },
    // }));
    // const classes = useStyles();

    const handleOpen = (id) => {
      setOpen(true);
      setMyReportId(id);
      // setReportId(id);
      // setOpen(true);
    };

    const handleCloseDialogue = () => {
      setOpen(false);
      setMyReportId("");
      // setOpen(false);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const body = (
      <Dialog
        open={open}
        onClose={handleCloseDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Delete Report"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this report?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch(deleteReportById(myReportId))}
            color="secondary"
            autoFocus
          >
            Confirm
          </Button>
          <Button onClick={handleCloseDialogue} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );

    return (
      <>
        <Modal
          open={open}
          onClose={handleCloseDialogue}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
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
          {status === "Generated" && (
            <MenuItem>
              <SaveAltIcon color="primary" />

              <Typography
                onClick={() => {
                  setAnchorEl(true);
                  downloadPdf(id);
                }}
                variant="inherit"
              >
                Download
              </Typography>
            </MenuItem>
          )}
          <MenuItem>
            <DeleteIcon color="primary" />
            <Typography
              onClick={() => {
                handleOpen(id);
              }}
              variant="inherit"
            >
              Delete
            </Typography>
          </MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <Paper>
      <TableToolbar
        setInspectionList={setInspectionList}
        inspectionList={inspectionList}
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
      <Box>
        {loader === LoadingStates.PDF_LOADING && (
          <Box display="flex" my={6} justifyContent="flex-end" marginRight={6}>
            <CircularProgress size="1rem" />
            <Typography color="primary" variant="inherit">
              Downloading Report
            </Typography>
          </Box>
        )}

        {loader === LoadingStates.DELETE_REPORT_LOADING && (
          <Box display="flex" my={6} justifyContent="flex-end" marginRight={6}>
            <CircularProgress size="1rem" />
            <Typography color="primary" variant="inherit">
              Deleting Report
            </Typography>
          </Box>
        )}
      </Box>

      {inspectionList && (
        <Grid
          container
          alignItems="center"
          justify="space-between"
          className={classes.root}
        >
          <Grid item>
            <DateField
              type="date"
              // name="encounterDate"
              // format="mm/dd/yyyy"
              margin="normal"
              // value={values.encounterDate}
              label="Search on Test Date"
              onChange={(value) =>
                setSearchParams({
                  ...searchParams,
                  testDate: value,
                })
              }
              // error={Boolean(touched.encounterDate && errors.encounterDate)}
              // fullWidth
              // helperText={touched.encounterDate && errors.encounterDate}
              // onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <DateField
              type="date"
              // name="encounterDate"
              // format="mm/dd/yyyy"
              margin="normal"
              // value={values.encounterDate}
              label="Search on Birth Date"
              onChange={(value) =>
                setSearchParams({
                  ...searchParams,
                  birthday: value,
                })
              }
              // error={Boolean(touched.encounterDate && errors.encounterDate)}
              // fullWidth
              // helperText={touched.encounterDate && errors.encounterDate}
              // onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid>
            <ProvideWrapper direction="column">
              <Typography variant="h6" mb={1}>
                Patient Name
              </Typography>
              <ProvideWrapper>
                <Grid Item className={classes.item}>
                  <TextField
                    name="firstName"
                    placeholder="First Name"
                    // label="Patient Name"
                    // value={values.firstName}
                    // error={Boolean(touched.firstName && errors.firstName)}
                    // fullWidth
                    // helperText={touched.firstName && errors.firstName}
                    // onBlur={handleBlur}
                    onChange={(value) =>
                      setSearchParams({ ...searchParams, firstName: value })
                    }
                    variant="outlined"
                    my={2}
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <UserIcon />
                    //     </InputAdornment>
                    //   ),
                    // }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <UserIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid Item className={classes.item}>
                  <TextField
                    name="lastName"
                    placeholder="Last Name"
                    // value={values.firstName}
                    // error={Boolean(touched.firstName && errors.firstName)}
                    // fullWidth
                    // helperText={touched.firstName && errors.firstName}
                    // onBlur={handleBlur}
                    onChange={(value) =>
                      setSearchParams({ ...searchParams, lastName: value })
                    }
                    variant="outlined"
                    my={2}
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <UserIcon />
                    //     </InputAdornment>
                    //   ),
                    // }}
                  />
                </Grid>
              </ProvideWrapper>
            </ProvideWrapper>
          </Grid>
          <ProvideWrapper direction="column">
            <Typography variant="h6" mb={1}>
              Physician and Technician
            </Typography>
            <ProvideWrapper>
              <Grid item>
                <SmallAdvancedSelect
                  size="small"
                  // error={Boolean(touched.providerId && errors.providerId)}
                  // helperText={touched.providerId && errors.providerId}
                  // value={values.staffInformation.providerId}
                  onChange={(e) => {
                    setSearchParams({
                      ...searchParams,
                      provider: e.target.value,
                    });
                  }}
                  // onBlur={handleBlur}
                  name="providerId"
                  label="Provider"
                  options={providers.map((item, index) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  variant="outlined"
                  // allowAdd={true}
                  // onAdd={hanldeNewProvider}
                />
              </Grid>
              <Grid item>
                <SmallAdvancedSelect
                  // error={Boolean(touched.technicianId && errors.technicianId)}
                  // helperText={touched.technicianId && errors.technicianId}
                  // value={values.staffInformation.technicianId}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      technician: e.target.value,
                    })
                  }
                  // onBlur={handleBlur}
                  name="technicianId"
                  label="Technician"
                  options={technicians.map((item, index) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  variant="outlined"
                  // allowAdd={true}
                  // onAdd={hanldeNewTechnician}
                />
              </Grid>
            </ProvideWrapper>
          </ProvideWrapper>
        </Grid>
      )}

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
            {data.map((row, index) => {
              const labelId = `report-table-${index}`;
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={labelId}>
                  {columns.map(
                    (headCell) =>
                      filteredColumns.indexOf(headCell.label) !== -1 &&
                      headCell.id !== "actions" && (
                        <TableCell align="left" key={headCell.id}>
                          {headCell.id === "status" ? (
                            <span
                              className={
                                row[headCell.id] === "Generated"
                                  ? classes.body
                                  : classes._body
                              }
                            >
                              {row[headCell.id]}
                            </span>
                          ) : (
                            row[headCell.id]
                          )}
                        </TableCell>
                      )
                  )}
                  <TableCell>
                    <IconButton aria-label="actions">
                      <Actions id={row._id} status={row.status} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ReportTable;
