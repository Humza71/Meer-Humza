import React from "react";
import styled from "styled-components/macro";

import { Avatar, Paper } from "@material-ui/core";

const Wrapper = styled(Paper)`
  background: url("/static/img/auth/auth-background.png") no-repeat;
  background-size: 100% 100%;
  padding: ${(props) => props.theme.spacing(13)}px;
  position: relative;
  height: 100%;
  width: calc(100% - 150px);
  ${(props) => props.theme.breakpoints.up("md")} {
    width: calc(100% - 250px);
  }
`;

const AuthLogo = styled.div`
  background: url("/static/img/auth/auth-logo.png") no-repeat;
  height: 60px;
  width: 138px;
  ${(props) => props.theme.breakpoints.up("md")} {
    height: 100px;
    width: 229px;
  }
`;

const BigAvatar = styled(Avatar)`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)}px;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  border: 3px solid white;
  border-radius: 100%;
  border-right: 3px solid white;
  border-top: 4px solid white;
  background-color: white;
`;

function AuthBackground() {
  return (
    <Wrapper>
      <AuthLogo />
      <BigAvatar
        alt="pic1"
        src="/static/img/auth/auth-pic1.png"
        left="33%"
        top="33%"
        size={110}
      />
      <BigAvatar
        alt="pic2"
        src="/static/img/auth/auth-pic2.png"
        left="22%"
        top="45%"
        size={100}
      />
      <BigAvatar
        alt="pic3"
        src="/static/img/auth/auth-pic3.png"
        left="33%"
        top="57%"
        size={90}
      />
    </Wrapper>
  );
}

export default AuthBackground;
