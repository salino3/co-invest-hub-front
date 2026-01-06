import { Dispatch, SetStateAction, useState } from "react";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { PropsCompany } from "../../../../../../store";
import { Button, DropDownInput } from "../../../../../../common";
import "./form-multimedia.styles.scss";

interface Props {
  t: TFunction<"main", undefined>;
  setFormData: React.Dispatch<React.SetStateAction<PropsCompany>>;
  formData: PropsCompany;
  roleAccount: string;
  setShowModalForm: Dispatch<SetStateAction<boolean>>;
}

enum TypeMultimedia {
  Video = "video",
  Image = "image",
}

interface MultimediaProps {
  type: TypeMultimedia | "";
  url: string;
  description: string;
}

export const FormMultimedia: React.FC<Props> = ({
  t,
  formData,
  setFormData,
  roleAccount,
  setShowModalForm,
}) => {
  const { t: tw } = useTranslation("wcag");

  const [formDataMultimedia, setFormDataMultimedia] = useState<MultimediaProps>(
    {
      type: "",
      url: "",
      description: "",
    }
  );

  //
  function handleSubmitByButton() {
    // TODO:
    // vallidation errors
    // add object to multimedia in setFormData
    // close modal
    setShowModalForm(false);
  }

  function clearAllFormSetters() {
    setFormDataMultimedia({
      type: "",
      url: "",
      description: "",
    });
  }

  return (
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          handleSubmitByButton();
        }
      }}
      aria-label={t("form_multimedia")}
      id="formMultimediaPortfolio"
    >
      {/* TODO: modify component dropdown input */}
      <DropDownInput
        value={formDataMultimedia.type}
        name="type"
        type="text"
        lbl={t("type")}
      />
      <div className="boxButtonsForm">
        <Button
          customStyles="buttonStyle_02"
          al={tw("aria.resetForm")}
          click={clearAllFormSetters}
          type="reset"
          text={t("reset")}
        />
        <Button
          click={() => handleSubmitByButton()}
          customStyles="buttonStyle_01"
          al={tw("aria.confirmForm")}
          type="button"
          text={t("confirm")}
        />
      </div>
    </form>
  );
};
