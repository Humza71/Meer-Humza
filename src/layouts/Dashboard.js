import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import Sidebar from "../components/Sidebar";
import Header from "../components/AppBar";

import { spacing } from "@material-ui/system";
import { CssBaseline, Paper as MuiPaper, withWidth } from "@material-ui/core";

import { isWidthUp } from "@material-ui/core/withWidth";

const drawerWidth = 288;
const drawerMiniWidth = 122;

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
  background: #09539e;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${(props) => (props.navExpand ? drawerWidth : drawerMiniWidth)}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 10px;
  overflow: hidden;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  border-radius: 0 0 10px 10px;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({ children, routes, width }) => {
  const [navExpand, setNavExpand] = useState(true);

  const handleDrawerToggle = () => {
    console.log(navExpand);
    setNavExpand(!navExpand);
  };

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer navExpand={navExpand}>
        <Sidebar
          routes={routes}
          PaperProps={{
            style: { width: navExpand ? drawerWidth : drawerMiniWidth },
          }}
          navExpand={navExpand}
        />
      </Drawer>
      <AppContent>
        <Header navExpand={navExpand} onDrawerToggle={handleDrawerToggle} />
        <MainContent p={isWidthUp("lg", width) ? 12 : 5}>
          {children}
        </MainContent>
      </AppContent>
    </Root>
  );
};

export default withWidth()(Dashboard);
