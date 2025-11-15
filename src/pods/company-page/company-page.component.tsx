import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { AboutUs, FirstInfoCompany, Investment } from "./components";
import { routesApp } from "../../router";
import "./company-page.styles.scss";
// http://localhost:5500/company/Jim%20Doctor/15
export const CompanyPage: React.FC = () => {
  const { t } = useTranslation("main");
  const { t: tw } = useTranslation("wcag");

  const navigate = useNavigate();

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
  const [companyOldData, setCompanyOldData] = useState<PropsCompany>({
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
    // type_contact: false,
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
    // type_contact: "",
  });

  const [roleAccount, setRoleAccount] = useState<string>("");
  const [roleOldAccount, setOldRoleAccount] = useState<string>("");
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
      name: params?.id ? companyOldData?.name : "",
      description: params?.id ? companyOldData?.description : "",
      hashtags: params?.id ? companyOldData?.hashtags : [],
      sector: params?.id ? companyOldData?.sector : "",
      location: params?.id ? companyOldData?.location : "",
      contacts: params?.id
        ? companyOldData?.contacts
        : [
            {
              type: "",
              value: "",
            },
          ],
      multimedia: params?.id ? companyOldData?.multimedia : [],
    });
    setRoleAccount(params?.id ? roleOldAccount : "");
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
      type_contact: "",
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
      title: "investment_l",
      component: (
        <Investment
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
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    let error: boolean = checkFormRequired(
      {
        ...companyData,
        role: roleAccount,
      },
      setCompanyDataError,
      t,
      ["contacts", "investment_min", "investment_max", "logo"],
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
          // TODO??: Move this execution to backend
          ServicesApp?.createRelationAccountCompany(body).then(() =>
            ServicesApp?.getMyCompanies(String(currentUser?.id)).then((res) => {
              setMyCompanies && setMyCompanies(res.data);
              navigate(routesApp?.dashboard);
            })
          );
        });
      } else {
        if (roleAccount && roleAccount != roleOldAccount) {
          const body: UpdateAccountCompany = {
            account_id: currentUser?.id || 0,
            company_id: Number(params?.id),
            newRole: roleAccount,
          };
          await ServicesApp?.updateRoleAccountCompany(body);
        }
        // TODO: Check if companyData have some values difference before call endpoint
        await ServicesApp?.updateCompany(
          String(params?.id),
          companyData,
          String(currentUser?.id)
        ).then(() =>
          ServicesApp?.getMyCompanies(String(currentUser?.id)).then(
            (res) => setMyCompanies && setMyCompanies(res.data)
          )
        );
      }
    }
  };

  //
  useEffect(() => {
    if (params?.id) {
      ServicesApp?.getFavoriteCompanies(String(currentUser?.id)).then((res) =>
        setMyFavorites(res.data)
      );
      ServicesApp?.getCompany(params?.id).then((res) => {
        setCompanyData(res.data);
        setCompanyOldData(res.data);
      });
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
      setOldRoleAccount(foundRole);
    } else {
      setRoleAccount("");
      setOldRoleAccount("");
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
          setCompanyData={setCompanyData}
        />
      )}
      <form onSubmit={handleSubmit} id="formCompanyPage">
        {tabs[tab]?.component}

        {(!params?.id || roleAccount) && (
          <div className="boxButtonsForm">
            <Button
              customStyles="buttonStyle_02"
              al={tw("aria.resetForm")}
              click={clearAllFormSetters}
              type="reset"
              text={t("reset")}
            />{" "}
            <Button
              customStyles="buttonStyle_01"
              al={tw("aria.confirmForm")}
              type="submit"
              text={t("confirm")}
            />
          </div>
        )}
      </form>
    </div>
  );
};
