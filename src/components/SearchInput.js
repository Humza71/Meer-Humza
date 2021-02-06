import React from "react";
import styled from "styled-components/macro";
import { darken } from "polished";
import { InputBase } from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

const Search = styled.div`
  border-radius: 2px;
  position: relative;
  width: 100%;
  background-color: ${(props) =>
    props.grayBackground
      ? darken(0.05, props.theme.header.background)
      : props.theme.header.background};
  border-bottom: ${(props) =>
    props.grayBackground
      ? "0px"
      : `1px solid ${darken(0.05, props.theme.header.background)}`};
`;

const SearchIconWrapper = styled.div`
  width: 40px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
  svg {
    width: 15px;
    height: 15px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;
  > input {
    color: ${(props) => props.theme.header.search.color};
    padding-top: ${(props) => props.theme.spacing(2.5)}px;
    padding-right: ${(props) => props.theme.spacing(2.5)}px;
    padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
    padding-left: ${(props) => props.theme.spacing(10)}px;
    width: 280px;
  }
`;

const SearchInput = ({
  placeholder,
  value,
  onChange,
  grayBackground,
  ...props
}) => {
  return (
    <Search grayBackground={grayBackground}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </Search>
  );
};

export default React.forwardRef((props, ref) => <SearchInput {...props} />);
