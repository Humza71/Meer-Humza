import React from "react";

import { spacing } from "@material-ui/system";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components/macro";

import {
  Box,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Typography as MuiTypography,
  TextareaAutosize,
  Input,
} from "@material-ui/core";
import {
  ToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@material-ui/lab";

const Card = styled(MuiCard)(spacing);

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

export const HorizontalToggle = styled(ToggleButtonGroup)`
  flex-direction: row !important;
  .MuiToggleButton-root {
    width: 51px !important;
    height: 38px !important;
    max-width: 120px;
  }
`;

export const StyledInput = styled(Input)`
  width: 72px;
  height: 38px;
  background: #f8f9fa;
  border-radius: 4px 4px 0px 0px;
  text-align: center;
`;

export const StyledHeader = styled(TableHead)`
  background: #f8fbff;
`;

export const StyledCell = styled(TableCell)`
  color: #09539e;
`;

export const StyledBodyCell = styled(TableCell)`
  text-align: center;
  padding: 5px;
  vertical-align: baseline;
`;

export const OutCard = styled(Card)`
  width: 950px;
  margin: 36px auto;
`;

export const TextArea = styled(TextareaAutosize)`
  width: 100%;
  padding: 8px 0 0 17px;
  margin: 24px 0px;
  background: #f8f9fa;
  border: 0;
  border-radius: 4px 4px 0px 0px;
`;

export const HallPickToggle = styled(HorizontalToggle)`
  .MuiToggleButton-root {
    width: 90px !important;
    height: 44px !important;
    font-size: 10px !important;
  }
`;

export const NormalityOptions = ({
  formKey,
  fieldkey,
  children,
  values = {},
  setFieldValue,
  handleBlur,
}) => (
  <>
    <ToggleButtonGroup
      exclusive
      name={`${formKey}.${fieldkey}`}
      label=""
      value={values[`${fieldkey}`]}
      onBlur={handleBlur}
      onChange={(event, value) =>
        setFieldValue(`${formKey}.${fieldkey}`, value)
      }
      aria-label={`${formKey}.fieldkey`}
    >
      <ToggleButton value="normal" aria-label="normal">
        Normal
      </ToggleButton>
      <ToggleButton value="abnormal" aria-label="abnormal">
        Abnormal
      </ToggleButton>
      {children}
    </ToggleButtonGroup>
  </>
);

export const ConsentOptions = ({
  formKey,
  fieldkey,
  children,
  values = {},
  setFieldValue,
  handleBlur,
}) => (
  <>
    <ToggleButtonGroup
      exclusive
      name={`${formKey}.fieldkey`}
      label=""
      value={values[`${fieldkey}`]}
      onBlur={handleBlur}
      onChange={(event, value) =>
        setFieldValue(`${formKey}.${fieldkey}`, value)
      }
      aria-label={`${formKey}.fieldkey`}
    >
      <ToggleButton value="yes" aria-label="yes">
        Yes
      </ToggleButton>
      <ToggleButton value="no" aria-label="no">
        No
      </ToggleButton>
      {children}
    </ToggleButtonGroup>
  </>
);

export const DirectionOptions = ({
  formKey,
  fieldkey,
  children,
  values = {},
  setFieldValue,
  handleBlur,
}) => (
  <>
    <HorizontalToggle
      exclusive
      name={`${formKey}.fieldkey`}
      label=""
      value={values[`${fieldkey}`]}
      onBlur={handleBlur}
      onChange={(event, value) =>
        setFieldValue(`${formKey}.${fieldkey}`, value)
      }
      aria-label={`${formKey}.${fieldkey}`}
    >
      <ToggleButton value="R" aria-label="R">
        R
      </ToggleButton>
      <ToggleButton value="L" aria-label="L">
        L
      </ToggleButton>
      <ToggleButton value="U" aria-label="U">
        U
      </ToggleButton>
      <ToggleButton value="D" aria-label="D">
        D
      </ToggleButton>
      {children}
    </HorizontalToggle>
  </>
);

export const RLOptions = ({
  formKey,
  fieldkey,
  children,
  values = {},
  setFieldValue,
  handleBlur,
}) => (
  <>
    <HorizontalToggle
      exclusive
      name={`${formKey}.fieldkey`}
      label=""
      value={values[`${fieldkey}`]}
      onBlur={handleBlur}
      onChange={(event, value) =>
        setFieldValue(`${formKey}.${fieldkey}`, value)
      }
      aria-label={`${formKey}.${fieldkey}`}
    >
      <ToggleButton value="R" aria-label="R">
        R
      </ToggleButton>
      <ToggleButton value="L" aria-label="L">
        L
      </ToggleButton>
      {children}
    </HorizontalToggle>
  </>
);

export const HallPickOptions = ({
  formKey,
  fieldkey,
  children,
  values = {},
  setFieldValue,
  handleBlur,
}) => (
  <>
    <HallPickToggle
      exclusive
      name={`${formKey}.fieldkey`}
      label=""
      value={values[`${fieldkey}`]}
      onBlur={handleBlur}
      onChange={(event, value) =>
        setFieldValue(`${formKey}.${fieldkey}`, value)
      }
      aria-label={`${formKey}.${fieldkey}`}
    >
      <ToggleButton value="upRight" aria-label="upRight">
        {"Up & Right Torsion"}
      </ToggleButton>
      <ToggleButton value="upLeft" aria-label="upLeft">
        {"Up & Left Torsion"}
      </ToggleButton>
      <ToggleButton value="downRight" aria-label="downRight">
        {"Down & Right Torsion"}
      </ToggleButton>
      <ToggleButton value="downLeft" aria-label="downLeft">
        {"Down & Left Torsion"}
      </ToggleButton>
      {children}
    </HallPickToggle>
  </>
);

export const IndexOptions = ({
  fieldkey,
  children,
  values = {},
  setFieldValue,
  handleBlur,
}) => (
  <>
    <ToggleButtonGroup
      exclusive
      name={fieldkey}
      label=""
      value={values[`${fieldkey}`]}
      onBlur={handleBlur}
      onChange={(event, value) => setFieldValue(fieldkey, value)}
      aria-label={fieldkey}
    >
      <ToggleButton value="normal" aria-label="normal">
        Negative
      </ToggleButton>
      <ToggleButton value="abnormal" aria-label="abnormal">
        Positive
      </ToggleButton>
      {children}
    </ToggleButtonGroup>
  </>
);

export const CarolicOptions = ({
  fieldkey,
  children,
  values = {},
  setFieldValue,
  handleBlur,
}) => (
  <>
    <ToggleButtonGroup
      exclusive
      name={fieldkey}
      label=""
      value={values[`${fieldkey}`]}
      onBlur={handleBlur}
      onChange={(event, value) => setFieldValue(fieldkey, value)}
      aria-label={fieldkey}
    >
      <ToggleButton value="normal" aria-label="normal">
        UW
      </ToggleButton>
      <ToggleButton value="abnormal" aria-label="abnormal">
        DP
      </ToggleButton>
      {children}
    </ToggleButtonGroup>
  </>
);
