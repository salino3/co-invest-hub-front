import { useTranslation } from "react-i18next";

import "./header.styles.scss";
export const Header: React.FC = () => {
  const { t } = useTranslation("main");

  return (
    <header className="rootHeader">
      <div className="containerHeader">
        <div className="boxUp">
          <div className="boxData">{t("email")}</div>
          <div className="boxName">{t("logo")}</div>
        </div>
        <div className="boxDown">
          <div className="boxLeft">
            <span>my companies</span>
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
