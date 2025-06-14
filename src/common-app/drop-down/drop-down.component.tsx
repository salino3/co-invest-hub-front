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
  pxHeight: number;
  children: React.ReactNode;
}> = ({ pxHeight, children }) => {
  return (
    <DivStyled
      $dropdownHeight={String(pxHeight && pxHeight == 35 ? 80 : pxHeight)}
      data-status="green"
      // className={`${pxHeight === 0 ? close : open}`}
      // data-status-height={heightDropDown}
      style={{ "--dropdown-height": `${pxHeight}px` } as React.CSSProperties}
      onClick={(event) => {
        event?.stopPropagation();
      }}
    >
      {children}
    </DivStyled>
  );
};
