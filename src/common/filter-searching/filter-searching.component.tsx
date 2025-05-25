import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BasicInput } from "../basic-input";
import { Button } from "../button";
import "./filter-searching.styles.scss";

export const FilterSearching: React.FC = () => {
  const { t } = useTranslation("main");

  const [searchFilter, setSearchFilter] = useState<string>("");
  const [searchErrorFilter, setSearchErrorFilter] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
    setSearchErrorFilter("");
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!searchFilter) {
      setSearchErrorFilter("required_field");
    }
  }

  return (
    <form
      id="formFilterSearching"
      onSubmit={handleSubmit}
      className="rootFilterSearching"
    >
      <BasicInput
        name="searching"
        lbl="searching"
        value={searchFilter}
        type="text"
        change={handleChange}
        errMsg={searchErrorFilter}
        checkError={!!searchErrorFilter}
      />
      <div className="boxButton_21">
        <Button text={t("search")} type="submit" />
      </div>
    </form>
  );
};
