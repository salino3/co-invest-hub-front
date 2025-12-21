import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
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
  newImage: string;
  setNewImage: Dispatch<SetStateAction<string>>;
  // setCompanyData: React.Dispatch<React.SetStateAction<PropsCompany>>;
}

export const ZoomImg: React.FC<Props> = (props) => {
  const {
    img,
    alt,
    download,
    show,
    updatePhoto,
    setShow,
    newImage,
    setNewImage,
  } = props;

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

  const firstActionRef = useRef<HTMLButtonElement | null>(null);
  const lastActionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!show) return;
    const raf = requestAnimationFrame(() => firstActionRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [show]);

  const handleKeyDownTrap = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const container = e.currentTarget;
    const focusable = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      (first as HTMLElement).focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      (last as HTMLElement).focus();
    }
  };

  return (
    <div className="containerZoomImg" role="dialog" aria-modal={true}>
      <div onClick={() => setShow(!show)} className="contentZoomImg">
        <section
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDownTrap}
        >
          <button
            className="btnStylesApp buttonPopup_01"
            onClick={rotateImage}
            aria-label={t("rotate")}
            ref={firstActionRef}
          >
            {t("rotate")}
          </button>
          <button
            className="btnStylesApp buttonPopup_01"
            onClick={() => setShow(!show)}
            aria-label={t("close")}
          >
            {t("close")}
          </button>
          {download && (
            <button
              className="btnStylesApp br_1"
              onClick={() => downLoadImage(img || "")}
              aria-label={t("download")}
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
                setNewImage(url);
              }}
              onClear={() => setNewImage(img)}
            />
          )}
          <div ref={lastActionRef} tabIndex={-1} />
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
          <img src={newImage || img || "/assets/icons/group_3.svg"} alt={alt} />
        </div>
      </div>
    </div>
  );
};
