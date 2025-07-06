import React from "react";
import { useTranslation } from "react-i18next";
import { useProviderSelector } from "../../store";
import { LockIcon, OpenedLockIcon, PenUpdateIcon } from "../icons";
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
  readonly?: boolean;
  update?: any; // Setter
  min?: string | number | undefined;
  rows?: number;
  cols?: number;
  ariaLabelLbl?: string;
  ariaLabeInput?: string;
  // aria-required: type Booleanish = boolean | "true" | "false", default false
  ariaRq?: boolean | "true" | "false";
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
    readonly = false,
    update = null,
    min,
    rows = 3,
    cols = 30,
    ariaLabelLbl,
    ariaLabeInput,
    ariaRq,
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
        {!!update ? (
          readonly ? (
            <LockIcon height={18} width={18} fill="var(--color-error)" />
          ) : (
            <OpenedLockIcon fill="var(--color-correct)" />
          )
        ) : null}
        <label
          className={`${value ? "label_01" : ""}
     ${readonly ? "labelReadonly" : ""}`}
          htmlFor={name + "ID"}
          aria-label={ariaLabelLbl}
        >
          {lbl}
        </label>
        {type === "textarea" ? (
          <textarea
            className={`${checkError ? "inputError" : ""}
                ${readonly ? "readonly" : ""} 
              `}
            id={name + "ID"}
            name={name}
            value={value}
            onClick={click}
            onChange={change}
            aria-label={ariaLabeInput}
            rows={rows}
            cols={cols}
            readOnly={readonly}
            aria-required={ariaRq}
          ></textarea>
        ) : (
          <input
            className={`${checkError ? "inputError" : ""}
           ${readonly ? "readonly" : ""}    
              `}
            // It works after focus
            //   pattern="[A-Za-z]{3,10}"
            //   required
            //   onInvalid={handleInvalid} // Handle errors
            min={min}
            id={name + "ID"}
            name={name}
            type={type}
            value={value}
            readOnly={readonly}
            onClick={click}
            onChange={change}
            aria-label={ariaLabeInput}
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
            aria-required={ariaRq}
          />
        )}
        {!!update && (
          <PenUpdateIcon
            customStyles={"PenUpdateIcon_x67"}
            click={() => update()}
            height={16}
            width={16}
          />
        )}
      </div>
      {errMsg && <small role="alert">{t(errMsg)}</small>}
    </div>
  );
};
