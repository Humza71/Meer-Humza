import React from "react";
import styled from "styled-components/macro";

import { makeStyles } from "@material-ui/core/styles";
// import { Box, CircularProgress, InputAdornment } from "@material-ui/core";
// import { User as UserIcon } from "react-feather";

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
  // Popover,
  // Tooltip as MuiTooltip,
  Menu,
  MenuItem,
  Typography as MuiTypography,
  Modal,
  Button,
  // TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import {
  MoreVert as MoreVertIcon,
  Menu as MenuIcon,
  ViewHeadline as ViewHeadlineIcon,
} from "@material-ui/icons";
// import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import FilterListIcon from "@material-ui/icons/FilterList";
import { spacing } from "@material-ui/system";

import SearchInput from "components/SearchInput";
import AdvancedSelect from "components/AdvancedSelect";
import CompanyForm from "components/addNewCompany";
import {
  getCompanyById,
  clearClinic,
  deleteClinicById,
} from "redux/reducers/clientReducer";
// import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const Paper = styled(MuiPaper)(spacing);
const Toolbar = styled(MuiToolbar)(spacing);

const Typography = styled(MuiTypography)`
  margin-left: 10px;
`;
// const Dialog = styled(MuiDialog)`
//   // MuiPaper-root {
//   //   height: 550px;
//   // }
// `;

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
}));

const SmallAdvancedSelect = styled(AdvancedSelect)`
  height: 36px;
  width: 120px;
`;

const Icon = styled.img`
  cursor: pointer;
  width: 20px;
`;

let TableToolbar = (props) => {
  const {
    data,
    columns,
    rowsPerPage,
    page,
    filteredColumns,
    // filteredClinics,
    searchString,
    tableFormat,
    setFilteredColumns,
    // setFilteredClinics,
    setSearchString,
    setTableFormat,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;

  const handleColumnFilterChange = (event) => {
    setFilteredColumns(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };
  const handleTableFormatChange = (event, newFormat) => {
    setTableFormat(newFormat);
  };

  const FilterIcon = () => {
    return (
      <Grid container alignItems="center">
        <FilterListIcon />
        <span>Filter</span>
      </Grid>
    );
  };

  return (
    <Toolbar p={0} mb={2}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <SearchInput
            placeholder="Search for a Company"
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
          <SmallAdvancedSelect
            value={filteredColumns}
            onChange={handleColumnFilterChange}
            name="filter"
            label="Filter"
            options={columns
              .filter((item) => item.id !== "actions")
              .map((item) => ({
                label: item.label,
                value: item.label,
              }))}
            variant="outlined"
            renderValue={() => <FilterIcon />}
            multiple
          />
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

const ClientTable = (props) => {
  const { data, columns } = props;

  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [tableFormat, setTableFormat] = React.useState("padding");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchString, setSearchString] = React.useState("");
  const [open, setOpen] = React.useState(false);
  // const [modalStyle] = React.useState(getModalStyle);
  // const [rowRecord, setRowRecord] = React.useState({});

  const [filteredColumns, setFilteredColumns] = React.useState(
    columns.filter((item) => item.id !== "actions").map((item) => item.label)
  );
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
  //     minHeight: 450,
  //     width: 547,
  //     backgroundColor: theme.palette.background.paper,
  //     // border: "0px solid grey",
  //     boxShadow: theme.shadows[5],
  //     padding: theme.spacing(2, 4, 3),
  //   },
  // }));

  const classes = useStyles();
  //   const [searchParams, setSearchParams] = React.useState({
  //     testDate: "",
  //     birthday: "",
  //     firstName: "",
  //     lastName: "",
  //     technicianIds: {},
  //     providerIds: {},
  //   });

  // const history = useHistory();
  const handleOpen = (row) => {
    setOpen(true);
    dispatch(getCompanyById(row.id));
  };

  const handleCloseDialogue = () => {
    setOpen(false);
    dispatch(clearClinic());

    // setMyReportId("");
    // setOpen(false);
  };

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

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  // const body = (
  //   <div style={modalStyle} className={classes.paper}>
  //     <CompanyForm editCompany={true} companyInfo={rowRecord} />
  //   </div>
  // );

  const Actions = ({ id, status }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDelete, setOpenDelete] = React.useState(null);
    // const [clientId, setClientId] = React.useState(null);
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
    const handleDeleteOpen = () => {
      setOpenDelete(true);
    };

    const handleDeleteDialogue = () => {
      setOpenDelete(false);
    };
    // const deleteClient = () => {
    //   dispatch(deleteClinicById(id));
    // };

    const DeleteBody = (
      <Dialog
        open={openDelete}
        onClose={handleDeleteDialogue}
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
          <Button onClick={handleDeleteDialogue} color="action">
            Cancel
          </Button>
          <Button
            onClick={() => dispatch(deleteClinicById(id, handleDeleteDialogue))}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );

    return (
      <>
        <Modal
          open={openDelete}
          onClose={handleDeleteDialogue}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {DeleteBody}
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

          <MenuItem>
            <DeleteIcon color="primary" />

            <Typography
              variant="inherit"
              onClick={() => {
                handleDeleteOpen();
              }}
            >
              Delete
            </Typography>
          </MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CompanyForm setOpen={setOpen} editCompany={true} />
      </Dialog>

      <Paper>
        <TableToolbar
          data={data}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          filteredColumns={filteredColumns}
          searchString={searchString}
          tableFormat={tableFormat}
          setFilteredColumns={setFilteredColumns}
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
                      <Grid container alignItems="center">
                        <Grid Item>
                          <Icon
                            onClick={() => {
                              handleOpen(row);
                            }}
                            src={"./static/img/Edit.png"}
                          />
                        </Grid>
                        <Grid Item>
                          <IconButton aria-label="actions">
                            <Actions id={row.id} />
                          </IconButton>
                        </Grid>
                      </Grid>
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
    </>
  );
};

export default ClientTable;
