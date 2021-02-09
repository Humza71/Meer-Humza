import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components/macro";

const StyledHeader = styled(TableHead)`
  background: #f8fbff;
`;

const ReportTable = ({ Columns, children }) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <StyledHeader>
          <TableRow>
            <Columns />
          </TableRow>
        </StyledHeader>
        <TableBody>
          <TableRow>{children}</TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ReportTable;
