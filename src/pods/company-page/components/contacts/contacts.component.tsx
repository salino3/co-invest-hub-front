import React from "react";
import { PropsCompany, PropsCompanyError } from "../../../../store";
import { BasicInput } from "../../../../common";
import { TFunction } from "i18next";
import "./contacts.styles.scss";

interface Props {
  t: TFunction<"main", undefined>;
  setFormData: React.Dispatch<React.SetStateAction<PropsCompany>>;
  formData: PropsCompany;
  setFormDataError: React.Dispatch<React.SetStateAction<PropsCompanyError>>;
  formDataError: PropsCompanyError;
}

export const Contacts: React.FC<Props> = (props) => {
  const { t, setFormData, formData, setFormDataError, formDataError } = props;

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

  return (
    <div className="rootContacts">
      <div className="inputsContacts">
        <BasicInput
          lbl={t("sector")}
          name="sector"
          type="text"
          change={handleChange("sector")}
          value={formData?.sector || ""}
          errMsg={formDataError?.sector}
          checkError={!!formDataError?.sector}
        />
      </div>
    </div>
  );
};
