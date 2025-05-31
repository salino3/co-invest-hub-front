import React from "react";
import {
  PropsCompany,
  PropsCompanyError,
  PropsCompanyReadOnly,
} from "../../../../store";
import { BasicInput } from "../../../../common";
import { TFunction } from "i18next";
import "./contacts.styles.scss";

interface Props {
  t: TFunction<"main", undefined>;
  setFormData: React.Dispatch<React.SetStateAction<PropsCompany>>;
  formData: PropsCompany;
  setFormDataError: React.Dispatch<React.SetStateAction<PropsCompanyError>>;
  formDataError: PropsCompanyError;
  roleAccount: string;
  setRoleAccount: React.Dispatch<React.SetStateAction<string>>;
  rolesCompany: any;
  inputsReadOnly: PropsCompanyReadOnly;
  handleChange: (
    key: keyof PropsCompany
  ) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleChangeReadOnly: (input: keyof PropsCompanyReadOnly) => void;
}

export const Contacts: React.FC<Props> = (props) => {
  const {
    t,
    setFormData,
    formData,
    setFormDataError,
    formDataError,
    roleAccount,
    setRoleAccount,
    rolesCompany,
    inputsReadOnly,
    handleChange,
    handleChangeReadOnly,
  } = props;

  return (
    <div className="rootContacts">
      <div className="inputsContacts">
        <BasicInput
          lbl={t("investment_min")}
          name="investment_min"
          type="number"
          change={handleChange("investment_min")}
          value={formData?.investment_min || ""}
          errMsg={formDataError?.investment_min}
          checkError={!!formDataError?.investment_min}
          readonly={
            !roleAccount || (!!roleAccount && !inputsReadOnly?.investment_min)
          }
          update={
            roleAccount ? () => handleChangeReadOnly("investment_min") : null
          }
        />
      </div>
    </div>
  );
};
