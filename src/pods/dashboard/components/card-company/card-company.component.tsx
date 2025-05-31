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
  const { logo, name, id } = company;
  const [zoomPhoto, setZoomPhoto] = useState<boolean>(false);

  return (
    <div className="rootCardCompany">
      <Link
        to={routesApp?.company(name, String(id))}
        className="containerCardCompany"
      >
        <div onClick={() => setZoomPhoto(true)} className="boxLogoCompany">
          <img
            src={logo || "/assets/icons/group_3.svg"}
            alt="Logo"
            onError={(e) => (e.currentTarget.src = "/assets/icons/group_3.svg")}
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
      </Link>
    </div>
  );
};
