import { Dispatch, MouseEvent, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Arrow02 } from "../../common/icons";
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

  if (showSettings === null) {
    return null;
  } else if (!showSettings)
    setTimeout(() => {
      return null;
    }, 1000);

  return (
    <div className={`rootSettings ${showSettings ? "show" : "hide"}`}>
      <button
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          event?.stopPropagation();
          setShowSettings(false);
        }}
      >
        {t("close")} <Arrow02 />
        <Arrow02 />
      </button>
    </div>
  );
};
