import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ServicesApp } from "../../services";
import { PropsCompany, useProvider } from "../../store";
import { useShallow } from "zustand/shallow";
import "./dashboard.styles.scss";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation("main");

  const companies = useProvider(useShallow((state) => state.companies));

  // useEffect(() => {
  //   ServicesApp.getCompanies();
  // }, []);

  return (
    <div className="rootDashboard">
      <h1>{t("dashboard_page")}</h1>
      <div className="listCompanies">
        {companies &&
          companies?.length > 0 &&
          companies.map((c: PropsCompany) => (
            <div className="cardCompany">
              <span>{c?.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
