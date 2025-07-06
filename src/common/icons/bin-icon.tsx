import { MouseEventHandler } from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  click?: MouseEventHandler<SVGSVGElement> | undefined;
  customStyles?: string;
}

export const BinIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  fill = "none",
  stroke = "currentColor",
  click,
  customStyles,
}) => {
  return (
    <svg
      className={`${customStyles}`}
      onClick={click}
      viewBox="0 0 24 24"
      fill={fill}
      width={width}
      height={height}
      stroke={stroke}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 7H18V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H8C7.46957 21 6.96086 20.7893 6.58579 20.4142C6.21071 20.0391 6 19.5304 6 19V7Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 4L14.5 2H9.5L9 4H4V6H20V4H15Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 11L9 17"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 11L15 17"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
