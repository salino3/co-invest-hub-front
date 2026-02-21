import React, { JSX } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AdminRoutes, PrivateRoutes, PublicRoutes } from "./session-routes";
import { ContainerLayout } from "../layout";
import {
  LazyAccountPage,
  LazyCompanyPage,
  LazyDashboard,
  LazyHomePage,
  routesApp,
} from "./interface-routes";

interface PropsRoutes {
  path: string;
  element: JSX.Element;
  visibility: "public" | "private" | "restricted" | "admin";
}

const routes: PropsRoutes[] = [
  {
    path: routesApp?.root,
    element: <LazyHomePage />,
    visibility: "public",
  },
  {
    path: routesApp?.company(":name", ":id"),
    element: <LazyCompanyPage />,
    visibility: "private",
  },
  {
    path: routesApp?.account(":action"),
    element: <LazyAccountPage />,
    visibility: "private",
  },
  {
    path: routesApp?.create_company,
    element: <LazyCompanyPage />,
    visibility: "private",
  },
  {
    path: routesApp?.dashboard,
    element: <LazyDashboard />,
    visibility: "private",
  },
];

// Layout wrapper component
const LayoutWrapper: React.FC = () => (
  <ContainerLayout>
    <Outlet />
  </ContainerLayout>
);

const reducedRoutes: Record<string, JSX.Element[]> = routes.reduce(
  (acc, route) => {
    if (!acc[route.visibility]) {
      acc[route.visibility] = [];
    }
    acc[route.visibility].push(
      <Route key={route.path} path={route.path} element={route.element} />,
    );
    return acc;
  },
  {} as Record<string, JSX.Element[]>,
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* <Suspense fallback={...}> ... */}
      <Route element={<LayoutWrapper />}>
        {/* Grupo Privado */}
        <Route element={<PrivateRoutes />}>{reducedRoutes["private"]}</Route>

        {/* Grupo Público */}
        <Route element={<PublicRoutes />}>{reducedRoutes["public"]}</Route>

        {/* Grupo Admin */}
        <Route element={<AdminRoutes />}>{reducedRoutes["admin"]}</Route>

        <Route
          path={routesApp?.error404}
          element={<Navigate to={routesApp.root} />}
        />
      </Route>
    </Routes>
  );
};
