import React from "react";
import styled from "@emotion/styled";
import { rootDropDown } from "./drop-down.styles";

interface DivStyledProps {
  className?: string;
  key?: string;
  $customStyle?: string;
  $dropdownHeight?: string;
  al?: string | undefined;
}

export const DivStyled = styled.div<DivStyledProps>`
  ${({ $dropdownHeight }) => rootDropDown($dropdownHeight || "0")}
  ${({ $customStyle }) => $customStyle || ""}
`;

// <DropDown> with inside <DivStyled>
export const DropDown: React.FC<{
  pxHeight: number;
  children: React.ReactNode;
  al?: string | undefined;
  tabIndex?: number | undefined;
}> = ({ pxHeight, children, al }) => {
  return (
    <DivStyled
      $dropdownHeight={String(pxHeight && pxHeight == 35 ? 80 : pxHeight)}
      // data-status="green"
      // data-status-width={300}
      aria-label={al}
      style={{ "--dropdown-height": `${pxHeight}px` } as React.CSSProperties}
      onClick={(event) => {
        event?.stopPropagation();
      }}
    >
      {children}
    </DivStyled>
  );
};
