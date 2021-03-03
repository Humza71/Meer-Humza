import React, { useState } from "react";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import styled from "styled-components/macro";
import Input from "components/reports/Input";
import BackspaceIcon from "@material-ui/icons/Backspace";

const PopUpWrapper = styled.div`
  background: #f8fbff;
  border-radius: 4px;
  width: 264px;
  height: 370px;
  .header {
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    padding: 3px;
    input {
      border: none;
      padding-left: 11px;
    }
  }
  .numberWrapper {
    display: flex;
    flex-wrap: wrap;
    .number {
      width: 21%;
      height: 56px;
      background: #ffffff;
      box-shadow: 0px 2px 6px rgb(0 0 0 / 10%);
      border-radius: 14px;
      margin: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #09539e;
      font-size: 12px;
    }
    .clear,
    svg {
      margin: 29px 28px;
      cursor: pointer;
    }
  }
`;

const NumberPopover = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div onClick={handleClick}>
        <Input value={value} onChange={() => {}} disabled />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <PopUpWrapper>
          <div className="header">
            <input
              placeholder="Enter a value"
              type="number"
              value={value}
              onChange={({ target }) => onChange(target.value)}
            />
            <Button
              aria-describedby={id}
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              Done
            </Button>
          </div>
          <div className="numberWrapper">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <div
                className="number"
                onClick={() => onChange(`${value}${number}`)}
              >
                {number}
              </div>
            ))}
            <div className="clear" onClick={() => onChange(``)}>
              Clear
            </div>
            <div className="number" onClick={() => onChange(`${value}0`)}>
              0
            </div>
            <BackspaceIcon
              onClick={() => {
                const newValue = value.slice(0, -1);
                onChange(newValue);
              }}
            />
          </div>
        </PopUpWrapper>
      </Popover>
    </div>
  );
};

export default NumberPopover;
