import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AccountRegisterForm, AccountRegisterFormError } from "../../store";
import { DeleteAccount } from "./components";
import "./account-page.styles.scss";

export const AccountPage: React.FC = () => {
  const { t } = useTranslation("main");
  const { t: tw } = useTranslation("wcag");

  const params = useParams();
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

  return (
    <div className="rootAccountPage">
      <div className="containerAccountPage">
        <h1>
          {t(`${deletingAccount ? "delete_account" : "update_data_account"}`)}
        </h1>
        {deletingAccount ? (
          <DeleteAccount
            t={t}
            formData={formData}
            setFormData={setFormData}
            formErrorData={formErrorData}
            setFormErrorData={setFormErrorData}
          />
        ) : (
          <>Update</>
        )}
      </div>
    </div>
  );
};
