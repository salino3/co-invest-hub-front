import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./home.styles.scss";

export const HomePage: React.FC = () => {
  const { t } = useTranslation("main");

  useEffect(() => {}, []);

  return (
    <div className="rootHomePage">
      <h1>{t("welcome")}</h1>
    </div>
  );
};
