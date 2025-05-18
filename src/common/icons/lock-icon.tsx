import React, { MouseEventHandler } from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  click?: MouseEventHandler<SVGSVGElement> | undefined;
}

export const LockIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  click,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 24 24"
    style={{ cursor: click ? "pointer" : "default" }}
    className="LockIcon_x08"
    onClick={click}
  >
    <path d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zm-6 0V6a2 2 0 1 1 4 0v2h-4z" />
  </svg>
);
