interface Routes {
  root: string;
  dashboard: string;
  company: (name: string, id: string) => string;
  error404: string;
}

export const routesApp: Routes = {
  root: "/",
  dashboard: "/:token",
  company: (name: string, id: string) => `company/${name}/${id}`,
  error404: "*",
};
