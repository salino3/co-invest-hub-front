import React from "react";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";
import { MyCompany } from "../../store";
import { MoreIcon } from "../../common/icons";
import { routesApp } from "../../router";
import "./expandable-my-companies.styles.scss";

interface Props {
  setOpenSelectDropDown?: React.Dispatch<React.SetStateAction<boolean>>;
  setPxHeight?: React.Dispatch<React.SetStateAction<number>>;
  t: TFunction<"main", undefined>;
  array: MyCompany[];
}

export const ExpandableMyCompanies: React.FC<Props> = (props) => {
  function closingElement() {
    setOpenSelectDropDown?.(false);
    setPxHeight?.(0);
  }

  const { setOpenSelectDropDown, setPxHeight, t, array } = props;
  return (
    <div className="rootExpandableMyCompanies">
      {array && array?.length > 0 ? (
        array.map((item: MyCompany) => (
          <Link
            to={routesApp?.company(item?.name, String(item?.id))}
            onClick={() => closingElement()}
            className="company_02"
            key={item?.id}
          >
            {item?.name}
          </Link>
        ))
      ) : (
        <div className="opacityStyles" key={"xxx"}>
          {t("no_companies")}
        </div>
      )}
      <Link
        className="addCompany opacityStyles"
        onClick={() => closingElement()}
        to={routesApp?.create_company}
      >
        {t("add_company")} <MoreIcon width={16} height={16} />
      </Link>
    </div>
  );
};
