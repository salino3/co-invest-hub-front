import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppFunctions } from "../../hooks";
import { routesApp } from "../interface-routes";
import { GlobalAppContext, GlobalStateApp } from "../../core";

export const PublicRoutes: React.FC = () => {
  const navigate = useNavigate();
  const {
    logoutAccount,
    state: { currentAccount },
  } = useContext<GlobalStateApp>(GlobalAppContext);
  const { getAuthToken } = useAppFunctions();

  const token = getAuthToken();
  React.useEffect(() => {
    if (token && token?.account_id) {
      navigate(routesApp.dashboard);
    } else {
      if (currentAccount?.email) {
        logoutAccount();
      }
    }
  }, []);

  return <Outlet />;
};
