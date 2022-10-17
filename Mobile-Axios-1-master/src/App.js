import { useState, useEffect } from "react";
// react-router components
import {
  Routes,
  Route,
  // Navigate, 
  useLocation
} from "react-router-dom";

// import Dashboard from "layouts/dashboard";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// FMP Technologies React components
import MDBox from "components/MDBox";

// FMP Technologies React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// FMP Technologies React themes
import theme from "assets/theme";


// FMP Technologies React Dark Mode themes
import themeDark from "assets/theme-dark";

// FMP Technologies React routes
import routes from "routes";

// FMP Technologies React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import PrivateRoute from "layouts/authentication/GuardedRoute";
import Dashboard from "layouts/dashboard";
import Stock from "layouts/stock";
import StockTransfer from "layouts/transfer"
import Branches from "layouts/branches";
import Reports from "layouts/reports";
import Ledger from "layouts/mobile";
import AdminLogin from "layouts/authentication/sign-in/adminLogin";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import UserProfile from "layouts/userProfile";
// import Table from "layouts/table/Table";

export default function App() {

  const [controller, dispatch] = useMaterialUIController();

  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;

  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // const getRoutes = (allRoutes) =>
  //   allRoutes.map((route) => {
  //     if (route.collapse) {
  //       return getRoutes(route.collapse);
  //     }

  //     if (route.route) {
  //       return <Route exact path={route.route} element={route.component} key={route.key} />;
  //     }

  //     return null;
  //   });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav color={sidenavColor} brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="FMP Technologies" routes={routes} onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave} />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" &&
        <Configurator />
      }

      <Routes>
        <Route exact path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='stock' element={<Stock />} />
          <Route path='/ledger' element={<Ledger />} />
          <Route path="/stock-transfer" element={<StockTransfer />} />
          <Route path='/branches' element={<Branches />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="/adminlogin" element={<AdminLogin />} />

      </Routes>
      {/* </div> */}


      {/* <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Navigate to="/" />} />
      </Routes> */}

    </ThemeProvider>
  );
}





// cSpell:ignore FMP