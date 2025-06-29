import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { DropDown } from "../drop-down";
import "./container-drop-down.styles.scss";

interface ChildProps {
  setOpenSelectDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  setPxHeight: React.Dispatch<React.SetStateAction<number>>;
  pxHeight?: number;
}

interface Props {
  customStyles?: string;
  height?: number;
  title: string;
  children: ReactElement<ChildProps>;
  al?: string | undefined;
  tabIndex?: number | undefined;
}

export const ContainerDropDown: React.FC<Props> = (props) => {
  const { customStyles, height, title, children, al, tabIndex = 0 } = props;

  // const { t } = useTranslation("main");
  const { t: tw } = useTranslation("wcag");

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
    ? React.cloneElement(children, {
        setOpenSelectDropDown,
        setPxHeight,
        pxHeight,
      })
    : children;

  return (
    <div
      ref={btnToggleRef}
      onClick={() => handleItems()}
      className={`rootContainerDropDown  ${customStyles} `}
      aria-label={al}
      tabIndex={tabIndex}
      role="button"
      aria-expanded={openSelectDropDown}
      aria-controls="dropdown-list_01"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleItems();
        } else if (e.key === "Escape") {
          setOpenSelectDropDown?.(false);
          setPxHeight?.(0);
        }
      }}
    >
      <img
        className={`iconArrowX3 ${
          !fadeClose && openSelectDropDown ? "rotateIcon" : ""
        }`}
        src={"/assets/icons/arrow_04.svg"}
        aria-label={tw("aria.choose_element")}
        alt={tw("aria.arrow_icon")}
        tabIndex={0}
      />
      <h3>{title}</h3>
      <div
        id="dropdown-list_01"
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
