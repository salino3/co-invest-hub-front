import React, { MouseEventHandler } from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  click?: MouseEventHandler<SVGSVGElement> | undefined;
}

export const OpenedLockIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  click,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    width={width}
    height={height}
    style={{ cursor: click ? "pointer" : "default" }}
    className="OpenedLockIcon_x08"
    onClick={click}
  >
    <path d="M6 10V7a4 4 0 1 1 8 0h-2a2 2 0 1 0-4 0v3H6zm10 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-1h6a2 2 0 0 1 2 2z" />
  </svg>
);
