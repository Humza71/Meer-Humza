import React from "react";
import styled from "styled-components/macro";
import { TextareaAutosize } from "@material-ui/core";

const StyledTextArea = styled(TextareaAutosize)`
  width: 100%;
  padding: 8px 0 0 17px;
  margin: 24px 0px;
  background: #f8f9fa;
  border: 0;
  border-radius: 4px 4px 0px 0px;
`;

const TextArea = ({ rows = 3, placeHolder = "Notes", value, onChange }) => {
  return (
    <StyledTextArea
      value={value}
      rowsMin={rows}
      placeholder={placeHolder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextArea;
