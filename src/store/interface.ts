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
  investmentMin?: number;
  investmentMax?: number;
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
export interface AccountLoginForm {
  email: string;
  password: string;
}

export interface PropsProvider {
  companies: PropsCompany[];
  myCompanies: MyCompany[];
  currentUser: PropsCurrentUser | null;
  theme: "dark" | "light";
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
  investmentMin: string;
  investmentMax: string;
  contacts: string;
  multimedia: string;
  logo: string;
  role: string;
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
