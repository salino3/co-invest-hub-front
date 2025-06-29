import React, { JSX } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AdminRoutes, PrivateRoutes, PublicRoutes } from "./session-routes";
import { ContainerLayout } from "../layout";
import { CompanyPage, Dashboard, HomePage } from "../pods";
import { routesApp } from "./interface-routes";

interface PropsRoutes {
  path: string;
  element: JSX.Element;
  visibility: "public" | "private" | "restricted" | "admin";
}

const routes: PropsRoutes[] = [
  {
    path: routesApp?.root,
    element: <HomePage />,
    visibility: "public",
  },
  {
    path: routesApp?.company(":name", ":id"),
    element: <CompanyPage />,
    visibility: "private",
  },
  {
    path: routesApp?.create_company,
    element: <CompanyPage />,
    visibility: "private",
  },
  {
    path: routesApp?.dashboard,
    element: <Dashboard />,
    visibility: "private",
  },
  {
    path: routesApp?.error404,
    element: <Navigate to={routesApp?.root} />,
    visibility: "public",
  },
];

function chooseRoutes(visibility: string) {
  switch (visibility) {
    case "public":
      return <PublicRoutes />;

    case "private":
      return <PrivateRoutes />;

    case "admin":
      return <AdminRoutes />;

    default:
      return null;
  }
}

// Layout wrapper component
const LayoutWrapper: React.FC = () => (
  <ContainerLayout>
    <Outlet />
  </ContainerLayout>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={routesApp?.root} element={<LayoutWrapper />}>
        {routes &&
          routes?.length > 0 &&
          routes.map(({ path, element, visibility }) => {
            return (
              <Route key={path} path={path} element={chooseRoutes(visibility)}>
                <Route path={path} element={element} />
              </Route>
            );
          })}
      </Route>
    </Routes>
  );
};
