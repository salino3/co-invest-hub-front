import React, { MouseEventHandler } from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  click?: MouseEventHandler<SVGSVGElement> | undefined;
  customStyles?: string;
}

export const PenUpdateIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  click,
  customStyles,
}) => {
  return (
    <svg
      style={{ cursor: click ? "pointer" : "default" }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      width={width}
      height={height}
      className={`${customStyles} PenUpdateIcon_x08`}
      onClick={click}
    >
      <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25z" />
      <path d="M20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
      <line
        x1="3"
        y1="23"
        x2="20"
        y2="23"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};
