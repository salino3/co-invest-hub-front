import React from "react";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";
import { PropsCompany } from "../../../../store";
import { routesApp } from "../../../../router";
import "./card-company.styles.scss";

interface Props {
  t: TFunction<"main", undefined>;
  company: PropsCompany;
}

export const CardCompany: React.FC<Props> = (props) => {
  const { t, company } = props;
  const {
    logo,
    name,
    id,
    hashtags,
    location,
    sector,
    investment_min,
    investment_max,
  } = company;

  return (
    <div className="rootCardCompany">
      <Link
        to={routesApp?.company(name, String(id))}
        className="containerCardCompany"
      >
        <div className="boxUp">
          {/* boxLeftUp */}
          <div className="boxLeftUp">
            <div className="boxLogoCompany">
              <img
                src={logo || "/assets/icons/group_3.svg"}
                alt="Logo"
                onError={(e) =>
                  (e.currentTarget.src = "/assets/icons/group_3.svg")
                }
              />
            </div>

            <span className="textName">{name}</span>
          </div>
          <hr />
          {/* boxCenterUp */}
          <div className="boxCenterUp">
            <div className="infoLocation">
              <strong>{t("location")}:</strong>
              <span>{location}</span>
            </div>
            <div className="infoSector">
              <strong>{t("sector")}:</strong>
              <span>{sector}</span>
            </div>
          </div>
          <hr />
          {/* boxRightUp */}
          <div className="boxRightUp">
            <div className="infoIMin">
              <strong>{t("investment_min")}:</strong>
              <span>{investment_min}</span>
            </div>
            <div className="infoIMax">
              {" "}
              <strong>{t("investment_max")}:</strong>
              <span>{investment_max}</span>
            </div>
          </div>
        </div>

        <div className="boxDown">
          <div className="hashtagsList">
            {hashtags &&
              hashtags?.length > 0 &&
              hashtags.map((h: string) => <span key={h}>#{h}</span>)}
          </div>
        </div>
      </Link>
    </div>
  );
};
