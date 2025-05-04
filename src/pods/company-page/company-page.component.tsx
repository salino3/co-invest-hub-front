import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PropsTabs, useProviderSelector } from "../../store";
import { ServicesApp } from "../../services";
import { StarIcon } from "../../common";
import { NavigationCompany } from "../../common-app";
import "./company-page.styles.scss";

export const CompanyPage: React.FC = () => {
  const { t } = useTranslation("main");

  const params = useParams();
  const { currentUser } = useProviderSelector("currentUser");

  const [tab, setTabs] = useState<number>(0);

  const tabs: PropsTabs[] = [
    {
      key: 0,
      title: t("about"),
      component: <>About</>,
    },
    {
      key: 1,
      title: t("contact"),
      component: <>Contact</>,
    },
    {
      key: 2,
      title: t("portfolio"),
      component: <>Portfolio</>,
    },
  ];

  useEffect(() => {
    if (params?.id) {
      ServicesApp?.getFavoriteCompanies(String(currentUser?.id));
    }
  }, [currentUser?.id, !!params?.id]);

  return (
    <div className="rootCompanyPage">
      <NavigationCompany navigation={tab} setNavigation={setTabs} tabs={tabs} />
      <StarIcon fill={"gold"} /> <h1>{t("company_page")}</h1>
      <span>{params?.name}</span>
      <span>{params?.id}</span>
      <div className="containertabs">{tabs[tab]?.component}</div>
    </div>
  );
};
