import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProviderSelector } from "../../store";
import { ServicesApp } from "../../services";
import { useAppFunctions } from "../../hooks";
import { SettingIcon } from "../../common/icons";
import { DropDown } from "../drop-down";
import { Settings } from "../settings";
import { Button } from "../../common/button";
import "./header.styles.scss";

export const Header: React.FC = () => {
  const { t } = useTranslation("main");

  const { currentUser } = useProviderSelector("currentUser");
  const { closeSession } = useAppFunctions();

  // My Companies
  const btnToggleRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [openSelectCompanies, setOpenSelectCompanies] = useState(false);
  const [fadeClose, setFadeClose] = useState(false);
  const [showSettings, setShowSettings] = useState<boolean | null>(null);
  const [listMyCompanies, setListMyCompanies] = useState<
    { id: number; name: string }[]
  >([]);

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
    if (currentUser?.id) {
      ServicesApp?.getMyCompanies(String(currentUser?.id)).then((res) =>
        setListMyCompanies(res.data)
      );
    }
  }, [currentUser?.id]);

  return (
    <header className="rootHeader">
      <div className="containerHeader">
        <div className="boxUp">
          <div className="boxData">
            {t("email")}
            <Button click={() => closeSession()} text={t("logout")} />
          </div>
          <div className="boxName">{t("logo")}</div>
        </div>
        <div className="boxDown">
          <div
            ref={btnToggleRef}
            onClick={() => handleCompanies()}
            className={`boxLeft ${currentUser?.email ? "" : "boxVisibility"}`}
          >
            <img
              className={`iconLanguage ${
                !fadeClose && openSelectCompanies ? "rotateIcon" : ""
              }`}
              src={"/assets/icons/arrow_04.svg"}
              aria-label={t("choose_language")}
              alt={t("arrow_languages")}
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
                <DropDown
                  setShow={setOpenSelectCompanies}
                  array={listMyCompanies && listMyCompanies}
                  height={listMyCompanies && listMyCompanies?.length * 42 + 35}
                  t={t}
                />
              )}
            </div>
          </div>
          <div
            className={`boxCenter   ${
              currentUser?.email ? "" : "boxVisibility"
            }`}
          >
            <span>Searching</span>
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
