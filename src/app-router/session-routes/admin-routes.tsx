import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { GlobalAppContext, GlobalStateApp } from "../../core";
import { useAppFunctions } from "../../hooks";
import { routesApp } from "../interface-routes";

export const AdminRoutes: React.FC = () => {
  const navigate = useNavigate();

  const { loginAccount } = useContext<GlobalStateApp>(GlobalAppContext);

  const { getAuthToken } = useAppFunctions();

  React.useEffect(() => {
    const token = getAuthToken();
    if (!token || token?.role_user !== "admin") {
      navigate(routesApp.root);
    } else {
      loginAccount(token);
    }
  }, []);

  return <Outlet />;
};
