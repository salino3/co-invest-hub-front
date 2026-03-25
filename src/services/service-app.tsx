import axios, { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
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

const { getEndTokenFromCookie, closeSession } = useAppFunctions();

export class ServicesApp {
  /**
   * PRIVATE HELPER
   * Checks the token and refreshes it IF needed before continuing.
   */
  private static async ensureValidToken(): Promise<void> {
    // 1. Get the FULL CONTENT of the cookie, not just the name
    const cookieName =
      import.meta.env.VITE_APP_COOKIE_AUTH + getEndTokenFromCookie();

    // Helper to find the specific cookie value
    const match = document.cookie.match(
      new RegExp("(^| )" + cookieName + "=([^;]+)"),
    );
    const tokenValue = match ? match[2] : null;

    if (tokenValue) {
      const isExpiring = this.isTokenExpiringSoon(tokenValue);

      // This will now be FALSE until the last 5 minutes
      if (isExpiring) {
        console.log("Token truly expiring soon, refreshing...");
        try {
          await this.refreshToken();
        } catch (error) {
          console.error("Auto-refresh failed", error);
          closeSession();
        }
      }
    }
  }

  private static isTokenExpiringSoon(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);

      if (!decoded.exp) return true;
      const currentTime = Date.now() / 1000;
      return decoded.exp - currentTime < 5 * 60;
    } catch {
      return true;
    }
  }

  //* Auth

  public static async registerAccount(
    user: AccountRegisterForm,
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
    account: AccountLoginForm,
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

  public static async refreshToken(): Promise<AxiosResponse> {
    return await axios
      .post(
        `${baseBackend}/auth/refresh-token`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "end_token": getEndTokenFromCookie(),
          },
        },
      )
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  // Accounts

  public static async deleteAccount(id: string): Promise<AxiosResponse> {
    await this.ensureValidToken();

    return await axios
      .request({
        method: "PATCH",
        url: `${baseBackend}/api/accounts/${id}/deactivate`,
        headers: {
          "Content-Type": "application/json",
          "end_token": getEndTokenFromCookie(),
        },
        withCredentials: true,
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  //* Relation account Companies
  public static async getMyCompanies(id: string): Promise<AxiosResponse> {
    await this.ensureValidToken();

    return await axios
      .get(`${baseBackend}/relation/account/companies/${id}`, {
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

  //
  public static async getRelationCompanyAccounts(
    id: string,
  ): Promise<AxiosResponse> {
    await this.ensureValidToken();
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
    body: CreateRelationData,
  ): Promise<AxiosResponse<CreateRelationData>> {
    await this.ensureValidToken();

    return await axios
      .post(`${baseBackend}/relation/account/companies`, body, {
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

  public static async updateRoleAccountCompany(
    body: UpdateAccountCompany,
  ): Promise<AxiosResponse<void>> {
    await this.ensureValidToken();

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
    await this.ensureValidToken();

    return await axios.get(`${baseBackend}/api/companies`).catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
  }

  public static async getCompany(
    id: string,
  ): Promise<AxiosResponse<PropsCompany>> {
    await this.ensureValidToken();

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
    company: PropsCompany,
  ): Promise<AxiosResponse<PropsCompany>> {
    await this.ensureValidToken();

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
    company: PropsCompany,
    idAccount: string,
  ): Promise<AxiosResponse> {
    await this.ensureValidToken();

    return await axios
      .put(`${baseBackend}/api/companies/${id}/${idAccount}`, company, {
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

  public static async deleteCompany(body: {
    id: string;
    idCompany: string;
  }): Promise<AxiosResponse> {
    await this.ensureValidToken();

    return await axios
      .delete(`${baseBackend}/api/companies/${body?.id}/${body?.idCompany}`, {
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
    await this.ensureValidToken();

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
    id: string,
  ): Promise<AxiosResponse<number[]>> {
    await this.ensureValidToken();

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
    await this.ensureValidToken();

    return await axios
      .delete(
        `${baseBackend}/api/favorites/${ids?.account_id}/${ids?.company_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "end_token": getEndTokenFromCookie(),
          },
        },
      )
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  }
}
