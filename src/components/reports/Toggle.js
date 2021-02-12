import React from "react";
import {
  ToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@material-ui/lab";
import styled from "styled-components/macro";

export const ToggleButtonGroup = styled(MuiToggleButtonGroup)`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: space-between;
  align-items: center;
  .MuiToggleButton-root {
    border: 1px solid rgba(0, 0, 0, 0.12) !important;
    border-radius: 4px !important;
    width: ${(props) => props.togglesize.width};
    height: ${(props) => props.togglesize.height};
    margin-bottom: 9px;
  }
  .MuiToggleButton-root.Mui-selected {
    border: 1px solid #09539e !important;
    background: #f8fbff !important;
    color: #09539e !important;
  }
`;

const Toggle = ({
  options,
  name,
  handleBlur,
  label = "",
  value,
  onChange,
  direction = "column",
  togglesize = {
    width: "85px",
    height: "38px",
  },
  exclusive = true,
}) => (
  <>
    <ToggleButtonGroup
      exclusive={exclusive}
      togglesize={togglesize}
      direction={direction}
      name={name}
      label={label}
      value={value}
      onBlur={handleBlur}
      onChange={(e, value) => onChange(value)}
      aria-label={name}
    >
      {options.map(({ value, title }, index) => (
        <ToggleButton value={value} aria-label={value} key={index}>
          {title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  </>
);

export default Toggle;
