import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProviderSelector } from "../../store";
import { Switcher } from "../../common/switcher";
import { Arrow02, CrossIcon } from "../../common/icons";
import { ContainerDropDown } from "../container-drop-down";
import { ModalWeb } from "../modal-web";
import { Button } from "../../common/button";
import { ConfirmingDelete } from "../confirming-delete";
import { ListLanguages } from "../list-languages";
import "./settings.styles.scss";

interface Props {
  showSettings: boolean | null;
  setShowSettings: Dispatch<SetStateAction<boolean | null>>;
  id?: string | undefined;
}

export const Settings: React.FC<Props> = ({
  showSettings,
  setShowSettings,
  id,
}) => {
  const { t } = useTranslation("main");
  const { t: tw } = useTranslation("wcag");

  const { theme, changeGlobalColors } = useProviderSelector(
    "theme",
    "changeGlobalColors"
  );

  const [showModalDeleteAccount, setShowModalDeleteAccount] =
    useState<boolean>(false);

  if (showSettings === null) {
    return null;
  } else if (!showSettings)
    setTimeout(() => {
      return null;
    }, 1000);

  return (
    <div id={id} className={`rootSettings ${showSettings ? "show" : "hide"}`}>
      <div className="containerSettings_l23">
        <Button
          al={tw("aria.close_settings_header")}
          customStyles="buttonStyle_04 btnCloseSettings"
          click={(event: MouseEvent<HTMLButtonElement>) => {
            event?.stopPropagation();
            setShowSettings(false);

            const openerButton = document.getElementById(
              "spanSettingComponent"
            );
            openerButton?.focus();
          }}
        >
          {t("close")} &nbsp; <Arrow02 />
          <Arrow02 />
        </Button>
        <Switcher
          t={t}
          currentValue={theme}
          first={"dark"}
          toggle={changeGlobalColors}
          text1="light"
          text2="dark"
        />
        <ContainerDropDown height={84} title={t("languages")}>
          <ListLanguages />
        </ContainerDropDown>
        <Button
          al={tw("aria.delete_account")}
          customStyles="buttonStyle_02 changePositionBtn"
          click={() => setShowModalDeleteAccount(true)}
        >
          {t("delete_account")} &nbsp; <CrossIcon />
        </Button>
      </div>

      {showModalDeleteAccount && (
        <ModalWeb
          customStyles="modalConfirmDeleteCompany"
          msg={t("confirmDeleteCompany")}
          show={showModalDeleteAccount}
          setShow={setShowModalDeleteAccount}
          customMaxHeight={"40vh"}
        >
          <ConfirmingDelete
            data={showModalDeleteAccount}
            setData={setShowModalDeleteAccount}
            endpoint="deleteCompany"
            body={{ id: showDeleteModal, idCompany: params?.id }}
            text1={`${t("text1DeleteCompany")} "<strong>${
              params?.name
            }</strong>"?`}
            textBtn={t("confirm")}
            ariaLabel={t("confirmDeleteCompany")}
          />
        </ModalWeb>
      )}
    </div>
  );
};
