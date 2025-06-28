import { Dispatch, MouseEvent, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { useProviderSelector } from "../../store";
import { Switcher } from "../../common/switcher";
import { Arrow02 } from "../../common/icons";
import { ContainerDropDown } from "../container-drop-down";
import { ListLanguages } from "../list-languages";
import "./settings.styles.scss";

interface Props {
  showSettings: boolean | null;
  setShowSettings: Dispatch<SetStateAction<boolean | null>>;
  id?: string | undefined;
}

export const Settings: React.FC<Props> = ({
  showSettings,
  setShowSettings,
  id,
}) => {
  const { t } = useTranslation("main");

  const { theme, changeGlobalColors } = useProviderSelector(
    "theme",
    "changeGlobalColors"
  );

  if (showSettings === null) {
    return null;
  } else if (!showSettings)
    setTimeout(() => {
      return null;
    }, 1000);

  return (
    <div id={id} className={`rootSettings ${showSettings ? "show" : "hide"}`}>
      <div className="containerSettings_l23">
        <button
          tabIndex={0}
          aria-label={t("close_settings_header")}
          className="btnCloseSettings"
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event?.stopPropagation();
            setShowSettings(false);
          }}
        >
          {t("close")} &nbsp; <Arrow02 />
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
        <ContainerDropDown height={84} title={t("languages")}>
          <ListLanguages />
        </ContainerDropDown>
      </div>
    </div>
  );
};
