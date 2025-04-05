import React from "react";
import { Header } from "../../common-app";
import "./container-layout.style.scss";

interface Props {
  children: React.ReactNode;
}

export const ContainerLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="rootContainerLayout">
      <Header />
      {children}
    </div>
  );
};
