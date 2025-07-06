import { useState } from "react";
import { Params } from "react-router-dom";
import { ServicesApp } from "../../../../services";
import { StarIcon, ZoomImg } from "../../../../common";
import "./first-info-company.styles.scss";

interface Props {
  params: Readonly<Params<string>>;
  roleAccount: string;
  myFavorites: number[];
  cId: string | number;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
  logo: string;
}

export const FirstInfoCompany: React.FC<Props> = (props) => {
  const { params, roleAccount, myFavorites, cId, setFlag, logo } = props;

  const [zoomPhoto, setZoomPhoto] = useState<boolean>(false);

  const isFavorited =
    myFavorites &&
    myFavorites?.length > 0 &&
    myFavorites.some((f) => f === Number(params?.id));
  return (
    <div className="containerInfoAboutCompany">
      <div className="infoAboutCompany">
        {!roleAccount && (
          <StarIcon
            styles={{
              cursor: "pointer",
            }}
            click={() =>
              ServicesApp?.[isFavorited ? "deleteFavorite" : "addFavorite"]({
                account_id: isFavorited ? String(cId) : Number(cId),
                company_id: isFavorited
                  ? String(params?.id)
                  : Number(params?.id),
              }).then(() => setFlag((prev: boolean) => !prev))
            }
            fill={isFavorited ? "gold" : "currentColor"}
          />
        )}
        <h4>* {params?.name} * </h4>
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
      </div>
      <hr
        style={{
          width: "98%",
        }}
      />
    </div>
  );
};
