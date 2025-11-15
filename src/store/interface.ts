export interface Contacts {
  type: string;
  value: string;
}

export interface PropsCompany {
  id?: number;
  // companyCode: string;
  name: string;
  description: string;
  hashtags: string[];
  sector: string;
  location: string;
  investment_min?: number;
  investment_max?: number;
  contacts: Contacts[];
  multimedia: Record<string, string>[];
  logo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MyCompany {
  id: number;
  name: string;
  role: string;
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

//-----------------------
export interface AccountRegisterForm {
  name?: string;
  email: string;
  password: string;
  passwordConfirm: string;
  age: number | null;
}

//
export interface AccountRegisterFormError {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  age: string;
}

//
export interface AccountLoginForm {
  email: string;
  password: string;
}

export interface PropsProvider {
  companies: PropsCompany[];
  myCompanies: MyCompany[];
  currentUser: PropsCurrentUser | null;
  theme: "dark" | "light";
  setCompanies: (companies: PropsCompany[]) => void;
  setMyCompanies: (companies: MyCompany[]) => void;
  changeGlobalColors(): void;
  loginAccount: (user: PropsCurrentUser) => void;
  logoutAccount: () => void;
}

//
export interface PropsTabs {
  key: number;
  title: string;
  component: React.ReactNode;
}

export interface PropsCompanyError {
  name: string;
  description: string;
  hashtags: string;
  sector: string;
  location: string;
  investment_min: string;
  investment_max: string;
  contacts: string;
  multimedia: string;
  logo: string;
  role: string;
  // type_contact: string;
}

export interface PropsCompanyReadOnly {
  name: boolean;
  description: boolean;
  hashtags: boolean;
  sector: boolean;
  location: boolean;
  investment_min: boolean;
  investment_max: boolean;
  contacts: boolean;
  multimedia: boolean;
  logo: boolean;
  role: boolean;
  type_contact: boolean;
  value_contact: boolean;
}

export interface CreateRelationData {
  idCreator: number;
  account_id: number;
  company_id: number;
  role: string;
}

export interface UpdateAccountCompany {
  account_id: number;
  company_id: number;
  newRole: string;
}
