import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { TFunction } from "i18next";
import { MoreIcon } from "../../common/icons";
import { rootDropDown } from "./drop-down.styles";
import { routesApp } from "../../router";

interface DivStyledProps {
  className?: string;
  key?: string;
  $customStyle?: string;
  $dropdownHeight?: string;
}

export const DivStyled = styled.div<DivStyledProps>`
  ${({ $dropdownHeight }) => rootDropDown($dropdownHeight || "0px")}
  ${({ $customStyle }) => $customStyle || ""}
`;

// <DropDown> with inside <DivStyled>
export const DropDown: React.FC<{
  setShow: Dispatch<SetStateAction<boolean>>;
  array: { id: number; name: string }[];
  height: number;
  t: TFunction<"main", undefined>;
}> = ({ setShow, array, height, t }) => {
  return (
    <DivStyled
      $dropdownHeight={String(height == 35 ? 80 : height)}
      onClick={(event) => event?.stopPropagation()}
    >
      {array && array?.length > 0 ? (
        array.map((item: { id: number; name: string }) => (
          <Link
            to={routesApp?.company(item?.name, String(item?.id))}
            onClick={() => setShow(() => false)}
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
        onClick={() => setShow(() => false)}
        to={routesApp?.create_company}
      >
        {t("add_company")} <MoreIcon width={16} height={16} />
      </Link>
    </DivStyled>
  );
};
