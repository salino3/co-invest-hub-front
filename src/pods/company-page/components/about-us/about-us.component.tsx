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
          update={() => handleChangeReadOnly("name")}
        />
        <BasicInput
          lbl={t("description")}
          name="description"
          type="textarea"
          change={handleChange("description")}
          value={formData?.description || ""}
          rows={10}
          cols={50}
          readonly={!inputsReadOnly?.description}
          update={() => handleChangeReadOnly("name")}
        />
        <BasicInput
          lbl={t("sector")}
          name="sector"
          type="text"
          change={handleChange("sector")}
          value={formData?.sector || ""}
        />
        <BasicInput
          lbl={t("location")}
          name="location"
          type="text"
          change={handleChange("location")}
          value={formData?.location || ""}
        />
        {!!roleAccount ? (
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
          />
        ) : (
          <BasicInput
            lbl={t("description")}
            name="description"
            type="textarea"
            change={handleChange("description")}
            value={roleAccount || ""}
            rows={10}
            cols={50}
            readonly={true}
          />
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
