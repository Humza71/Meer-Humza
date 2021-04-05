import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dashboardLayoutRoutes, authLayoutRoutes } from "./index";
import { userInfo } from "redux/reducers/authReducer";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";

const childRoutes = (Layout, routes) =>
  routes.map(({ component: Component, guard, children, path }, index) => {
    const Guard = guard || React.Fragment;

    return children ? (
      children.map((element, index) => {
        const Guard = element.guard || React.Fragment;

        return (
          <Route
            key={index}
            path={element.path}
            exact
            render={(props) => (
              <Guard>
                <Layout>
                  <element.component {...props} />
                </Layout>
              </Guard>
            )}
          />
        );
      })
    ) : Component ? (
      <Route
        key={index}
        path={path}
        exact
        render={(props) => (
          <Guard>
            <Layout>
              <Component {...props} />
            </Layout>
          </Guard>
        )}
      />
    ) : null;
  });

const Routes = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.authReducer.user) || {};
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    if (token) {
      dispatch(userInfo());
    }
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        {childRoutes(
          DashboardLayout,
          dashboardLayoutRoutes.filter((category) =>
            category.role.some((name) => name === user.role)
          )
        )}
        {childRoutes(AuthLayout, authLayoutRoutes)}
        {Object.keys(user).length > 0 && (
          <Route
            render={() => (
              <AuthLayout>
                <Page404 />
              </AuthLayout>
            )}
          />
        )}
      </Switch>
    </Router>
  );
};

export default Routes;
