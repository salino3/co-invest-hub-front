interface Props {
  width?: number;
  height?: number;
  fill?: string;
  transform?: string;
}

export const Arrow02: React.FC<Props> = ({
  width = 11,
  height = 18,
  fill = "currentColor",
  transform = "-25",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 18"
      fill={fill}
      style={{
        transform: `rotate(${transform}deg)`,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3162 10.9487C10.8402 10.774 11.1233 10.2077 10.9487 9.68377L8.10263 1.14562C7.92799 0.621679 7.36167 0.338519 6.83772 0.513167C6.31378 0.687815 6.03062 1.25413 6.20527 1.77808L8.73509 9.36754L1.14562 11.8974C0.621679 12.072 0.338519 12.6383 0.513167 13.1623C0.687815 13.6862 1.25413 13.9694 1.77808 13.7947L10.3162 10.9487ZM7.55279 9.89443L9.55279 10.8944L10.4472 9.10557L8.44721 8.10557L7.55279 9.89443Z"
        fill={fill}
      />
    </svg>
  );
};
