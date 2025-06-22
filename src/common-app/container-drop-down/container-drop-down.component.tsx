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

  //
  const [pxHeight, setPxHeight] = useState<number>(0);

  const handleItems = () => {
    if (!openSelectDropDown) {
      setOpenSelectDropDown(true);
      setFadeClose(false);
    } else {
      setFadeClose(true);
      setTimeout(() => {
        setOpenSelectDropDown(false);
      }, 1000);
    }
    //
    if (pxHeight === 0) {
      setPxHeight(height && height == 35 ? 80 : height || 0);
    } else {
      setPxHeight(0);
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
        setPxHeight(0);
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
      onClick={() => handleItems()}
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
        <DropDown pxHeight={pxHeight}>{clonedChildren}</DropDown>
      </div>
    </div>
  );
};
