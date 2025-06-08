import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProviderSelector } from "../../store";
import { ServicesApp } from "../../services";
import { useAppFunctions } from "../../hooks";
import { SettingIcon } from "../../common/icons";
import { DropDown } from "../drop-down";
import { Settings } from "../settings";
import { Button, FilterSearching } from "../../common";
import "./header.styles.scss";
import { ExpandableMyCompanies } from "../expandable-my-companies";

export const Header: React.FC = () => {
  const { t } = useTranslation("main");

  const { currentUser, myCompanies, setMyCompanies } = useProviderSelector(
    "currentUser",
    "myCompanies",
    "setMyCompanies"
  );
  const { closeSession } = useAppFunctions();

  // My Companies
  const btnToggleRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [openSelectCompanies, setOpenSelectCompanies] = useState(false);
  const [fadeClose, setFadeClose] = useState(false);
  const [showSettings, setShowSettings] = useState<boolean | null>(null);

  //
  const handleCompanies = () => {
    if (!openSelectCompanies) {
      setOpenSelectCompanies(true);
      setFadeClose(false);
    } else {
      setFadeClose(true);
      setTimeout(() => {
        setOpenSelectCompanies(false);
      }, 1000);
    }
  };

  //
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event?.target as Node) &&
        btnToggleRef.current &&
        btnToggleRef.current !== event?.target &&
        !btnToggleRef.current.contains(event?.target as Node)
      ) {
        setOpenSelectCompanies(false);
        setFadeClose(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
          <div
            ref={btnToggleRef}
            onClick={() => handleCompanies()}
            className={`boxLeft ${currentUser?.email ? "" : "boxVisibility"}`}
          >
            <img
              className={`iconArrowX3${
                !fadeClose && openSelectCompanies ? "rotateIcon" : ""
              }`}
              src={"/assets/icons/arrow_04.svg"}
              aria-label={t("choose_companies")}
              alt={t("arrow_companies")}
            />
            <span>{t("my_companies")}</span>
            <div
              ref={elementRef}
              className={`dropdownCompanies ${
                !fadeClose && openSelectCompanies ? "showDropdown" : ""
              }
              
              ${fadeClose ? "fadeClose" : ""}`}
            >
              {openSelectCompanies && (
                <DropDown height={myCompanies && myCompanies?.length * 42 + 40}>
                  <ExpandableMyCompanies
                    setShow={setOpenSelectCompanies}
                    array={myCompanies ? myCompanies : []}
                    t={t}
                  />
                </DropDown>
              )}
            </div>
          </div>
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
              Settings <SettingIcon />
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
