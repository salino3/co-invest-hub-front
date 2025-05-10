import React from "react";
import { PropsCompany, PropsCompanyError } from "../../../../store";
import { BasicInput } from "../../../../common";
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
    <div className="rootAboutUs">
      <div className="continerAboutUs">
        <div id="formAboutUs">
          <BasicInput
            lbl={t("name")}
            name="name"
            type="text"
            change={handleChange("name")}
            value={formData?.name || ""}
          />
        </div>
      </div>
    </div>
  );
};
