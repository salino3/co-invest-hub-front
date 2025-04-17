import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ServicesApp } from "../../services";
import { SettingIcon } from "../../common/icons";
import { DropDown } from "../drop-down";
import { Settings } from "../settings";
import "./header.styles.scss";

export const Header: React.FC = () => {
  const { t } = useTranslation("main");

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
    ServicesApp?.getMyCompanies("4").then((res) =>
      setListMyCompanies(res.data)
    );
  }, []);

  return (
    <header className="rootHeader">
      <div className="containerHeader">
        <div className="boxUp">
          <div className="boxData">{t("email")}</div>
          <div className="boxName">{t("logo")}</div>
        </div>
        <div className="boxDown">
          <div
            ref={btnToggleRef}
            onClick={() => handleCompanies()}
            className={`boxLeft `}
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
                  array={listMyCompanies && listMyCompanies}
                  height={listMyCompanies && listMyCompanies?.length * 42 + 5}
                />
              )}
            </div>
          </div>
          <div className="boxCenter">
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
            <Settings
              showSettings={showSettings}
              setShowSettings={setShowSettings}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
