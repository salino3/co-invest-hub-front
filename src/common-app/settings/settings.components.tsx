import { Dispatch, MouseEvent, SetStateAction } from "react";
import "./settings.styles.scss";

export const Settings: React.FC<{
  showSettings: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}> = ({ showSettings, setShowSettings }) => {
  console.log("showSettings", showSettings);
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
