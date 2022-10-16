/** 
  All of the routes for the FMP Technologies React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// FMP Technologies React layouts
// import { useNavigate } from "react-router-dom";
// import useAuth from './layouts/authentication/GuardedRoute'

import Dashboard from "layouts/dashboard";
// import Stocks from "layouts/stock";
import Branches from "layouts/branches";
// import Billing from "layouts/reports";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
// import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";
import Reports from "layouts/reports";
import StockTransfer from "layouts/transfer";
import Ledger from "layouts/mobile";
// import Table from "layouts/table/Table";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "",
    icon: <Icon fontSize="small">web</Icon>,
    route: "/",
    isForBranch:false,
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Digital Ledger",
    key: "ledger",
    icon: <Icon fontSize="small">analytics</Icon>,
    route: "/ledger",
    component: <Ledger />,
  },
  // {
  //   type: "collapse",
  //   name: "Stocks",
  //   key: "stock",
  //   icon: <Icon fontSize="small">bar_chart</Icon>,
  //   route: "/stock",
  //   component: <Stocks />,
  // },
 
  {
    type: "collapse",
    name: "Stock",
    key: "stock-transfer",
    icon: <Icon fontSize="small">bar_chart</Icon>,
    route: "/stock-transfer",
    component: <StockTransfer />,
  },
  {
    type: "collapse",
    name: "Branches",
    key: "branches",
    icon: <Icon fontSize="small">account_tree</Icon>,
    route: "/branches",
    component: <Branches />,
  },
  {
    type: "collapse",
    name: "Reports",
    key: "reports",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/reports",
    component: <Reports />,
  },
  // {
  //   type: "collapse",
  //   name: "Table",
  //   key: "table",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/table",
  //   component: <Table />,
  // },

  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Log Out",
  //   key: "sign-out",
  //   icon: <Icon fontSize="small">logout</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
];

export default routes;
