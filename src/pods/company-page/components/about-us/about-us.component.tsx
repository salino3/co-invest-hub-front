import React from "react";
import {
  PropsCompany,
  PropsCompanyError,
  PropsCompanyReadOnly,
} from "../../../../store";
import { BasicInput, ContactsInputs } from "../../../../common";
import { TFunction } from "i18next";
import "./about-us.styles.scss";

interface Props {
  t: TFunction<"main", undefined>;
  setFormData: React.Dispatch<React.SetStateAction<PropsCompany>>;
  formData: PropsCompany;
  setFormDataError: React.Dispatch<React.SetStateAction<PropsCompanyError>>;
  formDataError: PropsCompanyError;
  roleAccount: string;
  setRoleAccount: React.Dispatch<React.SetStateAction<string>>;
  rolesCompany: any;
  setInputsReadOnly: React.Dispatch<React.SetStateAction<PropsCompanyReadOnly>>;
  inputsReadOnly: PropsCompanyReadOnly;
}

export const AboutUs: React.FC<Props> = (props) => {
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
    setInputsReadOnly,
  } = props;

  const handleChange =
    (key: keyof PropsCompany) =>
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

  const handleChangeReadOnly = (input: keyof PropsCompanyReadOnly) => {
    setInputsReadOnly((prev: PropsCompanyReadOnly) => ({
      ...prev,
      [input]: !prev[input],
    }));
  };

  return (
    <div className="rootAboutUs">
      <div className="inputsAboutUs">
        <BasicInput
          lbl={t("name")}
          name="name"
          type="text"
          change={handleChange("name")}
          value={formData?.name || ""}
          errMsg={formDataError?.name}
          checkError={!!formDataError?.name}
          readonly={!inputsReadOnly?.name}
          update={roleAccount ? () => handleChangeReadOnly("name") : null}
        />
        <BasicInput
          lbl={t("description")}
          name="description"
          type="textarea"
          change={handleChange("description")}
          value={formData?.description || ""}
          rows={10}
          readonly={!inputsReadOnly?.description}
          update={
            roleAccount ? () => handleChangeReadOnly("description") : null
          }
        />
        <BasicInput
          lbl={t("sector")}
          name="sector"
          type="text"
          change={handleChange("sector")}
          value={formData?.sector || ""}
          errMsg={formDataError?.sector}
          checkError={!!formDataError?.sector}
          readonly={!inputsReadOnly?.sector}
          update={roleAccount ? () => handleChangeReadOnly("sector") : null}
        />
        <BasicInput
          lbl={t("location")}
          name="location"
          type="text"
          change={handleChange("location")}
          value={formData?.location || ""}
          errMsg={formDataError?.location}
          checkError={!!formDataError?.location}
          readonly={!inputsReadOnly?.location}
          update={roleAccount ? () => handleChangeReadOnly("location") : null}
        />
        {!!roleAccount && (
          <BasicInput
            lbl={t("role")}
            name="role"
            type="text"
            change={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRoleAccount(e.target.value);
              setFormDataError((prev) => ({
                ...prev,
                ["role"]: "",
              }));
            }}
            value={roleAccount || ""}
            checkError={!!formDataError?.role}
            errMsg={formDataError?.role}
            readonly={!inputsReadOnly?.role}
            update={roleAccount ? () => handleChangeReadOnly("role") : null}
          />
        )}

        {rolesCompany && rolesCompany?.length > 0 && (
          <div className="containerRolesParteners">
            <h4>{t("roles_partners")}</h4>
            {rolesCompany.map((role: any) => (
              <div key={role?.id} className="cardRolesCompany">
                <div className="boxItem">
                  <strong className="title">{t("role")}:</strong>
                  <span className="value">{role?.role} </span>
                </div>
                <div className="boxItem">
                  <strong className="title">{t("name")}:</strong>
                  <span className="value">{role?.name} </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="boxContactsForm">
          <ContactsInputs
            t={t}
            contacts={formData.contacts || []}
            setContacts={setFormData}
          />
        </div>
      </div>
    </div>
  );
};
