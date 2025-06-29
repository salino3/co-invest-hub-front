import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TFunction } from "i18next";
import { MyCompany } from "../../store";
import { MoreIcon } from "../../common/icons";
import { routesApp } from "../../router";
import "./expandable-my-companies.styles.scss";

interface Props {
  setOpenSelectDropDown?: React.Dispatch<React.SetStateAction<boolean>>;
  setPxHeight?: React.Dispatch<React.SetStateAction<number>>;
  pxHeight?: number;
  t: TFunction<"main", undefined>;
  array: MyCompany[];
}

export const ExpandableMyCompanies: React.FC<Props> = (props) => {
  const { setOpenSelectDropDown, setPxHeight, pxHeight, t, array } = props;
  const navigate = useNavigate();
  const [isClose, setIsClose] = useState(false);

  function closingElement() {
    setOpenSelectDropDown?.(false);
    setPxHeight?.(0);
  }

  useEffect(() => {
    setTimeout(
      () => {
        return setIsClose((prev) => !prev);
      },
      pxHeight === 0 ? 1000 : 0
    );
  }, [pxHeight]);

  if (isClose) {
    return;
  }

  return (
    <div role="listbox" className="rootExpandableMyCompanies">
      {array && array?.length > 0 ? (
        array.map((item: MyCompany) => (
          <Link
            role="option"
            to={routesApp?.company(item?.name, String(item?.id))}
            onClick={() => closingElement()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                closingElement();
                navigate(routesApp.company(item.name, String(item.id)));
              }
            }}
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            closingElement();
            navigate(routesApp?.create_company);
          }
        }}
        to={routesApp?.create_company}
      >
        {t("add_company")} <MoreIcon width={16} height={16} />
      </Link>
    </div>
  );
};
