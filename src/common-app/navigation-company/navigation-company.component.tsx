import React from "react";
import { useTranslation } from "react-i18next";
import { PropsTabs } from "../../store";
import "./navigation-company.styles.scss";

interface Props {
  navigation: number;
  setNavigation: React.Dispatch<React.SetStateAction<number>>;
  tabs: PropsTabs[];
}

export const NavigationCompany: React.FC<Props> = (props) => {
  const { navigation, setNavigation, tabs } = props;

  const { t } = useTranslation("main");
  const { t: tw } = useTranslation("wcag");

  return (
    <div className="rootNavigationCompany">
      <nav role="tablist">
        {tabs &&
          tabs?.length > 0 &&
          tabs.map((tab) => (
            <div key={tab?.key} className="companyTab">
              <span
                tabIndex={0}
                aria-label={tw(`aria.${tab?.title}`)}
                role="tab"
                aria-selected={navigation === tab?.key}
                // 'aria-current' redundant due to 'aria-selected'
                // aria-current={navigation === tab?.key ? "page" : undefined}
                className={`${
                  navigation === tab?.key ? "selectedTab" : "unselectedTab"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setNavigation(tab?.key);
                  }
                }}
                onClick={() => setNavigation(tab?.key)}
              >
                {t(tab?.title)}
              </span>
            </div>
          ))}
      </nav>
    </div>
  );
};
