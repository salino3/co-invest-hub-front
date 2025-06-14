import React from "react";
import { Link } from "react-router-dom";
import { TFunction } from "i18next";
import { MyCompany } from "../../store";
import { MoreIcon } from "../../common/icons";
import { routesApp } from "../../router";
import "./expandable-my-companies.styles.scss";

interface Props {
  setOpenSelectDropDown?: React.Dispatch<React.SetStateAction<boolean>>;
  t: TFunction<"main", undefined>;
  array: MyCompany[];
}

export const ExpandableMyCompanies: React.FC<Props> = (props) => {
  const { setOpenSelectDropDown, t, array } = props;
  return (
    <div className="rootExpandableMyCompanies">
      {array && array?.length > 0 ? (
        array.map((item: MyCompany) => (
          <Link
            to={routesApp?.company(item?.name, String(item?.id))}
            onClick={() => setOpenSelectDropDown?.(false)}
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
        onClick={() => setOpenSelectDropDown?.(false)}
        to={routesApp?.create_company}
      >
        {t("add_company")} <MoreIcon width={16} height={16} />
      </Link>
    </div>
  );
};
