import React from "react";
import styled from "styled-components/macro";
import { NavLink, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { darken } from "polished";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../vendor/perfect-scrollbar.css";

import { spacing } from "@material-ui/system";

import {
  Box as MuiBox,
  Chip,
  Drawer as MuiDrawer,
  List as MuiList,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import { sidebarRoutes as routes } from "../routes/index";

const Box = styled(MuiBox)(spacing);

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: ${(props) => props.theme.sidebar.background};
`;

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)}px;
  padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
`;

const Brand = styled(ListItem)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(15)}px;
  padding-right: ${(props) => props.theme.spacing(6)}px;
  padding-top: ${(props) => props.theme.spacing(10)}px;
  cursor: pointer;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

const BrandIcon = styled.div`
  background: url("/static/img/logo.png");
  margin-right: ${(props) => props.theme.spacing(2)}px;
  color: ${(props) => props.theme.sidebar.header.brand.color};
  fill: ${(props) => props.theme.sidebar.header.brand.color};
  width: 29px;
  height: 36px;
`;

const Category = styled(ListItem)`
  padding-top: ${(props) => props.theme.spacing(3)}px;
  padding-bottom: ${(props) => props.theme.spacing(3)}px;
  padding-left: ${(props) => props.theme.spacing(15)}px;
  padding-right: ${(props) => props.theme.spacing(7)}px;
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};

  svg {
    color: ${(props) => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &.${(props) => props.activeClassName} {
    background-color: ${(props) =>
      darken(0.03, props.theme.sidebar.background)};

    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

const CategoryIcon = styled(ListItemIcon)`
  min-width: 28px;
`;
const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${(props) => props.theme.sidebar.color};
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
    padding: 0 ${(props) => props.theme.spacing(3)}px;
  }
`;

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 28px;
  top: 8px;
  background: ${(props) => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)}px;
    padding-right: ${(props) => props.theme.spacing(2)}px;
  }
`;

const CategoryBadge = styled(LinkBadge)`
  top: 12px;
`;

const SidebarCategory = ({ name, icon, badge, navExpand, ...rest }) => {
  return (
    <Category {...rest}>
      <CategoryIcon>{icon}</CategoryIcon>
      {navExpand && <CategoryText>{name}</CategoryText>}
      {badge ? <CategoryBadge label={badge} /> : ""}
    </Category>
  );
};

const Sidebar = ({ staticContext, location, navExpand, ...rest }) => {
  const user = useSelector((state) => state.authReducer.user) || {};
  return (
    <Drawer variant="permanent" {...rest}>
      <Brand component={NavLink} to="/" button>
        <BrandIcon />
        {navExpand && <Box ml={1}>AIB Report Writing</Box>}
      </Brand>
      <Scrollbar>
        <List>
          <Items>
            {routes.map(
              (category, index) =>
                category.role.some((name) => user.role === name) && (
                  <React.Fragment key={index}>
                    {category.icon ? (
                      <SidebarCategory
                        name={category.id}
                        to={category.path}
                        activeClassName="active"
                        component={NavLink}
                        icon={category.icon}
                        navExpand={navExpand}
                        exact
                        button
                        badge={category.badge}
                      />
                    ) : null}
                  </React.Fragment>
                )
            )}
          </Items>
        </List>
      </Scrollbar>
    </Drawer>
  );
};

export default withRouter(Sidebar);
