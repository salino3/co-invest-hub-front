import React from "react";
import "./container-layout.style.scss";

interface Props {
  children: React.ReactNode;
}

export const ContainerLayout: React.FC<Props> = ({ children }) => {
  return <div className="rootContainerLayout">{children}</div>;
};
