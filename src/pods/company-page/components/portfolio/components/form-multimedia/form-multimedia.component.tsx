import { Dispatch, SetStateAction, useState } from "react";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
  MultimediaProps,
  PropsCompany,
  TypeMultimedia,
} from "../../../../../../store";
import { useAppFunctions } from "../../../../../../hooks";
import {
  BasicInput,
  Button,
  DropDownInput,
  ImageUpload,
} from "../../../../../../common";
import "./form-multimedia.styles.scss";

interface Props {
  t: TFunction<"main", undefined>;
  setFormData: React.Dispatch<React.SetStateAction<PropsCompany>>;
  formData: PropsCompany;
  roleAccount: string;
  setShowModalForm: Dispatch<SetStateAction<boolean>>;
}

export const FormMultimedia: React.FC<Props> = ({
  t,
  formData,
  setFormData,
  roleAccount,
  setShowModalForm,
}) => {
  const { t: tw } = useTranslation("wcag");

  const { convertBlobToBase64 } = useAppFunctions();

  const [formDataMultimedia, setFormDataMultimedia] = useState<MultimediaProps>(
    {
      type: "",
      url: "",
      description: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormDataMultimedia((prev: MultimediaProps) => ({
      ...prev,
      type: e.target.value as TypeMultimedia,
    }));
  };

  //
  function handleSubmitByButton() {
    // TODO:
    // vallidation errors
    // validation video maximum 8MB

    setFormData((prev: PropsCompany) => ({
      ...prev,
      multimedia: [...(prev.multimedia || []), formDataMultimedia],
    }));
    setShowModalForm(false);
  }

  function clearAllFormSetters() {
    setFormDataMultimedia({
      type: "",
      url: "",
      description: "",
    });
  }

  console.log("formDataMultimedia", formDataMultimedia);

  return (
    <div
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
      <BasicInput
        type="textarea"
        name={"description"}
        value={formDataMultimedia.description}
        lbl={t("description")}
        change={(e) =>
          setFormDataMultimedia((prev: MultimediaProps) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        ariaRq
      />
      <DropDownInput
        value={formDataMultimedia.type}
        name="type"
        type="dropdownOneValue"
        lbl={t("type")}
        change={handleChange}
        ariaRq
      />
      {formDataMultimedia.type === TypeMultimedia.Video ? (
        "Video"
      ) : formDataMultimedia.type === TypeMultimedia.Image ? (
        <ImageUpload
          text={t("updatePhoto")}
          accept="image/png,image/jpeg"
          onFileSelected={async (file) => {
            const url = URL.createObjectURL(file);
            const base64Img = await convertBlobToBase64(url);
            setFormDataMultimedia((prev: MultimediaProps) => ({
              ...prev,
              url: base64Img,
            }));
          }}
          onClear={() =>
            setFormDataMultimedia((prev: MultimediaProps) => ({
              ...prev,
              url: "",
            }))
          }
        />
      ) : null}
      <div className="boxButtonsForm_FM">
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
    </div>
  );
};
