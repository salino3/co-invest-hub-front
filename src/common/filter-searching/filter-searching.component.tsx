import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BasicInput } from "../basic-input";
import { Button } from "../button";
import "./filter-searching.styles.scss";

export const FilterSearching: React.FC = () => {
  const { t } = useTranslation("main");

  const [searchFilter, setSearchFilter] = useState<string>("");
  const [searchErrorFilter, setSearchErrorFilter] = useState<string>("");

  return (
    <form id="formFilterSearching" className="rootFilterSearching">
      <BasicInput
        name="searching"
        value={searchFilter}
        type="text"
        change={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchFilter(e.target.value)
        }
        errMsg={searchErrorFilter}
        checkError={!!searchErrorFilter}
      />
      <Button text={t("search")} type="submit" />
    </form>
  );
};
