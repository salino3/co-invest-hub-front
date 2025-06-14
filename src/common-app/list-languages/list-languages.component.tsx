import { useTranslation } from "react-i18next";
import "./list-languages.stylses.scss";
import React from "react";

interface PropsLanguages {
  lng: string;
  img: string;
}

interface Props {
  setOpenSelectDropDown?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ListLanguages: React.FC<Props> = (props) => {
  const { setOpenSelectDropDown } = props;
  const { t, i18n } = useTranslation("main");

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
    setOpenSelectDropDown?.(false);
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
    <div className="rootListLanguages">
      {languages.map((l: PropsLanguages) => (
        <div
          key={l.lng}
          className="boxL"
          onClick={() => changeLanguage(l.lng.toLowerCase())}
        >
          <span>{t(l.lng)}</span>
          <img src={l.img} alt={t(l.lng)} />
        </div>
      ))}
    </div>
  );
};
