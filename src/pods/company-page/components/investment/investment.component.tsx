import React from "react";
import { useLocation } from "react-router-dom";
import {
  PropsCompany,
  PropsCompanyError,
  PropsCompanyReadOnly,
} from "../../../../store";
import { BasicInput } from "../../../../common";
import { TFunction } from "i18next";
import "./investment.styles.scss";

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
  id: string | undefined;
}

export const Investment: React.FC<Props> = (props) => {
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
    id,
  } = props;

  const location = useLocation();

  const isNewCompany = location.pathname.includes("create/new-company");

  return (
    <div className="rootInvestment">
      <div className="inputsInvestment">
        <BasicInput
          lbl={t("investment_min")}
          name="investment_min"
          type="number"
          change={handleChange("investment_min")}
          value={formData?.investment_min || ""}
          errMsg={formDataError?.investment_min}
          checkError={!!formDataError?.investment_min}
          readonly={
            (!isNewCompany && !!id && !roleAccount) ||
            (!isNewCompany && !!roleAccount && !inputsReadOnly?.investment_min)
          }
          update={
            id && roleAccount
              ? () => handleChangeReadOnly("investment_min")
              : null
          }
        />
      </div>
      <div className="inputsInvestment">
        <BasicInput
          lbl={t("investment_max")}
          name="investment_max"
          type="number"
          change={handleChange("investment_max")}
          value={formData?.investment_max || ""}
          errMsg={formDataError?.investment_max}
          checkError={!!formDataError?.investment_max}
          readonly={
            (!isNewCompany && !!id && !roleAccount) ||
            (!isNewCompany && !!roleAccount && !inputsReadOnly?.investment_max)
          }
          update={
            id && roleAccount
              ? () => handleChangeReadOnly("investment_max")
              : null
          }
        />
      </div>

      <div className="inputsInvestment">
        <BasicInput
          lbl={t("hashtags")}
          name="hashtags"
          type="string"
          change={handleChange("hashtags")}
          value={
            typeof formData?.hashtags === "object" &&
            !Array.isArray(formData?.hashtags)
              ? ""
              : formData?.hashtags || ""
          }
          errMsg={formDataError?.hashtags}
          checkError={!!formDataError?.hashtags}
          readonly={
            (!isNewCompany && !!id && !roleAccount) ||
            (!isNewCompany && !!roleAccount && !inputsReadOnly?.hashtags)
          }
          update={
            id && roleAccount ? () => handleChangeReadOnly("hashtags") : null
          }
        />
      </div>
    </div>
  );
};
