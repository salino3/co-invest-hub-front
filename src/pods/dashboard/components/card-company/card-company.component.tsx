import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PropsCompany } from "../../../../store";
import { ZoomImg } from "../../../../common";
import { routesApp } from "../../../../router";
import "./card-company.styles.scss";

interface Props {
  company: PropsCompany;
}

export const CardCompany: React.FC<Props> = (props) => {
  const { company } = props;
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
  const [zoomPhoto, setZoomPhoto] = useState<boolean>(false);

  return (
    <div className="rootCardCompany">
      <Link
        to={routesApp?.company(name, String(id))}
        className="containerCardCompany"
      >
        <div className="boxUp">
          {/* boxLeftUp */}
          <div className="boxLeftUp">
            <div onClick={() => setZoomPhoto(true)} className="boxLogoCompany">
              <img
                src={logo || "/assets/icons/group_3.svg"}
                alt="Logo"
                onError={(e) =>
                  (e.currentTarget.src = "/assets/icons/group_3.svg")
                }
              />
            </div>
            <ZoomImg
              img={logo || "/assets/icons/group_3.svg"}
              alt="Logo"
              download
              setShow={setZoomPhoto}
              show={zoomPhoto}
            />
            <span className="textName">{name}</span>
          </div>
          <hr />
          {/* boxCenterUp */}
          <div className="boxCenterUp">
            <div className="infoLocation">{location}</div>
            <div className="infoSector">{sector}</div>
          </div>
          <hr />
          {/* boxRightUp */}
          <div className="boxRightUp">
            <div className="infoIMin">{investment_min}</div>
            <div className="infoIMax">{investment_max}</div>
          </div>
        </div>

        <div className="boxDown">
          <div className="hashtagsList">
            {hashtags &&
              hashtags?.length > 0 &&
              hashtags.map((h: string) => <span>#{h}</span>)}
          </div>
        </div>
      </Link>
    </div>
  );
};
