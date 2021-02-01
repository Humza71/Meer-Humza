const overrides = {
  MuiCard: {
    root: {
      borderRadius: "6px",
      boxShadow:
        "rgba(50, 50, 93, 0.025) 0px 2px 5px -1px, rgba(0, 0, 0, 0.05) 0px 1px 3px -1px",
    },
  },
  MuiCardHeader: {
    action: {
      marginTop: "-4px",
      marginRight: "-4px",
    },
  },
  MuiPickersDay: {
    day: {
      fontWeight: "300",
    },
  },
  MuiPickersYear: {
    root: {
      height: "64px",
    },
  },
  MuiPickersCalendar: {
    transitionContainer: {
      marginTop: "6px",
    },
  },
  MuiPickersCalendarHeader: {
    iconButton: {
      backgroundColor: "transparent",
      "& > *": {
        backgroundColor: "transparent",
      },
    },
    switchHeader: {
      marginTop: "2px",
      marginBottom: "4px",
    },
  },
  MuiPickersClock: {
    container: {
      margin: `32px 0 4px`,
    },
  },
  MuiPickersClockNumber: {
    clockNumber: {
      left: `calc(50% - 16px)`,
      width: "32px",
      height: "32px",
    },
  },
  MuiPickerDTHeader: {
    dateHeader: {
      "& h4": {
        fontSize: "2.125rem",
        fontWeight: 400,
      },
    },
    timeHeader: {
      "& h3": {
        fontSize: "3rem",
        fontWeight: 400,
      },
    },
  },
  MuiPickersTimePicker: {
    hourMinuteLabel: {
      "& h2": {
        fontSize: "3.75rem",
        fontWeight: 300,
      },
    },
  },
  MuiPickersToolbar: {
    toolbar: {
      "& h4": {
        fontSize: "2.125rem",
        fontWeight: 400,
      },
    },
  },
  MuiChip: {
    root: {
      borderRadius: "6px",
    },
  },
  MuiTableCell: {
    stickyHeader: {
      backgroundColor: "#09539E",
    },
  },
  MuiTableSortLabel: {
    root: {
      color: "white",
      "&:hover": {
        color: "white",
      },
    },
    active: {
      color: "white !important",
    },
    icon: {
      color: "white !important",
    },
  },
  MuiAppBar: {
    colorDefault: {
      color: "white",
      backgroundColor: "transparent",
    },
  },
  MuiTabs: {
    scroller: {},
    root: {
      position: "relative",
    },
    indicator: {
      display: "none",
    },
    scrollButtons: {
      position: "absolute",
    },
  },
  MuiTabScrollButton: {
    root: {
      color: "black",
      zIndex: 1,
      opacity: 1,
      height: "100%",
      width: "100px",
      top: "0",
      "&:first-child": {
        left: "0",
        backgroundImage:
          "linear-gradient(to right, rgba(255, 255, 255, 0.9) , rgba(255, 255, 255, 0))",
      },
      "&:last-child": {
        right: "0",
        backgroundImage:
          "linear-gradient(to right, rgba(255, 255, 255, 0) , rgba(255, 255, 255, 0.9))",
      },
      "&> .MuiSvgIcon-root": {
        width: "1.5em",
        height: "1.5em",
        padding: "4px",
        borderRadius: "100%",
        background: "white",
        boxShadow: "rgb(0 0 0 / 20%) 1px 2px 2px 2px",
      },
    },
  },
  MuiTab: {
    root: {},
    labelIcon: {
      minHeight: "60px",
      borderRadius: "6px 6px 0 0",
    },
    wrapper: {
      flexDirection: "row",
      "&> *:first-child": {
        margin: "0 6px 0 0 !important",
      },
    },
  },
};

export default overrides;
