import React, { useState } from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Select as MuiSelect,
  FormControl as MuiFormControl,
  FormControlLabel,
  FormHelperText,
  FilledInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Typography as MuiTypography,
  Divider,
  ListItemText,
} from "@material-ui/core";
import { Add as AddIcon, Close as CloseIcon } from "@material-ui/icons";
import SearchInput from "components/SearchInput";

const Select = styled(MuiSelect)(spacing);
const FormControl = styled(MuiFormControl)(spacing);
const Typography = styled(MuiTypography)(spacing);
const NewOptionInput = styled(FilledInput)`
  .MuiInputAdornment-positionStart {
    margin: auto 8px auto 0 !important;
    color: ${(props) => props.theme.palette.primary.main};
  }
  .MuiFilledInput-input {
    padding: 12px;
    font-size: 15px;
  }
`;
const BlueFormControlLabel = styled(FormControlLabel)`
  color: ${(props) => props.theme.palette.primary.main};
`;
const AddButton = styled(Button)`
  background-color: #f2f9ff;
  height: 40px;
`;

const AdvancedSelect = ({
  error,
  value = [],
  onChange,
  name,
  label,
  helperText,
  options = [],
  variant,
  allowAdd,
  onAdd,
  hidelabeltop,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [selectValue, setSelectValue] = useState(value);
  const [searchText, setSearchText] = useState("");
  const [newOption, setNewOption] = useState("");
  const [saveForFuture, setSaveForFuture] = useState(false);

  const stopPropagation = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  const clearNewOption = (e) => {
    stopPropagation(e);
    setNewOption("");
    setSaveForFuture(false);
  };
  const onAddNewOption = (e) => {
    stopPropagation(e);
    onAdd(newOption, saveForFuture);
    clearNewOption(e);
  };
  const handleMenuItemClick = (e) => {
    setSelectValue(e.target.value);
    if (!props.multiple) {
      setOpen(false);
    }
  };
  const handleClose = (e) => {
    if (e.target.id !== `search-${name}` && e.target.id !== `new-${name}`) {
      setOpen(false);
      setSearchText("");
      clearNewOption(e);
    }
    e.preventDefault();
  };
  const hanldeSearchTextChange = (e) => {
    stopPropagation(e);
    setSearchText(e.target.value);
  };
  const hanldeNewOptionChange = (e) => {
    stopPropagation(e);
    setNewOption(e.target.value);
  };
  const handleChangeSaveForFuture = (e) => {
    stopPropagation(e);
    setSaveForFuture(e.target.checked);
  };
  const handleSelectChange = (e) => {
    onChange(e);
    setSelectValue(e.target.value);
    setSearchText("");
  };
  const extraProps = !hidelabeltop ? { label: label } : {};

  return (
    <FormControl error={error} fullWidth variant={variant}>
      {!hidelabeltop && <InputLabel>{label}</InputLabel>}
      <Select
        name={name}
        value={value.length > 0 ? value : selectValue}
        open={open}
        onChange={handleSelectChange}
        onOpen={() => setOpen(true)}
        onClose={handleClose}
        {...props}
        {...extraProps}
      >
        <Typography variant="subtitle2" color="primary" mb={3}>
          {name}
        </Typography>
        <Box mb={3}>
          <SearchInput
            id={`search-${name}`}
            placeholder={`Search for a ${name}`}
            value={searchText}
            onChange={hanldeSearchTextChange}
            onClick={stopPropagation}
            onKeyDown={stopPropagation}
          />
        </Box>

        {allowAdd && (
          <Box>
            <FormControl variant="filled" fullWidth mb={3}>
              <NewOptionInput
                id={`new-${name}`}
                value={newOption}
                variant="filled"
                onChange={hanldeNewOptionChange}
                onClick={stopPropagation}
                onKeyDown={stopPropagation}
                startAdornment={
                  <InputAdornment position="start">
                    <AddIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={clearNewOption}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box display="flex" justifyContent="space-between" mb={3}>
              <BlueFormControlLabel
                control={
                  <Checkbox
                    name={`saveForFuture-${name}`}
                    checked={saveForFuture}
                    onClick={stopPropagation}
                    onChange={handleChangeSaveForFuture}
                    color="primary"
                  />
                }
                onClick={stopPropagation}
                label="Save for future use"
                color="primary"
              />
              <AddButton
                size="small"
                variant="text"
                color="primary"
                onClick={onAddNewOption}
              >
                Add
              </AddButton>
            </Box>
          </Box>
        )}
        <Divider />
        {options
          .filter((item) =>
            searchText && searchText.length
              ? item.label.toLowerCase().includes(searchText.toLowerCase())
              : true
          )
          .map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              onClick={handleMenuItemClick}
            >
              {props.multiple ? (
                <>
                  <Checkbox checked={value.indexOf(option.value) > -1} />
                  <ListItemText primary={option.label} />
                </>
              ) : (
                <>{option.label}</>
              )}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default AdvancedSelect;
