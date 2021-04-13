import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components/macro";

const StyledHeader = styled(TableHead)`
  background: ${({ headerColor = "#f8fbff" }) => headerColor};
`;

const ReportTable = ({ Columns, children, headerColor }) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <StyledHeader headerColor={headerColor}>
          <TableRow>
            <Columns />
          </TableRow>
        </StyledHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};
export default ReportTable;
