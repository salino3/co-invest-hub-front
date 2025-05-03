import React from "react";
import { PropsTabs } from "../../store";
import "./navigation-company.styles.scss";

interface Props {
  navigation: number;
  setNavigation: React.Dispatch<React.SetStateAction<number>>;
  tabs: PropsTabs[];
}

export const NavigationCompany: React.FC<Props> = (props) => {
  const { navigation, setNavigation, tabs } = props;
  return (
    <div className="rootNavigationCompany">
      <nav>
        {tabs &&
          tabs?.length > 0 &&
          tabs.map((tab) => (
            <div className="companyTab">
              <span
                className={` ${
                  navigation === tab?.key ? "selectedTab" : "unselectedTab"
                }`}
                onClick={() => setNavigation(tab?.key)}
              >
                {tab?.title}
              </span>
            </div>
          ))}
      </nav>
    </div>
  );
};
