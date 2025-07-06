import { useState } from "react";
import { Params } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ServicesApp } from "../../../../services";
import { BinIcon, StarIcon, ZoomImg } from "../../../../common";
import { ModalWeb } from "../../../../common-app";
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

  const { t } = useTranslation("main");

  const [zoomPhoto, setZoomPhoto] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>("");

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
        <div
          onClick={() => setShowDeleteModal(String(cId))}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="boxDeleteIconCompany"
        >
          <BinIcon
            stroke={isHovered ? "var(--color-error)" : "currentColor"}
            width={30}
            height={30}
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
      {showDeleteModal && (
        <ModalWeb
          customStyles="modalConfirmDeleteCompany"
          msg={t("confirmDelete")}
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          content={showDeleteModal}
          customMaxHeight={"40vh"}
        />
      )}
    </div>
  );
};
