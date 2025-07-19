import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./account-page.styles.scss";

export const AccountPage: React.FC = () => {
  const { t } = useTranslation("main");
  const { t: tw } = useTranslation("wcag");

  const params = useParams();

  return <div className="rootAccountPage">hola</div>;
};
