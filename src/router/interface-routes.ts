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
