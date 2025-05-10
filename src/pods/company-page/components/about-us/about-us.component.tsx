import React, { useEffect, useState } from "react";
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
}

export const AboutUs: React.FC<Props> = (props) => {
  const { t, setFormData, formData, setFormDataError, formDataError } = props;
  const [contacts, setContacts] = useState<
    {
      type: string;
      value: string;
    }[]
  >([{ type: "", value: "" }]);

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

  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      contacts: contacts,
    }));
  }, [contacts]);

  console.log("clog1", formData);

  return (
    <div className="rootAboutUs">
      <div id="formAboutUs">
        <BasicInput
          lbl={t("name")}
          name="name"
          type="text"
          change={handleChange("name")}
          value={formData?.name || ""}
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
        <div className="boxContactsForm">
          <ContactsInputs contacts={contacts} setContacts={setContacts} />
        </div>
      </div>
    </div>
  );
};
