import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { DropDown } from "../drop-down";
import "./container-drop-down.styles.scss";

interface ChildProps {
  setOpenSelectDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  customStyles?: string;
  height?: number;
  title: string;
  children: ReactElement<ChildProps>;
}

export const ContainerDropDown: React.FC<Props> = (props) => {
  const { customStyles, height, title, children } = props;

  const { t } = useTranslation("main");

  const btnToggleRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [openSelectDropDown, setOpenSelectDropDown] = useState(false);
  const [fadeClose, setFadeClose] = useState(false);

  const handleLanguages = () => {
    if (!openSelectDropDown) {
      setOpenSelectDropDown(true);
      setFadeClose(false);
    } else {
      setFadeClose(true);
      setTimeout(() => {
        setOpenSelectDropDown(false);
      }, 1000);
    }
  };

  //
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event?.target as Node) &&
        btnToggleRef.current &&
        btnToggleRef.current !== event?.target &&
        !btnToggleRef.current.contains(event?.target as Node)
      ) {
        setOpenSelectDropDown(false);
        setFadeClose(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Inject prop into the child
  const clonedChildren = React.isValidElement(children)
    ? React.cloneElement(children, { setOpenSelectDropDown })
    : children;

  return (
    <div
      ref={btnToggleRef}
      onClick={() => handleLanguages()}
      className={`rootContainerDropDown  ${customStyles} `}
    >
      <img
        className={`iconArrowX3 ${
          !fadeClose && openSelectDropDown ? "rotateIcon" : ""
        }`}
        src={"/assets/icons/arrow_04.svg"}
        aria-label={t("choose_element")}
        alt={t("arrow_icon")}
      />
      <h3>{title}</h3>
      <div
        ref={elementRef}
        className={`dropdownItems ${
          !fadeClose && openSelectDropDown ? "showDropdown" : ""
        }
              ${fadeClose ? "fadeClose" : ""}`}
      >
        {openSelectDropDown && (
          <DropDown height={height}>{clonedChildren}</DropDown>
        )}
      </div>
    </div>
  );
};
