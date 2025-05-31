import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ServicesApp } from "../../services";
import { PropsCompany, useProviderSelector } from "../../store";
import { CardCompany } from "./components";
import "./dashboard.styles.scss";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation("main");

  const { companies, setCompanies } = useProviderSelector(
    "companies",
    "setCompanies"
  );

  useEffect(() => {
    if (companies?.length == 0) {
      const searchData = JSON.parse(localStorage.getItem("searchData") || "{}");
      if (searchData?.searching) {
        ServicesApp?.getSearchingCompanies(searchData).then((res) => {
          setCompanies && setCompanies(res?.data);
        });
      } else {
        ServicesApp.getCompanies().then(
          (res) => setCompanies && setCompanies(res?.data)
        );
      }
    }
  }, []);

  return (
    <div className="rootDashboard">
      <h1 className="titleDashboardPage">{t("dashboard_page")}</h1>
      <div className="listCompanies">
        {companies &&
          companies?.length > 0 &&
          companies.map((c: PropsCompany) => (
            <CardCompany company={c} key={c?.id} />
          ))}
      </div>
    </div>
  );
};
