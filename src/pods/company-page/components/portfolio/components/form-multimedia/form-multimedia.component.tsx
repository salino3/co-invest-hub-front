import { useState } from "react";
import { TFunction } from "i18next";
import { BasicInput } from "../../../../../../common";
import "./form-multimedia.styles.scss";

interface Props {
  t: TFunction<"main", undefined>;
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

export const FormMultimedia: React.FC<Props> = ({ t }) => {
  const [formDataMultimedia, setFormDataMultimedia] = useState<MultimediaProps>(
    {
      type: "",
      url: "",
      description: "",
    }
  );
  return (
    <form aria-label={t("form_multimedia")} id="formMultimediaPortfolio">
      <BasicInput
        value={formDataMultimedia.type}
        name="type"
        type="text"
        lbl={t("type")}
      />
    </form>
  );
};
