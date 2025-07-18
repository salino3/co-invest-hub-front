import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";
import { useProvider } from "../../store";
import { ServicesApp } from "../../services";
import { BasicInput } from "../basic-input";
import { Button } from "../button";
import { routesApp } from "../../router";
import "./filter-searching.styles.scss";

export const FilterSearching: React.FC = () => {
  const { t } = useTranslation("main");
  const { t: tw } = useTranslation("wcag");

  const navigate = useNavigate();

  const setCompanies = useProvider(useShallow((state) => state.setCompanies));
  const searchData = JSON.parse(localStorage.getItem("searchData") || "{}");

  const [searchFilter, setSearchFilter] = useState<string>(
    searchData?.searching || ""
  );
  const [searchErrorFilter, setSearchErrorFilter] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
    setSearchErrorFilter("");
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!searchFilter.trim()) {
      setSearchErrorFilter("required_field");
    } else {
      const body = {
        searching: searchFilter.trim() || searchData?.searching,
        offset: 0,
      };
      ServicesApp?.getSearchingCompanies(body).then((res) => {
        setCompanies && setCompanies(res?.data);
        localStorage.setItem("searchData", JSON.stringify(body));
        navigate(routesApp?.dashboard);
      });
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
        lbl={t("search_02")}
        value={searchFilter || ""}
        type="text"
        change={handleChange}
        errMsg={searchErrorFilter}
        checkError={!!searchErrorFilter}
        ariaRq
        ariaLabeInput={tw("aria.searchingInput")}
      />
      <div className="boxButton_21">
        <Button
          customStyles="buttonStyle_01"
          text={t("search")}
          type="submit"
        />
      </div>
    </form>
  );
};
