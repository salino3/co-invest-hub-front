import styled from "styled-components";
import { rootDropDown } from "./drop-down.styles";

interface DivStyledProps {
  className?: string;
  key?: string;
  $customStyle?: string;
  $dropdownHeight?: string;
}

export const DivStyled = styled.div<DivStyledProps>`
  ${({ $dropdownHeight }) => rootDropDown($dropdownHeight || "0px")}
  ${(props) => props.$customStyle}
`;

export const DropDown: React.FC<{ array: any[]; height: number }> = ({
  array,
  height,
}) => {
  return (
    <DivStyled $dropdownHeight={String(height)}>
      {array &&
        array?.length > 0 &&
        array.map((item, i) => <div key={i}>Hola {i}</div>)}
    </DivStyled>
  );
};
