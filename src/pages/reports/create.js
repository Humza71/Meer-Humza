import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components/macro";

import { AppBar, Box, Tab as MuiTab, Tabs } from "@material-ui/core";
import {
  History as HistoryIcon,
  DirectionsWalk as DirectionsWalkIcon,
  YoutubeSearchedFor as YoutubeSearchedForIcon,
  AirlineSeatLegroomNormal as AirlineSeatLegroomNormalIcon,
  Timelapse as TimelapseIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  ScreenShare as ScreenShareIcon,
  AddComment as AddCommentIcon,
  SentimentVerySatisfied as SentimentVerySatisfiedIcon,
} from "@material-ui/icons";
import {
  User as UserIcon,
  File as FileIcon,
  Sliders as SlidersIcon,
  Activity as ActivityIcon,
} from "react-feather";

import UploadedFilesButton from "components/UploadedFilesButton";
import PatientForm from "forms/PatientForm";
import FilesForm from "forms/FilesForm";
import { setHeaderTitle, setStepNewReport } from "redux/reducers/uiReducer";

const a11yProps = (index) => {
  return {
    id: `create-report-tab-${index}`,
    "aria-controls": `create-report-tabpanel-${index}`,
  };
};

const TabContent = styled(Box)`
  background: ${(props) => props.theme.palette.background.default};
  height: calc(100% - 70px);
`;
const Tab = styled(MuiTab)`
  border-color: ;
  margin-right: ${(props) => props.theme.spacing(props.mr)}px;
  min-width: ${(props) => props.theme.spacing(props.width)}px;
  color: ${(props) => props.tabcolor};
  border: 1px solid ${(props) => props.tabcolor};
  border-bottom: 0px;
  background-color: transparent;
  opacity: 1;
  &:not(.Mui-selected) {
    color: white;
    background-color: ${(props) => props.tabcolor};
  }
  &:first-child {
    margin-left: ${(props) => props.theme.spacing(5)}px;
  }
  &:last-child {
    margin-right: ${(props) => props.theme.spacing(5)}px;
  }
`;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <TabContent
      role="tabpanel"
      hidden={value !== index}
      id={`create-report-tabpanel-${index}`}
      aria-labelledby={`create-report-tab-${index}`}
      position="relative"
      {...other}
    >
      {value === index && <>{children}</>}
    </TabContent>
  );
};

const tabsInfo = [
  {
    label: "PATIENT DEMOGRAPHICS",
    icon: UserIcon,
    backgroundColor: "#09539E",
    component: PatientForm,
  },
  {
    label: "FILES",
    icon: FileIcon,
    backgroundColor: "#7A54FF",
    component: FilesForm,
  },
  {
    label: "HISTORY",
    icon: HistoryIcon,
    backgroundColor: "#36B2F9",
    component: PatientForm,
  },
  {
    label: "POSTURAL STABILITY",
    icon: DirectionsWalkIcon,
    backgroundColor: "#12D9DB",
    component: PatientForm,
  },
  {
    label: "VNG",
    icon: YoutubeSearchedForIcon,
    backgroundColor: "#1CCBB0",
    component: PatientForm,
  },
  {
    label: "ROTARY CHAIR",
    icon: AirlineSeatLegroomNormalIcon,
    backgroundColor: "#32D74B",
    component: PatientForm,
  },
  {
    label: "vHIT",
    icon: TimelapseIcon,
    backgroundColor: "#96DA45",
    component: PatientForm,
  },
  {
    label: "VAT/VORTEQ",
    icon: SlidersIcon,
    backgroundColor: "#FF8F61",
    component: PatientForm,
  },
  {
    label: "ELECTROPHYS",
    icon: ActivityIcon,
    backgroundColor: "#FF6968",
    component: PatientForm,
  },
  {
    label: "AUDIOMETRY",
    icon: RecordVoiceOverIcon,
    backgroundColor: "#DFAD00",
    component: PatientForm,
  },
  {
    label: "SCREENINGS",
    icon: ScreenShareIcon,
    backgroundColor: "#F08115",
    component: PatientForm,
  },
  {
    label: "ADD.TESTS & COMMENTS",
    icon: AddCommentIcon,
    backgroundColor: "#EC524B",
    component: PatientForm,
  },
  {
    label: "IMPRESSION & PLAN",
    icon: SentimentVerySatisfiedIcon,
    backgroundColor: "#EF3175",
    component: PatientForm,
  },
];

const CreateReport = () => {
  const dispatch = useDispatch();
  const stepNewReport = useSelector((state) => state.uiReducer.stepNewReport);

  const handleTabChange = (value) => {
    dispatch(setStepNewReport(value));
  };

  useEffect(() => {
    dispatch(setHeaderTitle("Create Report"));
    dispatch(setStepNewReport(0));
  }, []);

  return (
    <Box pt={10} display="flex" flexDirection="column" height="100%">
      <Helmet title="Create Report" />
      <AppBar position="static" color="default">
        <Tabs
          value={stepNewReport}
          variant="scrollable"
          scrollButtons="on"
          onChange={(event, newValue) => handleTabChange(newValue)}
          aria-label="Tabs"
        >
          {tabsInfo.map((tabItem, index) => (
            <Tab
              label={tabItem.label}
              icon={<tabItem.icon />}
              tabcolor={tabItem.backgroundColor}
              width={55}
              mr={index < tabsInfo.length - 1 ? 1 : 0}
              {...a11yProps(index)}
              key={index}
            />
          ))}
        </Tabs>
      </AppBar>
      {tabsInfo.map((tabItem, index) => (
        <TabPanel value={stepNewReport} index={index} key={index}>
          <tabItem.component />
        </TabPanel>
      ))}
      <UploadedFilesButton />
    </Box>
  );
};

export default CreateReport;
