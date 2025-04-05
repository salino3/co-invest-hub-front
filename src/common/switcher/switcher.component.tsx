import React from "react";
import ReactSwitch from "react-switch";
import "./switcher.styles.scss";

interface Props {
  first: any;
  currentValue: any;
  toggle: () => void;
  t: (i: string) => string;
}

export const Switcher: React.FC<Props> = (props) => {
  const { first, currentValue, toggle, t } = props;

  return (
    <section className="switch">
      <label htmlFor="switcher">
        {currentValue !== first ? t("light") : t("dark")}
      </label>
      <ReactSwitch
        name="switcher"
        onChange={toggle}
        checked={currentValue !== first}
      />
    </section>
  );
};
