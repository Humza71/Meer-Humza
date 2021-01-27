import React from "react";
// import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Tooltip, Avatar, Menu, MenuItem, Box } from "@material-ui/core";

import { signOut } from "../redux/reducers/authReducer";

function UserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    await dispatch(signOut());
    history.push("/auth/sign-in");
  };

  return (
    <React.Fragment>
      <Box display="flex">
        <Box display="flex" alignItems="center" mr={2}>
          Lucy Lavender
        </Box>
        <Tooltip title="Account">
          <Avatar
            alt="Lucy Lavender"
            src="/static/img/avatars/avatar-1.jpg"
            onClick={toggleMenu}
          />
        </Tooltip>
      </Box>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default UserDropdown;
