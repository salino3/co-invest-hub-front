import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CreateRelationData,
  MyCompany,
  PropsCompany,
  PropsCompanyError,
  PropsTabs,
  UpdateAccountCompany,
  useProviderSelector,
} from "../../store";
import { ServicesApp } from "../../services";
import { Button, StarIcon } from "../../common";
import { NavigationCompany } from "../../common-app";
import { AboutUs } from "./components";
import "./company-page.styles.scss";

export const CompanyPage: React.FC = () => {
  const { t } = useTranslation("main");

  const params = useParams();
  const { currentUser, myCompanies, setMyCompanies } = useProviderSelector(
    "currentUser",
    "myCompanies",
    "setMyCompanies"
  );

  const [tab, setTabs] = useState<number>(0);
  const [myFavorites, setMyFavorites] = useState<number[]>([]);
  const [flagFavorite, setFlagFavorite] = useState<boolean>(false);
  const [companyData, setCompanyData] = useState<PropsCompany>({
    name: "",
    description: "",
    hashtags: [],
    sector: "",
    location: "",
    contacts: [
      {
        type: "",
        value: "",
      },
    ],
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
    role: "",
  });

  const [roleAccount, setRoleAccount] = useState<string>("");

  function clearAllFormSetters() {
    setCompanyData({
      name: "",
      description: "",
      hashtags: [],
      sector: "",
      location: "",
      contacts: [
        {
          type: "",
          value: "",
        },
      ],
      multimedia: [],
    });
    setRoleAccount("");
    setCompanyDataError({
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
      role: "",
    });
  }

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
          roleAccount={roleAccount}
          setRoleAccount={setRoleAccount}
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

  const isFavorited =
    myFavorites &&
    myFavorites?.length > 0 &&
    myFavorites.some((f) => f === Number(params?.id));

  // handleSubmit
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("clog2", companyData);

    if (!roleAccount.trim()) {
      setCompanyDataError((prev: PropsCompanyError) => ({
        ...prev,
        role: "required_field",
      }));

      // Scroll to the input with error
      const inputWithError = document.getElementById("roleID");

      if (inputWithError) {
        inputWithError.scrollIntoView({ behavior: "smooth", block: "center" });
        inputWithError.focus(); // Optional: set focus
      }

      return;
    }

    // TODO: Create function 'checkDataFormCompany'
    // checkDataFormCompany()

    if (!params?.id) {
      ServicesApp?.createCompany(companyData).then((res: any) => {
        const id: number = Number(currentUser?.id);
        const body: CreateRelationData = {
          idCreator: id,
          account_id: id,
          company_id: res?.data?.company_id,
          role: roleAccount.trim(),
        };
        // TODO: Move this execution to backend
        ServicesApp?.createRelationAccountCompany(body).then(() =>
          ServicesApp?.getMyCompanies(String(currentUser?.id)).then(
            (res) => setMyCompanies && setMyCompanies(res.data)
          )
        );
      });
    } else {
      if (roleAccount) {
        const body: UpdateAccountCompany = {
          account_id: currentUser?.id || 0,
          company_id: Number(params?.id),
          newRole: roleAccount,
        };
        ServicesApp?.updateRoleAccountCompany(body).then(() =>
          ServicesApp?.getMyCompanies(String(currentUser?.id)).then(
            (res) => setMyCompanies && setMyCompanies(res.data)
          )
        );
      }
      //
    }
  };

  //
  useEffect(() => {
    if (params?.id) {
      ServicesApp?.getFavoriteCompanies(String(currentUser?.id)).then((res) =>
        setMyFavorites(res.data)
      );
      ServicesApp?.getCompany(params?.id).then((res) =>
        setCompanyData(res.data)
      );
    } else {
      clearAllFormSetters();
    }

    const found: string =
      (myCompanies &&
        myCompanies.length > 0 &&
        myCompanies.find((c) => String(c?.id) === params?.id)?.role) ||
      "";
    setRoleAccount(found);
  }, [currentUser?.id, params?.id, flagFavorite]);

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
      <form onSubmit={handleSubmit} id="formCompanyPage">
        {tabs[tab]?.component}

        <div className="boxButtonsForm">
          <Button type="submit" text={t("confirm")} />
          <Button click={clearAllFormSetters} type="reset" text={t("cancel")} />
        </div>
      </form>
    </div>
  );
};
