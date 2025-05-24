import { ServicesApp } from "../../../../services";
import { StarIcon } from "../../../../common";
import "./first-info-company.styles.scss";
import { Params } from "react-router-dom";

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

  const isFavorited =
    myFavorites &&
    myFavorites?.length > 0 &&
    myFavorites.some((f) => f === Number(params?.id));
  return (
    <div className="containerInfoAboutCompany">
      <div className="infoAboutCompany">
        {!roleAccount && (
          <StarIcon
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
        <div className="boxLogoCompany">
          <img
            src={logo || "/assets/icons/group_3.svg"}
            alt="Logo"
            onError={(e) => (e.currentTarget.src = "/assets/icons/group_3.svg")}
          />
        </div>
      </div>
      <hr
        style={{
          width: "98%",
        }}
      />
    </div>
  );
};
