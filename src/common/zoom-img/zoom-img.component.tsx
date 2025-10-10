import { Dispatch, SetStateAction, useState } from "react";
import { PropsCompany } from "../../store";
import { useTranslation } from "react-i18next";
import { useAppFunctions } from "../../hooks";
import { ImageUpload } from "../image-upload";
import "./zoom-img.styles.scss";

interface Props {
  img: string;
  alt?: string;
  download?: boolean;
  show: boolean;
  updatePhoto: boolean;
  setShow: Dispatch<SetStateAction<boolean | any>>;
  setCompanyData: React.Dispatch<React.SetStateAction<PropsCompany>>;
}

export const ZoomImg: React.FC<Props> = (props) => {
  const { img, alt, download, show, updatePhoto, setShow, setCompanyData } =
    props;

  if (!show) {
    return;
  }

  const { t } = useTranslation("main");
  const container: HTMLElement | null = document.getElementById("containerImg");

  const [angle, setAngle] = useState<number>(0);

  const rotateImage = () => {
    setAngle((prevAngle) => prevAngle + 90);
  };

  const { downLoadImage } = useAppFunctions();

  return (
    <div className="containerZoomImg">
      <div onClick={() => setShow(!show)} className="contentZoomImg">
        <section onClick={(e) => e.stopPropagation()}>
          <button className="btnStylesApp buttonPopup_01" onClick={rotateImage}>
            {t("rotate")}
          </button>
          <button
            className="btnStylesApp buttonPopup_01"
            onClick={() => setShow(!show)}
          >
            {t("close")}
          </button>
          {download && (
            <button
              className="btnStylesApp br_1"
              onClick={() => downLoadImage(img || "")}
            >
              {t("download")}
            </button>
          )}
          {updatePhoto && (
            <ImageUpload
              text={t("updatePhoto")}
              accept="image/png,image/jpeg"
              onFileSelected={(file) => {
                const url = URL.createObjectURL(file);
                setCompanyData((prev: PropsCompany) => ({
                  ...prev,
                  logo: url,
                }));
              }}
              onClear={() =>
                setCompanyData((prev: PropsCompany) => ({ ...prev, logo: "" }))
              }
            />
          )}
        </section>
        <div
          id="containerImg"
          style={{
            transform: `rotate(${angle}deg)`,
            height: angle % 180 === 0 ? "auto" : `${container?.clientWidth}px`,
          }}
          onClick={(e) => e.stopPropagation()}
          className="boxZoomImg"
        >
          <img src={img} alt={alt} />
        </div>
      </div>
    </div>
  );
};
