import React from "react";
import ReactSwitch from "react-switch";
import "./switcher.styles.scss";

interface Props {
  first: any;
  currentValue: any;
  toggle: (() => void) | undefined;
  t: (i: string) => string;
  text1: string;
  text2: string;
}

export const Switcher: React.FC<Props> = (props) => {
  const { first, currentValue, toggle, t, text1, text2 } = props;

  return (
    <section className="switch">
      <label htmlFor="switcher">
        {currentValue !== first ? t(text1) : t(text2)}
      </label>
      <ReactSwitch
        name="switcher"
        onChange={() => toggle?.()}
        checked={currentValue !== first}
      />
    </section>
  );
};
