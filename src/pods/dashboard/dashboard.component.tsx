import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ServicesApp } from "../../services";
import "./dashboard.styles.scss";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation("main");

  useEffect(() => {
    ServicesApp.getCompanies();
  }, []);

  return (
    <div className="rootDashboard">
      <h1>{t("dashboard_page")}</h1>
    </div>
  );
};
