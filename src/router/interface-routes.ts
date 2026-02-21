import React, { lazy } from "react";

interface Routes {
  root: string;
  dashboard: string;
  company: (name: string, id: string) => string;
  account: (action: string) => string;
  create_company: string;
  error404: string;
}

export const routesApp: Routes = {
  root: "/",
  dashboard: "/dashboard",
  company: (name: string, id: string) => `/company/${name}/${id}`,
  account: (action: string) => `/account/${action}`,
  create_company: "/create/new-company",
  error404: "*",
};

// Function Routes lazyLoad()
const lazyLoad = (importFactory: () => Promise<any>, exportName: string) =>
  React.lazy(() =>
    importFactory().then((module) => ({ default: module[exportName] })),
  );

// Lazy Page Components
export const LazyHomePage: React.LazyExoticComponent<React.FC<{}>> = lazy(
  () => import("../pods/home/home.component"),
); // with 'export default'

export const LazyCompanyPage: React.LazyExoticComponent<React.FC<{}>> =
  lazyLoad(
    () => import("../pods/company-page/company-page.component"), // ImportPromise
    "CompanyPage", // ExportName
  );

export const LazyAccountPage: React.LazyExoticComponent<React.FC<{}>> =
  lazyLoad(
    () => import("../pods/account-page/account-page.component"),
    "AccountPage",
  );

export const LazyDashboard: React.LazyExoticComponent<React.FC<{}>> = lazyLoad(
  () => import("../pods/dashboard/dashboard.component"),
  "Dashboard",
);
