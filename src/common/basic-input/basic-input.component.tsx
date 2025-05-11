import React from "react";
import { useTranslation } from "react-i18next";
import { useProviderSelector } from "../../store";
import "./basic-input.styles.scss";

interface PropsBasicInput {
  type: string;
  name: string;
  customStyles?: string;
  lbl?: string;
  click?: React.MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  change?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string | number | readonly string[] | undefined;
  ref?: React.Ref<HTMLInputElement> | undefined;
  errMsg?: string;
  checkError?: boolean;
  min?: string | number | undefined;
  rows?: number;
  cols?: number;
}

export const BasicInput: React.FC<PropsBasicInput> = (props) => {
  const {
    type,
    name,
    customStyles,
    lbl,
    click,
    change,
    value,
    ref,
    errMsg,
    checkError = false,
    min,
    rows = 3,
    cols = 30,
  } = props;
  const { t } = useTranslation("main");

  const { theme } = useProviderSelector("theme");

  return (
    <div
      ref={ref}
      className={`containerBasicInput ${customStyles}  ${
        theme === "dark" ? "labelDark" : "labelLight"
      }`}
    >
      <div className="contentInputBI">
        <label className={value ? "label_01" : ""} htmlFor={name}>
          {lbl}
        </label>
        {type === "textarea" ? (
          <textarea
            className={`${checkError ? "inputError" : ""}`}
            id={name + "ID"}
            name={name}
            value={value}
            onClick={click}
            onChange={change}
            rows={rows}
            cols={cols}
          ></textarea>
        ) : (
          <input
            className={`${checkError ? "inputError" : ""}`}
            // It works after focus
            //   pattern="[A-Za-z]{3,10}"
            //   required
            //   onInvalid={handleInvalid} // Handle errors
            min={min}
            id={name + "ID"}
            name={name}
            type={type}
            value={value}
            onClick={click}
            onChange={change}
            // onWheel={(e) => e.currentTarget.blur()}
            onFocus={(e) => {
              e.currentTarget.addEventListener(
                "wheel",
                (e: Event) => e.preventDefault(),
                {
                  passive: false,
                }
              );
            }}
            onBlur={(e) => {
              e.currentTarget.removeEventListener("wheel", (e: Event) =>
                e.preventDefault()
              );
            }}
            // onInput={() => alert("Hi!")} // It works when value change
          />
        )}
      </div>
      {errMsg && <small>{t(errMsg)}</small>}
    </div>
  );
};
