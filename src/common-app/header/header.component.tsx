import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./header.styles.scss";
import { DropDown } from "../drop-down";

export const Header: React.FC = () => {
  const { t } = useTranslation("main");

  // My Companies
  const btnToggleRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [openSelectCompanies, setOpenSelectCompanies] = useState(false);
  const [fadeClose, setFadeClose] = useState(false);

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
              src={"assets/icons/arrow_04.svg"}
              aria-label={t("choose_language")}
              alt={t("arrow_languages")}
            />
            <span>my companies</span>
            <div
              ref={elementRef}
              className={` dropdownCompanies ${
                !fadeClose && openSelectCompanies ? "showDropdown" : ""
              }
              
              ${fadeClose ? "fadeClose" : ""}`}
            >
              {openSelectCompanies && <DropDown />}
            </div>
          </div>
          <div className="boxCenter">
            <span>Searching</span>
          </div>
          <div className="boxRight">
            <span>Settings</span>
          </div>
        </div>
      </div>
    </header>
  );
};
