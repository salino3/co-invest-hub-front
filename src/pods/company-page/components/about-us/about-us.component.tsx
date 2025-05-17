import React from "react";
import { PropsCompany, PropsCompanyError } from "../../../../store";
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

  console.log("clog1", formData);

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
        />
        <BasicInput
          lbl={t("description")}
          name="description"
          type="textarea"
          change={handleChange("description")}
          value={formData?.description || ""}
          rows={10}
          cols={50}
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
