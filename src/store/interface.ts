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
  email: string;
  name?: string;
  role_user?: "user" | "admin";
  age?: number;
  createdAt?: string;
  updatedAt?: string;
}

//
export interface AccountRegisterForm {
  email: string;
  name?: string;
  password: string;
  passwordConfirm: string;
  age: number | null;
  account_type: "individual" | "business";
}

//
export interface AccountLoginForm {
  email: string;
  password: string;
}

export interface PropsProvider {
  companies: PropsCompany[];
  currentUser: PropsCurrentUser;
  theme: "dark" | "light";
  changeGlobalColors(): void;
  loginAccount: (user: PropsCurrentUser) => void;
  logoutAccount: () => void;
}
