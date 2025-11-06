import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import {
  AccountLoginForm,
  AccountRegisterForm,
  AccountRegisterFormError,
  useProviderSelector,
} from "../../store";
import { ServicesApp } from "../../services";
import { useAppFunctions } from "../../hooks";
import { BasicInput, Button } from "../../common";
import { ModalWeb } from "../../common-app";
import { routesApp } from "../../router";
import "./home.styles.scss";

export const HomePage: React.FC = () => {
  const { t } = useTranslation("main");
  const { t: tw } = useTranslation("wcag");

  const navigate = useNavigate();
  const { loginAccount, currentUser } = useProviderSelector(
    "loginAccount",
    "currentUser"
  );
  const { checkFormRequired } = useAppFunctions();

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

  const [showModal, setShowModal] = useState<string | null>("");

  const handleChange =
    (key: keyof (AccountRegisterForm & AccountLoginForm)) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));

      setFormDataError((prev) => ({
        ...prev,
        [key]: "",
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement> | undefined) => {
    event?.preventDefault();

    let error: boolean = checkFormRequired(formData, setFormDataError, t, [
      "name",
    ]);

    // "passwordConfirm" in formData: Only executes it if 'passwordConfirm' exists
    if (
      "passwordConfirm" in formData &&
      formData?.password !== formData?.passwordConfirm
    ) {
      error = true;
      setFormDataError((prev) => ({
        ...prev,
        ["passwordConfirm"]: t("password_not_match"),
      }));
    }

    if (formData?.password?.length < 6) {
      error = true;
      setFormDataError((prev) => ({
        ...prev,
        ["password"]: t("password_too_short"),
      }));
    }

    if ("age" in formData && formData?.age && Number(formData?.age) < 18) {
      error = true;
      setFormDataError((prev) => ({
        ...prev,
        ["age"]: t("min_18"),
      }));
    }

    if (error) {
    } else {
      ServicesApp?.[formType ? "registerAccount" : "loginAccount"](
        formData as AccountRegisterForm & AccountLoginForm
      )
        .then((res: AxiosResponse<any, any>) => {
          !formType
            ? loginAccount && loginAccount(res.data)
            : setFormType(false);
        })
        .catch(() => {
          setShowModal("err");
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
    setFormDataError(
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
  }, [formType]);

  useEffect(() => {
    if (currentUser) {
      navigate(routesApp?.dashboard);
    }
  }, [currentUser]);

  return (
    <div className="rootHomePage">
      <h1 tabIndex={0} aria-label={t("welcome")}>
        {t("welcome")}
      </h1>
      <br />
      <div className="containerHomePage">
        <div className="boxButtonHome">
          <Button
            al={tw("aria.goToRegister")}
            customStyles={formType ? "btnRegister" : ""}
            click={() => setFormType(true)}
            text={t("register")}
          />
          <Button
            al={tw("aria.goToLogin")}
            customStyles={!formType ? "btnLogin" : ""}
            click={() => setFormType(false)}
            text={t("login")}
          />
        </div>
        <h4>{t(formType ? "register" : "login")}</h4>
        <form onSubmit={handleSubmit} id="formHomePage">
          {formType ? (
            <>
              <BasicInput
                type="text"
                name={"name"}
                lbl={t("name")}
                change={handleChange("name")}
                value={(formData as AccountRegisterForm)?.name || ""}
                ariaLabeInput={t("name")}
              />
              <BasicInput
                type="email"
                name={"email"}
                lbl={t("email") + " *"}
                change={handleChange("email")}
                value={(formData as AccountRegisterForm)?.email || ""}
                errMsg={(formDataError as AccountRegisterFormError)?.email}
                checkError={
                  !!(formDataError as AccountRegisterFormError)?.email
                }
                ariaLabeInput={t("email")}
                ariaRq
              />
              <BasicInput
                type="password"
                name={"password"}
                lbl={t("password") + " *"}
                change={handleChange("password")}
                value={(formData as AccountRegisterForm)?.password || ""}
                errMsg={(formDataError as AccountRegisterFormError)?.password}
                checkError={
                  !!(formDataError as AccountRegisterFormError)?.password
                }
                ariaLabeInput={t("password")}
                ariaRq
              />
              <BasicInput
                type="password"
                name={"passwordConfirm"}
                lbl={t("passwordConfirm") + " *"}
                change={handleChange("passwordConfirm")}
                value={(formData as AccountRegisterForm)?.passwordConfirm || ""}
                errMsg={
                  (formDataError as AccountRegisterFormError)?.passwordConfirm
                }
                checkError={
                  !!(formDataError as AccountRegisterFormError)?.passwordConfirm
                }
              />
              <BasicInput
                type="number"
                name={"age"}
                lbl={t("age") + " *"}
                change={handleChange("age")}
                value={(formData as AccountRegisterForm)?.age || ""}
                errMsg={(formDataError as AccountRegisterFormError)?.age}
                checkError={!!(formDataError as AccountRegisterFormError)?.age}
                ariaLabeInput={t("age")}
                ariaRq
              />
            </>
          ) : (
            <>
              <BasicInput
                type="email"
                name={"email"}
                lbl={t("email") + " *"}
                change={handleChange("email")}
                value={(formData as AccountLoginForm)?.email || ""}
                errMsg={(formDataError as AccountLoginForm)?.email}
                checkError={!!(formDataError as AccountLoginForm)?.email}
                ariaLabeInput={t("email")}
                ariaRq
              />
              <BasicInput
                type="password"
                name={"password"}
                lbl={t("password") + " *"}
                change={handleChange("password")}
                value={(formData as AccountLoginForm)?.password || ""}
                errMsg={(formDataError as AccountLoginForm)?.password}
                checkError={!!(formDataError as AccountLoginForm)?.password}
                ariaLabeInput={t("password")}
                ariaRq
              />
            </>
          )}

          <Button
            al={tw("aria.confirmForm")}
            type="submit"
            text={t("confirm")}
          />
        </form>
      </div>
      {/* Modal */}
      {showModal && (
        <ModalWeb
          msg={t("Error")}
          show={showModal}
          setShow={setShowModal}
          customMaxHeight={"40vh"}
        >
          <h3>{t("login_error_credentials")}</h3>
        </ModalWeb>
      )}
    </div>
  );
};
