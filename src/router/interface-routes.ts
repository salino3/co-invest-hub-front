interface Routes {
  root: string;
  dashboard: string;
  error404: string;
}

export const routesApp: Routes = {
  root: "/",
  dashboard: "/:token",
  error404: "*",
};
