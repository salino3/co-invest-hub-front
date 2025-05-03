import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./company-page.styles.scss";

export const CompanyPage: React.FC = () => {
  const { t } = useTranslation("main");

  const params = useParams();

  return (
    <div className="rootCompanyPage">
      <h1>{t("company_page")}</h1>
      <span>{params?.name}</span>
      <span>{params?.id}</span>
    </div>
  );
};
