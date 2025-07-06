import React, { MouseEventHandler } from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  click?: MouseEventHandler<SVGSVGElement> | undefined;
  customStyles?: string;
  shape?: "round" | "butt" | "square" | "inherit";
}

export const CrossIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  fill = "none",
  stroke = "currentColor",
  click,
  customStyles,
  shape = "round",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${customStyles}`}
      onClick={click}
      viewBox="0 0 24 24"
      fill={fill}
      width={width}
      height={height}
      stroke={stroke}
      strokeLinecap={shape}
      strokeLinejoin={"round"}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
};
