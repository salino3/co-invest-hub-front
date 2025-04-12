import { useTranslation } from "react-i18next";
import "./company-page.styles.scss";

export const CompanyPage: React.FC = () => {
  const { t } = useTranslation("main");

  return (
    <div className="rootCompanyPage">
      <h1>{t("company_page")}</h1>
    </div>
  );
};
