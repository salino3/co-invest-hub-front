import styled from "@emotion/styled";
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
}> = ({ array, height }) => {
  return (
    <DivStyled $dropdownHeight={String(height == 5 ? 47 : height)}>
      {array && array?.length > 0 ? (
        array.map((item, i) => (
          <span className="company_02" key={item?.id}>
            {item?.name}
          </span>
        ))
      ) : (
        <div key={"xxx"}>No companies...</div>
      )}
    </DivStyled>
  );
};
