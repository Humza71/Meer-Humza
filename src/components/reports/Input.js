import styled from "styled-components/macro";
import { Input as MuiInput } from "@material-ui/core";

const StyledInput = styled(MuiInput)`
  width: ${({ size }) => size.width};
  height: ${({ size }) => size.height};
  padding-left: 8px;
  background: #f8f9fa;
  border-radius: 4px 4px 0px 0px;
  text-align: center;
`;

const Input = ({
  value,
  onChange,
  placeholder = "",
  fieldsize = { width: "72px", height: "38px" },
  ...rest
}) => {
  return (
    <StyledInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      size={fieldsize}
      {...rest}
    />
  );
};

export default Input;
