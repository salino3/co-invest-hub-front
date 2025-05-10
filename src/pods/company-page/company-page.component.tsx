import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  PropsCompany,
  PropsCompanyError,
  PropsTabs,
  useProviderSelector,
} from "../../store";
import { ServicesApp } from "../../services";
import { StarIcon } from "../../common";
import { NavigationCompany } from "../../common-app";
import { AboutUs } from "./components";
import "./company-page.styles.scss";

export const CompanyPage: React.FC = () => {
  const { t } = useTranslation("main");

  const params = useParams();
  const { currentUser } = useProviderSelector("currentUser");

  const [tab, setTabs] = useState<number>(0);
  const [myFavorites, setMyFavorites] = useState<number[]>([]);
  const [flagFavorite, setFlagFavorite] = useState<boolean>(false);
  const [companyData, setCompanyData] = useState<PropsCompany>({
    name: "",
    description: "",
    hashtags: [],
    sector: "",
    location: "",
    contacts: {},
    multimedia: [],
  });

  const [companyDataError, setCompanyDataError] = useState<PropsCompanyError>({
    name: "",
    description: "",
    hashtags: "",
    sector: "",
    location: "",
    investmentMax: "",
    investmentMin: "",
    contacts: "",
    multimedia: "",
    logo: "",
  });

  const tabs: PropsTabs[] = [
    {
      key: 0,
      title: t("about_us"),
      component: (
        <AboutUs
          t={t}
          setFormData={setCompanyData}
          formData={companyData}
          setFormDataError={setCompanyDataError}
          formDataError={companyDataError}
        />
      ),
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
      ServicesApp?.getFavoriteCompanies(String(currentUser?.id)).then((res) =>
        setMyFavorites(res.data)
      );

      ServicesApp?.getCompany(params?.id).then((res) =>
        setCompanyData(res.data)
      );
    }
  }, [currentUser?.id, !!params?.id, flagFavorite]);

  const isFavorited =
    myFavorites &&
    myFavorites?.length > 0 &&
    myFavorites.some((f) => f === Number(params?.id));

  return (
    <div className="rootCompanyPage">
      <NavigationCompany navigation={tab} setNavigation={setTabs} tabs={tabs} />
      {params?.id && (
        <div className="containerInfoAboutCompany">
          <div className="infoAboutCompany">
            <StarIcon
              click={() =>
                ServicesApp?.[isFavorited ? "deleteFavorite" : "addFavorite"]({
                  account_id: isFavorited
                    ? String(currentUser?.id)
                    : Number(currentUser?.id),
                  company_id: isFavorited
                    ? String(params?.id)
                    : Number(params?.id),
                }).then(() => setFlagFavorite(!flagFavorite))
              }
              fill={isFavorited ? "gold" : "currentColor"}
            />
            <h4>* {params?.name} * </h4>
            <div className="boxLogoCompany">
              <img
                src={companyData?.logo || "/assets/icons/group_3.svg"}
                alt="Logo"
                onError={(e) =>
                  (e.currentTarget.src = "/assets/icons/group_3.svg")
                }
              />
            </div>
          </div>
          <hr
            style={{
              width: "98%",
            }}
          />
        </div>
      )}
      <div className="containertabs">{tabs[tab]?.component}</div>
    </div>
  );
};
