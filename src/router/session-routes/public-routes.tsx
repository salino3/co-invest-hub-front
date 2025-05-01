import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useProviderSelector } from "../../store";
import { useAppFunctions } from "../../hooks";
import { routesApp } from "../interface-routes";

export const PublicRoutes: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logoutAccount } = useProviderSelector(
    "currentUser",
    "logoutAccount"
  );
  const { getAuthToken, closeSession } = useAppFunctions();

  const token = getAuthToken();
  React.useEffect(() => {
    if (token && token?.id) {
      navigate(routesApp.dashboard);
    } else {
      if (currentUser?.email) {
        logoutAccount && logoutAccount();
        closeSession && closeSession();
      }
    }
  }, []);

  return <Outlet />;
};
