import React from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Typography,
} from "@material-ui/core";

import { signOut } from "../redux/reducers/authReducer";

const SmallAvatar = styled(Avatar)`
  width: 30px;
  height: 30px;
`;

function UserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.authReducer.user);

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
      <Box
        display="flex"
        border={1}
        borderColor="grey.500"
        borderRadius={50}
        p={1}
        pl={3}
      >
        <Box display="flex" alignItems="center" mr={2}>
          <Typography variant="subtitle2">{userProfile.name}</Typography>
        </Box>
        <Tooltip title="Account">
          <SmallAvatar
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
