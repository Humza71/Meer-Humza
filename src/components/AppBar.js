import React from "react";
import styled, { withTheme } from "styled-components/macro";

import {
  Grid,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
} from "@material-ui/core";

import { ChevronsLeft, ChevronsRight } from "react-feather";

import UserDropdown from "./UserDropdown";

const AppBar = styled(MuiAppBar)`
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

const AppBarComponent = ({ navExpand, onDrawerToggle }) => (
  <React.Fragment>
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={onDrawerToggle}
            >
              {navExpand ? <ChevronsLeft /> : <ChevronsRight />}
            </IconButton>
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

export default withTheme(AppBarComponent);
