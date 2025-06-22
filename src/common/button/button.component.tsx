import React from "react";
import "./button.styles.scss";

interface Props {
  customStyles?: string;
  text?: string;
  type?: "submit" | "reset" | "button" | undefined;
  children?: React.ReactNode;
  click?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  al?: string | undefined;
  tabIndex?: number | undefined;
}

export const Button: React.FC<Props> = (props) => {
  const { customStyles, text, type, children, click, al, tabIndex = 0 } = props;

  return (
    <div className={`${customStyles} rootButton_x78`}>
      <button
        aria-label={al}
        tabIndex={tabIndex}
        onClick={click}
        className="btnComponent"
        type={type}
      >
        {text || children}
      </button>
    </div>
  );
};
