import { FC, ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  DASHBOARD_PATH,
} from "../constants/routes";
import { useAppSelector } from "../store";
import { selectIsAuth } from "../store/authentication/selector";

interface Props {
  children?: ReactElement;
}

const UnauthRoute: FC<Props> = () => {
  const isAuth = useAppSelector(selectIsAuth);
  if (!isAuth) return <Outlet />;
  return <Navigate to={DASHBOARD_PATH} />;
};

export default UnauthRoute;