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

  //* Get Data

  // Accouts
  public static async getCompanies(): Promise<AxiosResponse<PropsCompany[]>> {
    return await axios.get(`${baseBackend}/companies`);
  }
}
