import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import {
  AccountLoginForm,
  AccountRegisterForm,
  useProviderSelector,
} from "../../store";
import { ServicesApp } from "../../services";
import { BasicInput, Button } from "../../common";
import { routesApp } from "../../router";
import "./home.styles.scss";

interface AccountRegisterFormError {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  age: string;
}

export const HomePage: React.FC = () => {
  const { t } = useTranslation("main");

  const navigate = useNavigate();
  const { loginAccount, currentUser } = useProviderSelector(
    "loginAccount",
    "currentUser"
  );

  const [formType, setFormType] = useState<boolean>(true);

  const [formData, setFormData] = useState<
    AccountRegisterForm | AccountLoginForm
  >(
    formType
      ? {
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          age: null,
        }
      : {
          email: "",
          password: "",
        }
  );

  const [formDataError, setFormDataError] = useState<
    AccountRegisterFormError | AccountLoginForm
  >(
    formType
      ? {
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          age: "",
        }
      : {
          email: "",
          password: "",
        }
  );

  const handleChange =
    (key: keyof (AccountRegisterForm & AccountLoginForm)) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement> | undefined) => {
    event?.preventDefault();

    let error: boolean = false;

    if (error) {
    } else {
      ServicesApp?.[formType ? "registerAccount" : "loginAccount"](
        formData as AccountRegisterForm & AccountLoginForm
      ).then((res: AxiosResponse<any, any>) => {
        !formType ? loginAccount && loginAccount(res.data) : setFormType(false);
      });
    }
  };

  useEffect(() => {
    setFormData(
      formType
        ? {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            age: null,
          }
        : {
            email: "",
            password: "",
          }
    );
  }, [formType]);

  useEffect(() => {
    if (currentUser) {
      navigate(routesApp?.dashboard);
    }
  }, [currentUser]);

  return (
    <div className="rootHomePage">
      <h1>{t("welcome")}</h1>
      <div className="containerHomePage">
        <div className="boxButtonHome">
          <Button click={() => setFormType(true)} text={t("register")} />
          <Button click={() => setFormType(false)} text={t("login")} />
        </div>
        <form onSubmit={handleSubmit} id="formHomePage">
          {formType ? (
            <>
              <BasicInput
                type="text"
                name={"name"}
                lbl="name"
                change={handleChange("name")}
                value={(formData as AccountRegisterForm)?.name || ""}
              />
              <BasicInput
                type="email"
                name={"email"}
                lbl={"email"}
                change={handleChange("email")}
                value={(formData as AccountRegisterForm)?.email || ""}
              />
              <BasicInput
                type="password"
                name={"password"}
                lbl={"password"}
                change={handleChange("password")}
                value={(formData as AccountRegisterForm)?.password || ""}
              />
              <BasicInput
                type="password"
                name={"passwordConfirm"}
                lbl={"passwordConfirm"}
                change={handleChange("passwordConfirm")}
                value={(formData as AccountRegisterForm)?.passwordConfirm || ""}
              />
              <BasicInput
                type="number"
                name={"age"}
                lbl={"age"}
                change={handleChange("age")}
                value={(formData as AccountRegisterForm)?.age || ""}
              />
            </>
          ) : (
            <>
              <BasicInput
                type="email"
                name={"email"}
                lbl={"email"}
                change={handleChange("email")}
                value={(formData as AccountLoginForm)?.email || ""}
                errMsg={(formDataError as AccountLoginForm)?.email}
              />
              <BasicInput
                type="password"
                name={"password"}
                lbl="password"
                change={handleChange("password")}
                value={(formData as AccountLoginForm)?.password || ""}
                errMsg={(formDataError as AccountLoginForm)?.password}
              />
            </>
          )}
          <Button type="submit" text={t("confirm")} />
        </form>
      </div>
    </div>
  );
};
