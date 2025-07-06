import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CreateRelationData,
  MyCompany,
  PropsCompany,
  PropsCompanyError,
  PropsCompanyReadOnly,
  PropsTabs,
  UpdateAccountCompany,
  useProviderSelector,
} from "../../store";
import { ServicesApp } from "../../services";
import { useAppFunctions } from "../../hooks";
import { Button } from "../../common";
import { NavigationCompany } from "../../common-app";
import { AboutUs, Contacts, FirstInfoCompany } from "./components";
import "./company-page.styles.scss";
// http://localhost:5500/company/Jim%20Doctor/15
export const CompanyPage: React.FC = () => {
  const { t } = useTranslation("main");
  const { t: tw } = useTranslation("wcag");

  const params = useParams();
  const { currentUser, myCompanies, setMyCompanies } = useProviderSelector(
    "currentUser",
    "myCompanies",
    "setMyCompanies"
  );

  const { checkFormRequired } = useAppFunctions();

  const [tab, setTabs] = useState<number>(0);
  const [myFavorites, setMyFavorites] = useState<number[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
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
    investment_min: 0,
  });

  const [inputsReadOnly, setInputsReadOnly] = useState<PropsCompanyReadOnly>({
    name: false,
    description: false,
    hashtags: false,
    sector: false,
    location: false,
    investment_max: false,
    investment_min: false,
    contacts: false,
    multimedia: false,
    logo: false,
    role: false,
  });

  const [companyDataError, setCompanyDataError] = useState<PropsCompanyError>({
    name: "",
    description: "",
    hashtags: "",
    sector: "",
    location: "",
    investment_max: "",
    investment_min: "",
    contacts: "",
    multimedia: "",
    logo: "",
    role: "",
  });

  const [roleAccount, setRoleAccount] = useState<string>("");
  // TODO: Add types
  const [rolesCompany, setRolesCompany] = useState<MyCompany[]>([]);

  //
  const handleChange =
    (key: keyof PropsCompany) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setCompanyData((prev) => ({
        ...prev,
        [key]: value,
      }));

      setCompanyDataError((prev) => ({
        ...prev,
        [key]: "",
      }));
    };

  const handleChangeReadOnly = (input: keyof PropsCompanyReadOnly) => {
    setInputsReadOnly((prev: PropsCompanyReadOnly) => ({
      ...prev,
      [input]: !prev[input],
    }));
  };

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
      investment_max: "",
      investment_min: "",
      contacts: "",
      multimedia: "",
      logo: "",
      role: "",
    });
  }

  const tabs: PropsTabs[] = [
    {
      key: 0,
      title: "about_us_l",
      component: (
        <AboutUs
          t={t}
          setFormData={setCompanyData}
          formData={companyData}
          setFormDataError={setCompanyDataError}
          formDataError={companyDataError}
          roleAccount={roleAccount}
          setRoleAccount={setRoleAccount}
          rolesCompany={rolesCompany}
          inputsReadOnly={inputsReadOnly}
          handleChange={handleChange}
          handleChangeReadOnly={handleChangeReadOnly}
          id={params?.id}
        />
      ),
    },
    {
      key: 1,
      title: "contact_l",
      component: (
        <Contacts
          t={t}
          setFormData={setCompanyData}
          formData={companyData}
          setFormDataError={setCompanyDataError}
          formDataError={companyDataError}
          roleAccount={roleAccount}
          setRoleAccount={setRoleAccount}
          rolesCompany={rolesCompany}
          inputsReadOnly={inputsReadOnly}
          handleChange={handleChange}
          handleChangeReadOnly={handleChangeReadOnly}
          id={params?.id}
        />
      ),
    },
    {
      key: 2,
      title: "portfolio_l",
      component: <>Portfolio</>,
    },
  ];

  // handleSubmit
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    let error: boolean = checkFormRequired(
      {
        ...companyData,
        role: roleAccount,
      },
      setCompanyDataError,
      t,
      ["contacts"],
      setTabs
    );

    // TODO: Create function 'checkDataFormCompany'
    // checkDataFormCompany()

    if (!error) {
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
        ServicesApp?.updateCompany(String(params?.id), companyData);
      }
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

    if (params?.id) {
      ServicesApp?.getRelationCompanyAccounts(params?.id || "").then((res) => {
        setRolesCompany(
          res?.data.filter((c: MyCompany) => c?.id !== currentUser?.id)
        );
      });
    }

    const foundRole: string =
      (myCompanies &&
        myCompanies.length > 0 &&
        myCompanies.find((c: MyCompany) => String(c?.id) === params?.id)
          ?.role) ||
      "";

    if (foundRole) {
      setRoleAccount(foundRole);
    } else {
      setRoleAccount("");
    }
  }, [currentUser?.id, params?.id, flag]);

  return (
    <div className="rootCompanyPage">
      <NavigationCompany navigation={tab} setNavigation={setTabs} tabs={tabs} />
      <br /> <br />
      {params?.id && (
        <FirstInfoCompany
          params={params}
          roleAccount={roleAccount}
          myFavorites={myFavorites}
          cId={currentUser?.id || ""}
          setFlag={setFlag}
          logo={companyData?.logo || ""}
        />
      )}
      <form onSubmit={handleSubmit} id="formCompanyPage">
        {tabs[tab]?.component}

        {(!params?.id || roleAccount) && (
          <div className="boxButtonsForm">
            <Button
              al={tw("aria.confirmForm")}
              type="submit"
              text={t("confirm")}
            />
            <Button
              click={clearAllFormSetters}
              type="reset"
              text={t("cancel")}
            />
          </div>
        )}
      </form>
    </div>
  );
};
