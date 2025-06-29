import React from "react";
import { useTranslation } from "react-i18next";
import "./list-languages.stylses.scss";

interface PropsLanguages {
  lng: string;
  img: string;
}

interface Props {
  setOpenSelectDropDown?: React.Dispatch<React.SetStateAction<boolean>>;
  setPxHeight?: React.Dispatch<React.SetStateAction<number>>;
}

export const ListLanguages: React.FC<Props> = (props) => {
  const { setOpenSelectDropDown, setPxHeight } = props;
  const { t, i18n } = useTranslation("main");
  const { t: tw } = useTranslation("wcag");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
    setOpenSelectDropDown?.(false);
    setPxHeight?.(0);
    const openerButton = document.getElementById("rootListLanguages");
    openerButton?.focus();
  };

  const languages: PropsLanguages[] = [
    {
      lng: "EN",
      img: "https://flagcdn.com/w320/gb.png",
    },
    {
      lng: "ES",
      img: "https://flagcdn.com/w320/es.png",
    },
  ];

  return (
    <div id="rootListLanguages" role="listbox" className="rootListLanguages">
      {languages.map((l: PropsLanguages) => (
        <div
          role="button"
          tabIndex={0}
          aria-label={tw("aria." + l.lng + "_l")}
          key={l.lng}
          className="boxL"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              changeLanguage(l.lng.toLowerCase());
            }
          }}
          onClick={() => changeLanguage(l.lng.toLowerCase())}
        >
          <span>{t(l.lng)}</span>
          <img src={l.img} alt={tw("aria." + l.lng + "_img_l")} />
        </div>
      ))}
    </div>
  );
};
