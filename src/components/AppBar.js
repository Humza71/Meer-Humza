import React from "react";
import { useSelector } from "react-redux";
import styled, { withTheme } from "styled-components/macro";

import {
  Grid,
  Box,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { ChevronsLeft, ChevronsRight } from "react-feather";

import UserDropdown from "./UserDropdown";

const AppBar = styled(MuiAppBar)`
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid lightgray;
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const HeaderLogoIcon = styled.div`
  background: url(/static/img/dashboard/header-logo.png);
  width: 186px;
  height: 24px;
  background-size: 100% 100%;
  margin: auto;
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const AppBarComponent = ({ navExpand, onDrawerToggle }) => {
  const headerTitle = useSelector((state) => state.uiReducer.headerTitle);

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item>
              <Box display="flex" alignItems="center">
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                >
                  {navExpand ? <ChevronsLeft /> : <ChevronsRight />}
                </IconButton>
                <Typography variant="subtitle2" color="primary">
                  {headerTitle}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <HeaderLogoIcon />
            </Grid>
            <Grid item>
              <UserDropdown />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withTheme(AppBarComponent);
