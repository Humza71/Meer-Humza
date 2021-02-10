import styled from "styled-components/macro";
import { Input as MuiInput } from "@material-ui/core";

const StyledInput = styled(MuiInput)`
  width: 72px;
  height: 38px;
  background: #f8f9fa;
  border-radius: 4px 4px 0px 0px;
  text-align: center;
`;

const Input = ({ value, onChange }) => {
  return <StyledInput value={value} onChange={onChange}></StyledInput>;
};

export default Input;
