import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components/macro";

import { AppBar, Box, Tab, Tabs } from "@material-ui/core";
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

const CreateReport = () => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);

  useEffect(() => {
    dispatch(setHeaderTitle("Create Report"));
  }, []);

  return (
    <React.Fragment>
      <Helmet title="Create Report" />
      <AppBar position="static">
        <Tabs
          value={tabIndex}
          variant="scrollable"
          scrollButtons="on"
          onChange={(event, newValue) => setTabIndex(newValue)}
          aria-label="Tabs"
        >
          <Tab
            label="PATIENT DEMOGRAPHICS"
            icon={<UserIcon />}
            {...a11yProps(0)}
          />
          <Tab label="FILES" icon={<FileIcon />} {...a11yProps(1)} />
          <Tab label="HISTORY" icon={<HistoryIcon />} {...a11yProps(2)} />
          <Tab
            label="POSTURAL STABILITY"
            icon={<DirectionsWalkIcon />}
            {...a11yProps(3)}
          />
          <Tab
            label="VNG"
            icon={<YoutubeSearchedForIcon />}
            {...a11yProps(4)}
          />
          <Tab
            label="ROTARY CHAIR"
            icon={<AirlineSeatLegroomNormalIcon />}
            {...a11yProps(5)}
          />
          <Tab label="vHIT" icon={<TimelapseIcon />} {...a11yProps(6)} />
          <Tab label="VAT/VORTEQ" icon={<SlidersIcon />} {...a11yProps(7)} />
          <Tab label="ELECTROPHYS" icon={<ActivityIcon />} {...a11yProps(8)} />
          <Tab
            label="AUDIOMETRY"
            icon={<RecordVoiceOverIcon />}
            {...a11yProps(9)}
          />
          <Tab
            label="SCREENINGS"
            icon={<ScreenShareIcon />}
            {...a11yProps(10)}
          />
          <Tab
            label="ADD.TESTS & COMMENTS"
            icon={<AddCommentIcon />}
            {...a11yProps(11)}
          />
          <Tab
            label="IMPRESSION & PLAN"
            icon={<SentimentVerySatisfiedIcon />}
            {...a11yProps(12)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={tabIndex} index={0}>
        <BasicForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <BasicForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <BasicForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <BasicForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={4}>
        <BasicForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={5}>
        <BasicForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={6}>
        <BasicForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={7}>
        <BasicForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={8}>
        <BasicForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={9}>
        <BasicForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={10}>
        <BasicForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={11}>
        <BasicForm />
      </TabPanel>
      <TabPanel value={tabIndex} index={12}>
        <BasicForm />
      </TabPanel>
    </React.Fragment>
  );
};

export default CreateReport;
