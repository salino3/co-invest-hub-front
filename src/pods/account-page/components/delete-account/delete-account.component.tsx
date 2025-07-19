import React from "react";
import { TFunction } from "i18next";
import {
  AccountRegisterForm,
  AccountRegisterFormError,
  useProviderSelector,
} from "../../../../store";
import { BasicInput } from "../../../../common";
import "./delete-account.styles.scss";

interface Props {
  t: TFunction;
  formData: string | AccountRegisterForm;
  formErrorData: string | AccountRegisterFormError;
  setFormData: React.Dispatch<
    React.SetStateAction<string | AccountRegisterForm>
  >;
  setFormErrorData: React.Dispatch<
    React.SetStateAction<string | AccountRegisterFormError>
  >;
}

export const DeleteAccount: React.FC<Props> = (props) => {
  const { t, formData, setFormData, formErrorData, setFormErrorData } = props;

  const { currentUser } = useProviderSelector("currentUser");

  return (
    <div className="rootDeleteAccount">
      <p>{t("text1DeleteAccount")}</p>
      <p>
        {t("textDeleteAccount02")}- <strong>{currentUser?.name}</strong> -
        {t("textDeleteAccount03")}
      </p>
      <BasicInput
        name="name"
        type="text"
        change={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFormData(e.target.value)
        }
        lbl={t("name")}
        ariaLabeInput={t("name")}
        value={(formData as string) || ""}
        checkError={!!formErrorData}
        errMsg={formErrorData as string}
        ariaRq
      />
    </div>
  );
};
