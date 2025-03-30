export interface PropsCompany {
  id?: number;
  companyCode: string;
  name: string;
  description: string;
  hashtags: string[];
  sector: string;
  location: string;
  investmentMin?: number;
  investmentMax?: number;
  contacts: Record<string, string>;
  multimedia: Record<string, string>[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PropsCurrentUser {
  id?: number;
  email?: string;
  name?: string;
  role_user?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PropsProvider {
  companies: PropsCompany[];
  currentUser: PropsCurrentUser;
  theme: "dark" | "light";
  changeGlobalColors(): void;
  loginAccount: (user: PropsCurrentUser) => void;
  logoutAccount: () => void;
}
