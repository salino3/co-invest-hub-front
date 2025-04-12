import { Dispatch, MouseEvent, SetStateAction } from "react";
import "./settings.styles.scss";

export const Settings: React.FC<{
  showSettings: boolean | null;
  setShowSettings: Dispatch<SetStateAction<boolean | null>>;
}> = ({ showSettings, setShowSettings }) => {
  if (showSettings === null) {
    return null;
  } else if (!showSettings)
    setTimeout(() => {
      return null;
    }, 1000);

  return (
    <div className={`rootSettings ${showSettings ? "show" : "hide"}`}>
      SETTINGS
      <button
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          event?.stopPropagation();
          setShowSettings(false);
        }}
      >
        Close
      </button>
    </div>
  );
};
