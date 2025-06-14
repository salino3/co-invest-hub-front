import React from "react";
import styled from "@emotion/styled";
import { rootDropDown } from "./drop-down.styles";

interface DivStyledProps {
  className?: string;
  key?: string;
  $customStyle?: string;
  $dropdownHeight?: string;
}

export const DivStyled = styled.div<DivStyledProps>`
  ${({ $dropdownHeight }) => rootDropDown($dropdownHeight || "0")}
  ${({ $customStyle }) => $customStyle || ""}
`;

// <DropDown> with inside <DivStyled>
export const DropDown: React.FC<{
  height: number | undefined;
  children: React.ReactNode;
}> = ({ height, children }) => {
  return (
    <DivStyled
      $dropdownHeight={String(height == 35 ? 80 : height)}
      onClick={(event) => event?.stopPropagation()}
    >
      {children}
    </DivStyled>
  );
};
