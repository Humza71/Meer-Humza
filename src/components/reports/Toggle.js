import React from "react";
import {
  ToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@material-ui/lab";
import styled from "styled-components/macro";

export const ToggleButtonGroup = styled(MuiToggleButtonGroup)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .MuiToggleButton-root {
    border: 1px solid rgba(0, 0, 0, 0.12) !important;
    border-radius: 4px !important;
    width: 85px;
    height: 38px;
    margin-bottom: 9px;
    max-width: 120px;
  }
  .MuiToggleButton-root.Mui-selected {
    border: 1px solid #09539e !important;
    background: #f8fbff !important;
    color: #09539e !important;
  }
`;

const Toggle = ({ options, name, handleBlur, label = "", value, onChange }) => (
  <>
    <ToggleButtonGroup
      exclusive
      name={name}
      label={label}
      value={value}
      onBlur={handleBlur}
      onChange={(e, value) => onChange(value)}
      aria-label={name}
    >
      {options.map(({ value, title, key }) => (
        <ToggleButton value={value} aria-label={value} key={key}>
          {title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  </>
);

export default Toggle;
