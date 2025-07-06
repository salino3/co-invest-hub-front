import React, { SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { CrossIcon } from "../../common/icons";
import "./modal-web.styles.scss";

interface Props {
  content: any;
  show: any;
  setShow: React.Dispatch<SetStateAction<any>>;
  msg: string;
  customStyles?: string;
  customMaxHeight?: string;
}

export const ModalWeb: React.FC<Props> = (props) => {
  const {
    content,
    show,
    setShow,
    msg,
    customStyles,
    customMaxHeight = "auto",
  } = props;
  const { t: tw } = useTranslation("wcag");

  return (
    <div className={`rootModalWeb ${customStyles}`}>
      <div
        role="dialog"
        style={{
          maxHeight: customMaxHeight,
        }}
        className="containerModal"
      >
        <div className="headerModal">
          {msg}{" "}
          <div
            role="button"
            tabIndex={0}
            aria-label={tw("aria.closeModal")}
            className="closeIcon"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShow((prev: any) =>
                  typeof prev === "boolean" ? !prev : null
                );
              }
            }}
            onClick={() =>
              setShow((prev: any) => (typeof prev === "boolean" ? !prev : null))
            }
          >
            <CrossIcon />
          </div>
        </div>
        <div className="bodyModal">{content}</div>
      </div>
    </div>
  );
};
