import React from "react";
import styled from "styled-components/macro";
import TableCell from "@material-ui/core/TableCell";

const StyledCell = styled(TableCell)`
  color: #09539e;
`;

const Cell = (props) => {
  return <StyledCell {...props}>{props.children}</StyledCell>;
};

export default Cell;
