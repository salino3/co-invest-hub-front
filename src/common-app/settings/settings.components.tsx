import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useProviderSelector } from "../../store";
import { Switcher } from "../../common/switcher";
import { Arrow02 } from "../../common/icons";
import { DropDown } from "../drop-down";
import { ListLanguages } from "../list-languages";
import "./settings.styles.scss";

interface Props {
  showSettings: boolean | null;
  setShowSettings: Dispatch<SetStateAction<boolean | null>>;
}

export const Settings: React.FC<Props> = ({
  showSettings,
  setShowSettings,
}) => {
  const { t } = useTranslation("main");

  const { theme, changeGlobalColors, currentUser } = useProviderSelector(
    "theme",
    "changeGlobalColors",
    "currentUser"
  );

  const btnToggleRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [openSelectLanguages, setOpenSelectLanguages] = useState(false);
  const [fadeClose, setFadeClose] = useState(false);

  const handleLanguages = () => {
    if (!openSelectLanguages) {
      setOpenSelectLanguages(true);
      setFadeClose(false);
    } else {
      setFadeClose(true);
      setTimeout(() => {
        setOpenSelectLanguages(false);
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
        setOpenSelectLanguages(false);
        setFadeClose(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (showSettings === null) {
    return null;
  } else if (!showSettings)
    setTimeout(() => {
      return null;
    }, 1000);

  return (
    <div className={`rootSettings ${showSettings ? "show" : "hide"}`}>
      <div className="containerSettings_l23">
        <button
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event?.stopPropagation();
            setShowSettings(false);
          }}
        >
          {t("close")} <Arrow02 />
          <Arrow02 />
        </button>
        <Switcher
          t={t}
          currentValue={theme}
          first={"dark"}
          toggle={changeGlobalColors}
          text1="light"
          text2="dark"
        />
        <div
          ref={btnToggleRef}
          onClick={() => handleLanguages()}
          className={`containerSwitchLanguages ${
            currentUser?.email ? "" : "boxVisibility"
          }`}
        >
          <img
            className={`iconArrowX3${
              !fadeClose && openSelectLanguages ? "rotateIcon" : ""
            }`}
            src={"/assets/icons/arrow_04.svg"}
            aria-label={t("choose_companies")}
            alt={t("arrow_companies")}
          />

          <h3>{t("languages")}</h3>
          <div
            ref={elementRef}
            className={`dropdownCompanies ${
              !fadeClose && openSelectLanguages ? "showDropdown" : ""
            }
              
              ${fadeClose ? "fadeClose" : ""}`}
          >
            {openSelectLanguages && (
              <DropDown height={84}>
                <ListLanguages />
              </DropDown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
