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
  createdAt: string;
  updatedAt: string;
}

export interface PropsProvider {
  companies: PropsCompany[];
  theme: "dark" | "light";
  changeGlobalColors(): void;
}
