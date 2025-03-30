import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useProviderSelector } from "../../store";
import { useAppFunctions } from "../../hooks";
import { routesApp } from "../interface-routes";

export const PrivateRoutes: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useProviderSelector("setCurrentUser");
  const { getAuthToken } = useAppFunctions();

  React.useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate(routesApp.root);
    } else {
      setCurrentUser && setCurrentUser(token);
    }
  }, []);

  return <Outlet />;
};
