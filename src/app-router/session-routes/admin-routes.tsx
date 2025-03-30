import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useProviderSelector } from "../../store";
import { useAppFunctions } from "../../hooks";
import { routesApp } from "../interface-routes";

export const AdminRoutes: React.FC = () => {
  const navigate = useNavigate();

  const { loginAccount } = useProviderSelector("loginAccount");
  const { getAuthToken } = useAppFunctions();

  React.useEffect(() => {
    const token = getAuthToken();
    if (!token || token?.role_user !== "admin") {
      navigate(routesApp.root);
    } else {
      loginAccount && loginAccount(token);
    }
  }, []);

  return <Outlet />;
};
