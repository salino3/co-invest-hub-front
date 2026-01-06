import { TFunction } from "i18next";
import "./form-multimedia.styles.scss";

interface Props {
  t: TFunction<"main", undefined>;
}

export const FormMultimedia: React.FC<Props> = ({ t }) => {
  return (
    <form aria-label={t("form_multimedia")} id="formMultimediaPortfolio"></form>
  );
};
