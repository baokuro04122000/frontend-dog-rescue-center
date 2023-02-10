import { Outlet, Route, Routes as ReactRoutes } from "react-router-dom";

import {
  AUTH_PATH,
  DASHBOARD_HOME_SUBPATH,
  DASHBOARD_PATH,
  MANAGE_BREED_HOME_PATH,
  LOGIN_SUBPATH,
  SIGNUP_SUBPATH,
  MANAGE_CREATE_BREED_PATH,
  EMAIL_RESET_PASSWORD_SUBPATH,
  RESET_PASSWORD_SUBPATH
} from "../constants/routes";

import { RouteConfig } from "../interfaces/routes";
import Home from '../pages/Home'
import Breed from '../pages/Breed'
import Layout from '../layout'
import CreateBreed from '../pages/CreateBreed'
import Login from "../pages/Login";
import SignUp from '../pages/SignUp';
import EmailResetPassword from '../pages/EmailResetPassword';
import ResetPassword from '../pages/ResetPassword';
import NotFound from "../pages/NotFound";
import UnauthRoute from "./UnauthRoute";
import AuthRoute from "./AuthRoute";


const unauthRoutes: RouteConfig = {
  path: AUTH_PATH,
  element: <Outlet />,
  guard: <UnauthRoute />,
  children :[
    {
      path:LOGIN_SUBPATH,
      element: <Login/>
    },
    {
      path: SIGNUP_SUBPATH,
      element: <SignUp/>
    },
    {
      path: EMAIL_RESET_PASSWORD_SUBPATH,
      element: <EmailResetPassword/>
    },
    {
      path: RESET_PASSWORD_SUBPATH,
      element: <ResetPassword />
    }
  ]
};

const homeRoutes: RouteConfig = {
  path: DASHBOARD_PATH,
  element: <Layout />,
  children :[
    {
      path:DASHBOARD_HOME_SUBPATH,
      element: <Home/>
    }
  ]
};

const adminRoutes: RouteConfig = {
  path: MANAGE_BREED_HOME_PATH,
  guard: <AuthRoute />,
  element: <Layout />,
  children: [
    {
      path: DASHBOARD_HOME_SUBPATH,
      element: <Breed />
    },
    {
      path: MANAGE_CREATE_BREED_PATH,
      element: <CreateBreed />,
    }
  ],
};

const notfoundRoute: RouteConfig = {
  path: "*",
  element: <NotFound />,
};

const routes = [unauthRoutes, homeRoutes, adminRoutes, notfoundRoute];

const Routes = () => {
  return (
    <ReactRoutes>
      {routes.map((route) => (
        <Route key={route.path} element={route.guard}>
            <Route path={route.path} element={route.element}>
              {route.children
                ? route.children.map(({ element, path }) => (
                    <Route key={path} element={route.guard}>
                        <Route path={path} element={element} />
                    </Route>
                  ))
                : null}
            </Route>
        </Route>
      ))}
    </ReactRoutes>
  );
};

export default Routes;