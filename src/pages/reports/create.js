import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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

import BasicForm from "forms/BasicForm";
import { setHeaderTitle } from "redux/reducers/uiReducer";

function a11yProps(index) {
  return {
    id: `create-report-tab-${index}`,
    "aria-controls": `create-report-tabpanel-${index}`,
  };
}

const TabContent = styled(Box)`
  background: ${(props) => props.theme.palette.background.default};
`;
// const Tab = styled(MuiTab)`
//   background: ${(props) => props.backgroundColor};
//   border-color: ${(props) => props.backgroundColor};
//   margin-right: ${(props) => props.theme.spacing(props.mr)}px;
//   min-width: ${(props) => props.theme.spacing(props.width)}px;
//   opacity: 1;
//   "&.mui-selected": {
//     color: ${(props) => props.backgroundColor};
//     border: 1px 1px 0 1px;
//     background-color: "transparent";
//   }
// `;
const Tab = styled(MuiTab)`
  background: ${(props) => props.backgroundColor};
  border-color: ${(props) => props.backgroundColor};
  margin-right: ${(props) => props.theme.spacing(props.mr)}px;
  min-width: ${(props) => props.theme.spacing(props.width)}px;
  opacity: 1;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <TabContent
      role="tabpanel"
      hidden={value !== index}
      id={`create-report-tabpanel-${index}`}
      aria-labelledby={`create-report-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </TabContent>
  );
}

const tabsInfo = [
  {
    label: "PATIENT DEMOGRAPHICS",
    icon: UserIcon,
    backgroundColor: "#09539E",
    component: BasicForm,
  },
  {
    label: "FILES",
    icon: FileIcon,
    backgroundColor: "#7A54FF",
    component: BasicForm,
  },
  {
    label: "HISTORY",
    icon: HistoryIcon,
    backgroundColor: "#36B2F9",
    component: BasicForm,
  },
  {
    label: "POSTURAL STABILITY",
    icon: DirectionsWalkIcon,
    backgroundColor: "#12D9DB",
    component: BasicForm,
  },
  {
    label: "VNG",
    icon: YoutubeSearchedForIcon,
    backgroundColor: "#1CCBB0",
    component: BasicForm,
  },
  {
    label: "ROTARY CHAIR",
    icon: AirlineSeatLegroomNormalIcon,
    backgroundColor: "#32D74B",
    component: BasicForm,
  },
  {
    label: "vHIT",
    icon: TimelapseIcon,
    backgroundColor: "#96DA45",
    component: BasicForm,
  },
  {
    label: "VAT/VORTEQ",
    icon: SlidersIcon,
    backgroundColor: "#FF8F61",
    component: BasicForm,
  },
  {
    label: "ELECTROPHYS",
    icon: ActivityIcon,
    backgroundColor: "#FF6968",
    component: BasicForm,
  },
  {
    label: "AUDIOMETRY",
    icon: RecordVoiceOverIcon,
    backgroundColor: "#DFAD00",
    component: BasicForm,
  },
  {
    label: "SCREENINGS",
    icon: ScreenShareIcon,
    backgroundColor: "#F08115",
    component: BasicForm,
  },
  {
    label: "ADD.TESTS & COMMENTS",
    icon: AddCommentIcon,
    backgroundColor: "#EC524B",
    component: BasicForm,
  },
  {
    label: "IMPRESSION & PLAN",
    icon: SentimentVerySatisfiedIcon,
    backgroundColor: "#EF3175",
    component: BasicForm,
  },
];

const CreateReport = () => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);

  useEffect(() => {
    dispatch(setHeaderTitle("Create Report"));
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Create Report" />
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
          variant="scrollable"
          scrollButtons="on"
          onChange={(event, newValue) => setTabIndex(newValue)}
          aria-label="Tabs"
        >
          {tabsInfo.map((tabItem, index) => (
            <Tab
              label={tabItem.label}
              icon={<tabItem.icon />}
              backgroundColor={tabItem.backgroundColor}
              width={55}
              mr={index < tabsInfo.length - 1 ? 1 : 0}
              {...a11yProps(index)}
              key={index}
            />
          ))}
        </Tabs>
      </AppBar>
      {tabsInfo.map((tabItem, index) => (
        <TabPanel value={tabIndex} index={index} key={index}>
          <tabItem.component />
        </TabPanel>
      ))}
    </React.Fragment>
  );
};

export default CreateReport;
