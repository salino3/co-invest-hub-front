import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProviderSelector } from "../../store";
import { ServicesApp } from "../../services";
import { useAppFunctions } from "../../hooks";
import { SettingIcon } from "../../common/icons";
import { Settings } from "../settings";
import { Button, FilterSearching } from "../../common";
import { ExpandableMyCompanies } from "../expandable-my-companies";
import { ContainerDropDown } from "../container-drop-down";
import "./header.styles.scss";

export const Header: React.FC = () => {
  const { t } = useTranslation("main");

  const { currentUser, myCompanies, setMyCompanies } = useProviderSelector(
    "currentUser",
    "myCompanies",
    "setMyCompanies"
  );
  const { closeSession } = useAppFunctions();

  const [showSettings, setShowSettings] = useState<boolean | null>(null);

  //
  useEffect(() => {
    const handleClickOutsideSetting = (event: MouseEvent) => {
      const settingElement = document.getElementById("spanSettingComponent");
      if (
        settingElement &&
        !settingElement.contains(event.target as Node) &&
        showSettings
      ) {
        setShowSettings(false);
      }
    };

    document.addEventListener("click", handleClickOutsideSetting);

    return () => {
      document.removeEventListener("click", handleClickOutsideSetting);
    };
  }, [showSettings]);

  useEffect(() => {
    if (currentUser?.id && myCompanies?.length === 0) {
      ServicesApp?.getMyCompanies(String(currentUser?.id)).then(
        (res) => setMyCompanies && setMyCompanies(res.data)
      );
    }
  }, [currentUser?.id]);

  return (
    <header className="rootHeader">
      <div className="containerHeader">
        {/* <BossaAudioPlayer /> */}
        <div className="boxUp">
          <div className="boxData">
            {t("email")}: {currentUser?.email}
            <Button click={() => closeSession()} text={t("logout")} />
          </div>
          <div className="boxNameCompany">
            <img src="/assets/images/Co_Invest_Hub.png" alt={t("logo")} />
          </div>
        </div>
        <div className="boxDown">
          {currentUser?.id && (
            <ContainerDropDown
              height={myCompanies && myCompanies?.length * 42 + 40}
              title={t("my_companies")}
            >
              <ExpandableMyCompanies
                array={myCompanies ? myCompanies : []}
                t={t}
              />
            </ContainerDropDown>
          )}
          <div
            className={`boxCenter   ${
              currentUser?.email ? "" : "boxVisibility"
            }`}
          >
            <FilterSearching />
          </div>
          <div
            onClick={() => setShowSettings(true)}
            style={{
              cursor: showSettings ? "default" : "pointer",
            }}
            id="spanSettingComponent"
            className="boxRight"
          >
            <span>
              {t("settings")} <SettingIcon />
            </span>
            {showSettings && (
              <Settings
                showSettings={showSettings}
                setShowSettings={setShowSettings}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
