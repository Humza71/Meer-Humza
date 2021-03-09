import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import DateFnsUtils from "@date-io/date-fns";

import { ThemeProvider } from "styled-components/macro";
import { create } from "jss";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";

import createTheme from "./theme";
import Routes from "./routes/Routes";

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

function App() {
  const theme = useSelector((state) => state.themeReducer);
  // const dispatch = useDispatch();
  // const [isUserLoaded, setIsUserLoaded] = useState(false);

  // useEffect(() => {
  //   async function loadUser() {
  //   await dispatch(userInfo());
  //   if (localStorage.getItem("token")) setIsUserLoaded(true);
  //   }
  //   loadUser();
  //   eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // if (!isUserLoaded) {
  //   return <div></div>;
  // }
  return (
    <React.Fragment>
      <Helmet
        titleTemplate="%s | AIB"
        defaultTitle="American Institute of Balance"
      />
      <StylesProvider jss={jss}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider theme={createTheme(theme.currentTheme)}>
            <ThemeProvider theme={createTheme(theme.currentTheme)}>
              <Routes />
            </ThemeProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </React.Fragment>
  );
}

export default App;
