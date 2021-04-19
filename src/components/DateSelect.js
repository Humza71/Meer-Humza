import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  Box,
  MenuItem,
  Select as MuiSelect,
  Typography,
} from "@material-ui/core";

const Select = styled(MuiSelect)`
  min-width: 130px;
`;

const Months = [
  {
    label: "January",
    dates: 31,
  },
  {
    label: "February",
    dates: 28,
  },
  {
    label: "March",
    dates: 31,
  },
  {
    label: "April",
    dates: 30,
  },
  {
    label: "May",
    dates: 31,
  },
  {
    label: "June",
    dates: 30,
  },
  {
    label: "July",
    dates: 31,
  },
  {
    label: "August",
    dates: 31,
  },
  {
    label: "September",
    dates: 30,
  },
  {
    label: "October",
    dates: 31,
  },
  {
    label: "November",
    dates: 30,
  },
  {
    label: "December",
    dates: 31,
  },
];

const DateSelect = (props) => {
  const { value, label, onChange } = props;
  const [date, setDate] = useState(new Date(value).getUTCDate());
  const [month, setMonth] = useState(new Date(value).getMonth() + 1);
  const [year, setYear] = useState(new Date(value).getFullYear());

  const handleDateChange = (event) => {
    setDate(event.target.value);
    onChange(new Date(`${year}/${month}/${event.target.value}`));
  };
  const handleMonthChange = (event) => {
    let newDate = date;
    if (date > Months[event.target.value - 1].dates) {
      newDate = Months[event.target.value - 1].dates;
      setDate(newDate);
    }
    setMonth(event.target.value);
    onChange(new Date(`${year}/${event.target.value}/${newDate}`));
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
    onChange(new Date(`${event.target.value}/${month}/${date}`));
  };

  const getAllYears = () => {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 100))
      .fill("")
      .map((v, idx) => now - idx)
      .reverse();
  };

  return (
    <>
      <Typography variant="subtitle1" mb={1}>
        {label}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Select
          id="date-select"
          value={date}
          onChange={handleDateChange}
          variant="outlined"
        >
          {[...Array(Months[month - 1].dates).keys()].map((item) => (
            <MenuItem value={item + 1}>{item + 1}</MenuItem>
          ))}
        </Select>
        <Select
          id="month-select"
          value={month}
          onChange={handleMonthChange}
          variant="outlined"
        >
          {Months.map((item, index) => (
            <MenuItem value={index + 1}>{item.label}</MenuItem>
          ))}
        </Select>
        <Select
          id="year-select"
          value={year}
          onChange={handleYearChange}
          variant="outlined"
        >
          {[...getAllYears()].map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </Box>
    </>
  );
};

export default DateSelect;
