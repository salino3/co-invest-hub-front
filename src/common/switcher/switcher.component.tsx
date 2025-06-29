import React from "react";
import ReactSwitch from "react-switch";
import { useTranslation } from "react-i18next";
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

  const { t: tw } = useTranslation("wcag");
  return (
    <section className="switch">
      <label htmlFor="switcher">
        {currentValue !== first ? t(text1) : t(text2)}
      </label>
      <ReactSwitch
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggle?.();
          }
        }}
        aria-label={tw("aria.switcher_item")}
        name="switcher"
        onChange={() => toggle?.()}
        checked={currentValue !== first}
      />
    </section>
  );
};
