interface Routes {
  root: string;
  dashboard: string;
  company: (name: string, id: string) => string;
  create_company: string;
  error404: string;
}

export const routesApp: Routes = {
  root: "/",
  dashboard: "/dashboard",
  company: (name: string, id: string) => `company/${name}/${id}`,
  create_company: "/create/new-company",
  error404: "*",
};
