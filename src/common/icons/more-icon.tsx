interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

export const MoreIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      width={width}
      height={height}
    >
      {/* Circle */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill={"none"}
      />

      {/* Symbol + */}
      <line
        x1="12"
        y1="7"
        x2="12"
        y2="17"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="7"
        y1="12"
        x2="17"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};
