import React from "react";
import styled from "styled-components/macro";
import TableCell from "@material-ui/core/TableCell";

const StyledBodyCell = styled(TableCell)`
  text-align: center;
  padding: 5px;
  vertical-align: baseline;
`;

const BodyCell = (props) => {
  return <StyledBodyCell {...props}>{props.children}</StyledBodyCell>;
};

export default BodyCell;
