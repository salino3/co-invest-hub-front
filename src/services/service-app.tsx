import axios, { AxiosResponse } from "axios";
import { apisApp } from ".";
import {
  AccountLoginForm,
  AccountRegisterForm,
  CreateRelationData,
  PropsCompany,
  UpdateAccountCompany,
} from "../store";
import { useAppFunctions } from "../hooks";

const { baseBackend } = apisApp;

const { getEndTokenFromCookie } = useAppFunctions();

export class ServicesApp {
  //* Auth

  public static async registerAccount(
    user: AccountRegisterForm
  ): Promise<AxiosResponse> {
    return await axios
      .post(`${baseBackend}/auth/register`, user, {
        withCredentials: true,
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  public static async loginAccount(
    account: AccountLoginForm
  ): Promise<AxiosResponse> {
    return await axios
      .post(`${baseBackend}/auth/login`, account, {
        withCredentials: true,
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  //* Relation account Companies
  public static async getMyCompanies(id: string): Promise<AxiosResponse> {
    return await axios
      .get(`${baseBackend}/relation/account/companies/${id}`, {
        withCredentials: true,
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  //
  public static async getRelationCompanyAccounts(
    id: string
  ): Promise<AxiosResponse> {
    return await axios
      .get(`${baseBackend}/relation/company/accounts/${id}`, {
        withCredentials: true,
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  //
  public static async createRelationAccountCompany(
    body: CreateRelationData
  ): Promise<AxiosResponse<CreateRelationData>> {
    return await axios
      .post(`${baseBackend}/relation/account/companies`, body, {
        withCredentials: true,
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  public static async updateRoleAccountCompany(
    body: UpdateAccountCompany
  ): Promise<AxiosResponse<void>> {
    return await axios
      .patch(`${baseBackend}/relation/account/companies`, body, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "end_token": getEndTokenFromCookie(),
        },
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  //*  Companies
  public static async getCompanies(): Promise<AxiosResponse<PropsCompany[]>> {
    return await axios.get(`${baseBackend}/api/companies`).catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
  }

  public static async getCompany(
    id: string
  ): Promise<AxiosResponse<PropsCompany>> {
    return await axios
      .get(`${baseBackend}/api/companies/${id}`)
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  public static async getSearchingCompanies(body: {
    searching: string;
    offset: number;
  }): Promise<AxiosResponse<PropsCompany[]>> {
    return await axios
      .post(`${baseBackend}/api/searching/companies`, body, {
        withCredentials: true,
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  public static async createCompany(
    company: PropsCompany
  ): Promise<AxiosResponse<PropsCompany>> {
    return await axios
      .post(`${baseBackend}/api/companies`, company, {
        withCredentials: true,
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  public static async updateCompany(
    id: string,
    company: PropsCompany
  ): Promise<AxiosResponse<{ id: string; company: PropsCompany }>> {
    return await axios
      .put(`${baseBackend}/api/companies/${id}`, company, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "end_token": getEndTokenFromCookie(),
        },
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  public static async deleteCompany(
    id: string
  ): Promise<AxiosResponse<{ id: string }>> {
    return await axios
      .delete(`${baseBackend}/api/companies/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "end_token": getEndTokenFromCookie(),
        },
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  //* Favorites

  public static async addFavorite(ids: {
    account_id: string | number;
    company_id: string | number;
  }): Promise<AxiosResponse> {
    return await axios
      .post(`${baseBackend}/api/favorites`, ids, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "end_token": getEndTokenFromCookie(),
        },
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  public static async getFavoriteCompanies(
    id: string
  ): Promise<AxiosResponse<number[]>> {
    return await axios
      .get(`${baseBackend}/api/favorites/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "end_token": getEndTokenFromCookie(),
        },
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  public static async deleteFavorite(ids: {
    account_id: string | number;
    company_id: string | number;
  }): Promise<AxiosResponse<number[]>> {
    return await axios
      .delete(
        `${baseBackend}/api/favorites/${ids?.account_id}/${ids?.company_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "end_token": getEndTokenFromCookie(),
          },
        }
      )
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }
}
