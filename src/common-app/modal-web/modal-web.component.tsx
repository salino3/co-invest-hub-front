import React, { SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CrossIcon } from "../../common/icons";
import "./modal-web.styles.scss";

interface Props {
  children: React.ReactNode;
  show: any;
  setShow: React.Dispatch<SetStateAction<any>>;
  msg: string;
  customStyles?: string;
  customMaxHeight?: string;
}

export const ModalWeb: React.FC<Props> = (props) => {
  const {
    children,
    show,
    setShow,
    msg,
    customStyles,
    customMaxHeight = "auto",
  } = props;
  const { t: tw } = useTranslation("wcag");

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

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
            id="closeModalWebButton"
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
        <div className="bodyModal">{children}</div>
      </div>
    </div>
  );
};
