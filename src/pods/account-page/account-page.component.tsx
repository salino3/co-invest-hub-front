import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AccountRegisterForm,
  AccountRegisterFormError,
  useProviderSelector,
} from "../../store";
import { Button } from "../../common";
import { DeleteAccount } from "./components";
import "./account-page.styles.scss";
import { ServicesApp } from "../../services";

export const AccountPage: React.FC = () => {
  const { t } = useTranslation("main");
  const { t: tw } = useTranslation("wcag");

  const params = useParams();
  const { currentUser } = useProviderSelector("currentUser");

  const deletingAccount: boolean = params?.action === "delete" || false;

  const [formData, setFormData] = useState<string | AccountRegisterForm>(
    deletingAccount
      ? ""
      : {
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          age: null,
        }
  );
  const [formErrorData, setFormErrorData] = useState<
    string | AccountRegisterFormError
  >(
    deletingAccount
      ? ""
      : {
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          age: "",
        }
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();

    if (!formData) {
      setFormErrorData("required_field");
    }
    if (
      formData &&
      typeof formData === "string" &&
      formData.trim() != currentUser?.name
    ) {
      setFormErrorData("wrong_name");
    }

    if (deletingAccount) {
      ServicesApp?.deleteAccount(String(currentUser?.id));
    }
  }

  return (
    <div className="rootAccountPage">
      <div className="containerAccountPage">
        <h1>
          {t(`${deletingAccount ? "delete_account" : "update_data_account"}`)}
        </h1>
        <form id="formAccountPage" onSubmit={handleSubmit}>
          {deletingAccount ? (
            <DeleteAccount
              t={t}
              name={currentUser?.name}
              formData={formData}
              setFormData={setFormData}
              formErrorData={formErrorData}
              setFormErrorData={setFormErrorData}
            />
          ) : (
            <>Update</>
          )}
          <div className="boxButtonsForm">
            <Button
              customStyles="buttonStyle_02"
              al={tw("aria.resetForm")}
              click={() => {}}
              type="reset"
              text={t("reset")}
            />{" "}
            <Button
              customStyles="buttonStyle_01"
              al={tw("aria.confirmForm")}
              type="submit"
              text={t("confirm")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
