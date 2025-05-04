import axios, { AxiosResponse } from "axios";
import { apisApp } from ".";
import { AccountLoginForm, AccountRegisterForm, PropsCompany } from "../store";
// import { useAppFunctions } from "../hooks";

const { baseBackend } = apisApp;

// const { getEndTokenFromCookie } = useAppFunctions();

export class ServicesApp {
  //* Auth

  public static async registerAccount(
    user: AccountRegisterForm
  ): Promise<AxiosResponse> {
    return await axios.post(`${baseBackend}/auth/register`, user, {
      withCredentials: true,
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

  //*  Companies
  public static async getCompanies(): Promise<AxiosResponse<PropsCompany[]>> {
    return await axios.get(`${baseBackend}/api/companies`);
  }

  public static async getCompany(
    id: string
  ): Promise<AxiosResponse<PropsCompany>> {
    return await axios.get(`${baseBackend}/api/companies/${id}`);
  }

  //* Favorites

  public static async addFavorite(ids: {
    account_id: string | number;
    company_id: string | number;
  }): Promise<AxiosResponse> {
    return await axios
      .post(`${baseBackend}/api/favorites`, ids, {
        withCredentials: true,
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
        }
      )
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }
}
