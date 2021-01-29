import React from "react";

import async from "../components/Async";

import {
  Dashboard as DashboardIcon,
  CreditCard,
  Contacts as ContactIcon,
} from "@material-ui/icons";
import { List, Users } from "react-feather";

// Guards
const AuthGuard = async(() => import("../components/AuthGuard"));

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// Dashboards components
const Dashboard = async(() => import("../pages/dashboard"));
const Contact = async(() => import("../pages/contact"));
const Billing = async(() => import("../pages/billing"));
const Licenses = async(() => import("../pages/licenses"));
const Clients = async(() => import("../pages/clients"));

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
};

const dashboardsRoutes = {
  id: "Dashboard",
  path: "/",
  icon: <DashboardIcon />,
  containsHome: true,
  name: "Dashboard",
  component: Dashboard,
  guard: AuthGuard,
};

const billingRoutes = {
  id: "Billing Settings",
  path: "/billing",
  icon: <CreditCard />,
  component: Billing,
  guard: AuthGuard,
};

const clientsRoutes = {
  id: "Manage Clients",
  path: "/clients",
  icon: <Users />,
  component: Clients,
  guard: AuthGuard,
};
const licenseRoutes = {
  id: "Manage Licences",
  path: "/licenses",
  icon: <List />,
  component: Licenses,
  guard: AuthGuard,
};

const contactRoutes = {
  id: "Contact Support",
  path: "/contact",
  icon: <ContactIcon />,
  component: Contact,
  guard: AuthGuard,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardsRoutes,
  clientsRoutes,
  licenseRoutes,
  billingRoutes,
  contactRoutes,
];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  clientsRoutes,
  licenseRoutes,
  billingRoutes,
  contactRoutes,
];
