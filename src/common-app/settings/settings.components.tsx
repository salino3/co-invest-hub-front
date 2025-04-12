import { Dispatch, SetStateAction } from "react";
import "./settings.styles.scss";

export const Settings: React.FC<{
  showSettings: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}> = ({ showSettings, setShowSettings }) => {
  console.log("showSettings", showSettings);
  return (
    <div className={`rootSettings ${showSettings ? "show" : "hide"}`}>
      SETTINGS
      <button onClick={() => {}}>Close</button>
    </div>
  );
};
