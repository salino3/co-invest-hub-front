import React from "react";
import ReactSwitch from "react-switch";
import "./switcher.styles.scss";

interface Props {
  first: any;
  second: any;
  currentvalue: any;
  toggle: () => void;
  t: (i: string) => string;
}

export const Switcher: React.FC<Props> = (props) => {
  const { first, second, currentvalue, toggle, t } = props;

  return (
    <section className="switch">
      <label htmlFor="switcher">
        {currentvalue === second
          ? t(second === "#1b1b1b" ? "light" : second)
          : t(first === "#f5f5f5" ? "dark" : first)}
      </label>
      <ReactSwitch
        name="switcher"
        onChange={toggle}
        checked={currentvalue === second}
      />
    </section>
  );
};
