import { useTranslation } from "react-i18next";
import "./dashboard.styles.scss";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation("main");

  return (
    <div className="rootDashboard">
      <h1>{t("dashboard_page")}</h1>
    </div>
  );
};
