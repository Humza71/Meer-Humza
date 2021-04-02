import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import Sidebar from "../components/Sidebar";
import Header from "../components/AppBar";

import { spacing } from "@material-ui/system";
import { CssBaseline, Paper as MuiPaper, withWidth } from "@material-ui/core";
import { useDispatch } from "react-redux";
// import { userInfo } from "../redux/reducers/authReducer";
import {
  getAllProviders,
  getAllTechnicians,
} from "redux/reducers/reportReducer";

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

const Dashboard = ({ children, routes }) => {
  const dispatch = useDispatch();
  const [navExpand, setNavExpand] = useState(true);
  // const userProfile = useSelector((state) => state.authReducer.user);

  const handleDrawerToggle = () => {
    console.log(navExpand);
    setNavExpand(!navExpand);
  };

  useEffect(() => {
    if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
      setNavExpand(false);
    } else {
      setNavExpand(true);
    }
  }, []);

  useEffect(() => {
    // dispatch(userInfo());
    dispatch(getAllProviders());
    dispatch(getAllTechnicians());
  }, [dispatch]);

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
        <MainContent>{children}</MainContent>
      </AppContent>
    </Root>
  );
};

export default withWidth()(Dashboard);
