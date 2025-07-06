import { CSSProperties, MouseEventHandler } from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  click?: MouseEventHandler<SVGSVGElement> | undefined;
  styles?: CSSProperties | undefined;
}

export const StarIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  stroke = "currentColor",
  click,
  styles,
}) => {
  return (
    <svg
      style={styles}
      onClick={click}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      width={width}
      height={height}
      stroke={stroke}
    >
      <path d="M12 2l2.9 6.62L22 9.24l-5.5 5.36L17.8 22 12 18.56 6.2 22l1.5-7.4L2 9.24l7.1-0.62L12 2z" />
    </svg>
  );
};
