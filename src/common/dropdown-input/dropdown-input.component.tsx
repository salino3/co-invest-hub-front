import { useTranslation } from "react-i18next";
import { useProviderSelector } from "../../store";
import { useAppFunctions } from "../../hooks";
import { LockIcon, OpenedLockIcon, PenUpdateIcon } from "../icons";
import "./dropdown-input.styles.scss";

//
enum TypeKeyDown {
  Number = "number",
  String = "string",
  Null = "null",
}

interface PropsDropdownInput {
  type: string;
  name: string;
  customStyles?: string;
  lbl?: string;
  click?: React.MouseEventHandler<HTMLInputElement | HTMLSelectElement>;
  change?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
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
  typeKeyDown?: TypeKeyDown;
}

export const DropDownInput: React.FC<PropsDropdownInput> = (props) => {
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
    ariaLabelLbl,
    ariaLabeInput,
    ariaRq,
    typeKeyDown,
  } = props;
  const { t } = useTranslation("main");
  const { t: tw } = useTranslation("wcag");

  const { theme } = useProviderSelector("theme");
  const { handleNumericPaste } = useAppFunctions();

  return (
    <div
      ref={ref}
      className={`containerDropDownInput ${customStyles}  ${
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
        {type === "dropdownOneValue" ? (
          <select
            className={`${checkError ? "inputError" : ""}
                ${readonly ? "readonly" : ""} 
              `}
            id={name + "ID"}
            name={name}
            value={value}
            onClick={click}
            onChange={change}
            aria-label={ariaLabeInput}
            // readOnly={readonly}
            aria-required={ariaRq}
          >
            <optgroup label="Multimedia type">
              <option value="" hidden></option>
              <option value="">..</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </optgroup>
          </select>
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
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                // e.preventDefault();
              }
            }}
            onPaste={
              typeKeyDown === TypeKeyDown.Number
                ? handleNumericPaste
                : undefined
            }
            // onInput={() => alert("Hi!")} // It works when value change
            aria-required={ariaRq}
          />
        )}
        {!!update && (
          <PenUpdateIcon
            customStyles={"PenUpdateIcon_x67"}
            arialabel={tw("aria.penBtn")}
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
