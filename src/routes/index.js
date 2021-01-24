import React from "react";

import async from "../components/Async";

import {
  BookOpen,
  Briefcase,
  Calendar as CalendarIcon,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  ShoppingCart,
  PieChart,
  Sliders,
  Users,
} from "react-feather";

// Guards
const AuthGuard = async(() => import("../components/AuthGuard"));

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// Components components
const Alerts = async(() => import("../pages/components/Alerts"));
const Avatars = async(() => import("../pages/components/Avatars"));
const Badges = async(() => import("../pages/components/Badges"));
const Buttons = async(() => import("../pages/components/Buttons"));
const Cards = async(() => import("../pages/components/Cards"));
const Chips = async(() => import("../pages/components/Chips"));
const Dialogs = async(() => import("../pages/components/Dialogs"));
const ExpPanels = async(() => import("../pages/components/ExpansionPanels"));
const Lists = async(() => import("../pages/components/Lists"));
const Menus = async(() => import("../pages/components/Menus"));
const Pagination = async(() => import("../pages/components/Pagination"));
const Progress = async(() => import("../pages/components/Progress"));
const Snackbars = async(() => import("../pages/components/Snackbars"));
const Tooltips = async(() => import("../pages/components/Tooltips"));

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));
const SaaS = async(() => import("../pages/dashboards/SaaS"));

// Forms components
const Pickers = async(() => import("../pages/forms/Pickers"));
const SelectionCtrls = async(() => import("../pages/forms/SelectionControls"));
const Selects = async(() => import("../pages/forms/Selects"));
const TextFields = async(() => import("../pages/forms/TextFields"));
const Dropzone = async(() => import("../pages/forms/Dropzone"));
const Editors = async(() => import("../pages/forms/Editors"));
const Formik = async(() => import("../pages/forms/Formik"));

// Icons components
const MaterialIcons = async(() => import("../pages/icons/MaterialIcons"));
const FeatherIcons = async(() => import("../pages/icons/FeatherIcons"));

// Pages components
const Blank = async(() => import("../pages/pages/Blank"));
const InvoiceDetails = async(() => import("../pages/pages/InvoiceDetails"));
const InvoiceList = async(() => import("../pages/pages/InvoiceList"));
const Orders = async(() => import("../pages/pages/Orders"));
const Pricing = async(() => import("../pages/pages/Pricing"));
const Profile = async(() => import("../pages/pages/Profile"));
const Settings = async(() => import("../pages/pages/Settings"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Projects = async(() => import("../pages/pages/Projects"));
const Calendar = async(() => import("../pages/pages/Calendar"));
const Chat = async(() => import("../pages/pages/Chat"));

// Tables components
const SimpleTable = async(() => import("../pages/tables/SimpleTable"));
const AdvancedTable = async(() => import("../pages/tables/AdvancedTable"));
const DataGrid = async(() => import("../pages/tables/DataGrid"));

// Chart components
const Chartjs = async(() => import("../pages/charts/Chartjs"));

// Maps components
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));

// Documentation
const Welcome = async(() => import("../pages/docs/Welcome"));
const GettingStarted = async(() => import("../pages/docs/GettingStarted"));
const EnvironmentVariables = async(() =>
  import("../pages/docs/EnvironmentVariables")
);
const Deployment = async(() => import("../pages/docs/Deployment"));
const Theming = async(() => import("../pages/docs/Theming"));
const StateManagement = async(() => import("../pages/docs/StateManagement"));
const APICalls = async(() => import("../pages/docs/APICalls"));
const ESLintAndPrettier = async(() =>
  import("../pages/docs/ESLintAndPrettier")
);
const Support = async(() => import("../pages/docs/Support"));
const Changelog = async(() => import("../pages/docs/Changelog"));

const dashboardsRoutes = {
  id: "Dashboard",
  path: "/",
  header: "Pages",
  icon: <Sliders />,
  containsHome: true,
  children: [
    {
      path: "/",
      name: "Default",
      component: Default,
      guard: AuthGuard,
    },
    {
      path: "/analytics",
      name: "Analytics",
      component: Analytics,
      guard: AuthGuard,
    },
    {
      path: "/saas",
      name: "SaaS",
      component: SaaS,
      guard: AuthGuard,
    },
  ],
  component: null,
};

const pagesRoutes = {
  id: "Pages",
  path: "/pages",
  icon: <Layout />,
  children: [
    {
      path: "/pages/profile",
      name: "Profile",
      component: Profile,
      guard: AuthGuard,
    },
    {
      path: "/pages/settings",
      name: "Settings",
      component: Settings,
      guard: AuthGuard,
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      component: Pricing,
      guard: AuthGuard,
    },
    {
      path: "/pages/chat",
      name: "Chat",
      component: Chat,
      guard: AuthGuard,
    },
    {
      path: "/pages/blank",
      name: "Blank Page",
      component: Blank,
      guard: AuthGuard,
    },
  ],
  component: null,
};

const projectsRoutes = {
  id: "Projects",
  path: "/projects",
  icon: <Briefcase />,
  badge: "8",
  component: Projects,
  children: null,
  guard: AuthGuard,
};

const invoiceRoutes = {
  id: "Invoices",
  path: "/invoices",
  icon: <CreditCard />,
  children: [
    {
      path: "/invoices",
      name: "List",
      component: InvoiceList,
      guard: AuthGuard,
    },
    {
      path: "/invoices/detail",
      name: "Details",
      component: InvoiceDetails,
      guard: AuthGuard,
    },
  ],
  component: null,
};

const orderRoutes = {
  id: "Orders",
  path: "/orders",
  icon: <ShoppingCart />,
  component: Orders,
  guard: AuthGuard,
  children: null,
};

const tasksRoutes = {
  id: "Tasks",
  path: "/tasks",
  icon: <CheckSquare />,
  badge: "17",
  component: Tasks,
  guard: AuthGuard,
  children: null,
};

const calendarRoutes = {
  id: "Calendar",
  path: "/calendar",
  icon: <CalendarIcon />,
  component: Calendar,
  guard: AuthGuard,
  children: null,
};

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

const componentsRoutes = {
  id: "Components",
  path: "/components",
  header: "Elements",
  icon: <Grid />,
  children: [
    {
      path: "/components/alerts",
      name: "Alerts",
      component: Alerts,
      guard: AuthGuard,
    },
    {
      path: "/components/avatars",
      name: "Avatars",
      component: Avatars,
      guard: AuthGuard,
    },
    {
      path: "/components/badges",
      name: "Badges",
      component: Badges,
      guard: AuthGuard,
    },
    {
      path: "/components/buttons",
      name: "Buttons",
      component: Buttons,
      guard: AuthGuard,
    },
    {
      path: "/components/cards",
      name: "Cards",
      component: Cards,
      guard: AuthGuard,
    },
    {
      path: "/components/chips",
      name: "Chips",
      component: Chips,
      guard: AuthGuard,
    },
    {
      path: "/components/dialogs",
      name: "Dialogs",
      component: Dialogs,
      guard: AuthGuard,
    },
    {
      path: "/components/expansion-panels",
      name: "Expansion Panels",
      component: ExpPanels,
      guard: AuthGuard,
    },
    {
      path: "/components/lists",
      name: "Lists",
      component: Lists,
      guard: AuthGuard,
    },
    {
      path: "/components/menus",
      name: "Menus",
      component: Menus,
      guard: AuthGuard,
    },
    {
      path: "/components/pagination",
      name: "Pagination",
      component: Pagination,
      guard: AuthGuard,
    },
    {
      path: "/components/progress",
      name: "Progress",
      component: Progress,
      guard: AuthGuard,
    },
    {
      path: "/components/snackbars",
      name: "Snackbars",
      component: Snackbars,
      guard: AuthGuard,
    },
    {
      path: "/components/tooltips",
      name: "Tooltips",
      component: Tooltips,
      guard: AuthGuard,
    },
  ],
  component: null,
};

const formsRoutes = {
  id: "Forms",
  path: "/forms",
  icon: <CheckSquare />,
  children: [
    {
      path: "/forms/pickers",
      name: "Pickers",
      component: Pickers,
      guard: AuthGuard,
    },
    {
      path: "/forms/selection-controls",
      name: "Selection Controls",
      component: SelectionCtrls,
      guard: AuthGuard,
    },
    {
      path: "/forms/selects",
      name: "Selects",
      component: Selects,
      guard: AuthGuard,
    },
    {
      path: "/forms/text-fields",
      name: "Text Fields",
      component: TextFields,
      guard: AuthGuard,
    },
    {
      path: "/forms/dropzone",
      name: "Dropzone",
      component: Dropzone,
      guard: AuthGuard,
    },
    {
      path: "/forms/editors",
      name: "Editors",
      component: Editors,
      guard: AuthGuard,
    },
    {
      path: "/forms/formik",
      name: "Formik",
      component: Formik,
      guard: AuthGuard,
    },
  ],
  component: null,
};

const tablesRoutes = {
  id: "Tables",
  path: "/tables",
  icon: <List />,
  children: [
    {
      path: "/tables/simple-table",
      name: "Simple Table",
      component: SimpleTable,
      guard: AuthGuard,
    },
    {
      path: "/tables/advanced-table",
      name: "Advanced Table",
      component: AdvancedTable,
      guard: AuthGuard,
    },
    {
      path: "/tables/data-grid",
      name: "Data Grid",
      component: DataGrid,
      guard: AuthGuard,
    },
  ],
  component: null,
};

const iconsRoutes = {
  id: "Icons",
  path: "/icons",
  icon: <Heart />,
  children: [
    {
      path: "/icons/material-icons",
      name: "Material Icons",
      component: MaterialIcons,
      guard: AuthGuard,
    },
    {
      path: "/icons/feather-icons",
      name: "Feather Icons",
      component: FeatherIcons,
      guard: AuthGuard,
    },
  ],
  component: null,
};

const chartRoutes = {
  id: "Charts",
  path: "/charts",
  icon: <PieChart />,
  component: Chartjs,
  children: null,
  guard: AuthGuard,
};

const mapsRoutes = {
  id: "Maps",
  path: "/maps",
  icon: <Map />,
  children: [
    {
      path: "/maps/google-maps",
      name: "Google Maps",
      component: GoogleMaps,
      guard: AuthGuard,
    },
    {
      path: "/maps/vector-maps",
      name: "Vector Maps",
      component: VectorMaps,
      guard: AuthGuard,
    },
  ],
  component: null,
};

const documentationRoutes = {
  id: "Documentation",
  path: "/documentation",
  header: "Material App",
  icon: <BookOpen />,
  children: [
    {
      path: "/documentation/welcome",
      name: "Welcome",
      component: Welcome,
      guard: AuthGuard,
    },
    {
      path: "/documentation/getting-started",
      name: "Getting Started",
      component: GettingStarted,
      guard: AuthGuard,
    },
    {
      path: "/documentation/environment-variables",
      name: "Environment Variables",
      component: EnvironmentVariables,
      guard: AuthGuard,
    },
    {
      path: "/documentation/deployment",
      name: "Deployment",
      component: Deployment,
      guard: AuthGuard,
    },
    {
      path: "/documentation/theming",
      name: "Theming",
      component: Theming,
      guard: AuthGuard,
    },
    {
      path: "/documentation/state-management",
      name: "State Management",
      component: StateManagement,
      guard: AuthGuard,
    },
    {
      path: "/documentation/api-calls",
      name: "API Calls",
      component: APICalls,
      guard: AuthGuard,
    },
    {
      path: "/documentation/eslint-and-prettier",
      name: "ESLint & Prettier",
      component: ESLintAndPrettier,
      guard: AuthGuard,
    },
    {
      path: "/documentation/support",
      name: "Support",
      component: Support,
      guard: AuthGuard,
    },
  ],
  component: null,
};

const changelogRoutes = {
  id: "Changelog",
  path: "/changelog",
  badge: "v2.0.0",
  icon: <List />,
  component: Changelog,
  children: null,
  guard: AuthGuard,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardsRoutes,
  pagesRoutes,
  projectsRoutes,
  orderRoutes,
  invoiceRoutes,
  tasksRoutes,
  calendarRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  tablesRoutes,
  iconsRoutes,
  mapsRoutes,
  documentationRoutes,
  changelogRoutes,
];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  pagesRoutes,
  projectsRoutes,
  orderRoutes,
  invoiceRoutes,
  tasksRoutes,
  calendarRoutes,
  authRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  tablesRoutes,
  iconsRoutes,
  mapsRoutes,
  documentationRoutes,
  changelogRoutes,
];
