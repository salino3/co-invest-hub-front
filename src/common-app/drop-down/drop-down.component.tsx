import styled from "@emotion/styled";
import { TFunction } from "i18next";
import { rootDropDown } from "./drop-down.styles";

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
  array: { id: number; name: string }[];
  height: number;
  t: TFunction<"main", undefined>;
}> = ({ array, height, t }) => {
  return (
    <DivStyled $dropdownHeight={String(height == 35 ? 80 : height)}>
      {array && array?.length > 0 ? (
        array.map((item: { id: number; name: string }) => (
          <span className="company_02" key={item?.id}>
            {item?.name}
          </span>
        ))
      ) : (
        <div className="noCompanies" key={"xxx"}>
          {t("no_companies")}
        </div>
      )}
      <div className="addCompany">{t("add_company")}</div>
    </DivStyled>
  );
};
