import { useState } from "react";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import {
  MultimediaProps,
  PropsCompany,
  PropsCompanyReadOnly,
  useProviderSelector,
} from "../../../../store";
import { CrossIcon } from "../../../../common";
import { ModalWeb } from "../../../../common-app";
import { FormMultimedia } from "./components";
import "./portfolio.styles.scss";

interface Props {
  t: TFunction<"main", undefined>;
  setFormData: React.Dispatch<React.SetStateAction<PropsCompany>>;
  formData: PropsCompany;
  roleAccount: string;
  setRoleAccount: React.Dispatch<React.SetStateAction<string>>;
  rolesCompany: any;
  inputsReadOnly: PropsCompanyReadOnly;
  handleChange: (
    key: keyof PropsCompany,
  ) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleChangeReadOnly: (input: keyof PropsCompanyReadOnly) => void;
  id: string | undefined;
}

export const Portfolio: React.FC<Props> = (props) => {
  const {
    t,
    setFormData,
    formData,
    roleAccount,
    setRoleAccount,
    rolesCompany,
    inputsReadOnly,
    handleChange,
    handleChangeReadOnly,
    id,
  } = props;

  const { t: tw } = useTranslation("wcag");
  const { theme } = useProviderSelector();
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  console.log("formData", formData);

  //
  function deleteMultimedia(index: number) {
    const newMultimedia: MultimediaProps[] = formData.multimedia.filter(
      (_, i) => i !== index,
    );
    setFormData((prev: PropsCompany) => ({
      ...prev,
      multimedia: newMultimedia,
    }));
  }

  //
  const getVideoSrc = (url: string, isBase64Video: boolean) => {
    if (isBase64Video) {
      // it has prefix
      if (url.startsWith("data:video/")) {
        return url;
      }
      return `data:video/mp4;base64,${url}`;
    }

    // normal URL (http...)
    return url;
  };

  return (
    <div className="rootPortfolio">
      <div className="containerContentPortfolio">
        <div
          tabIndex={0}
          aria-label={tw("add_multimedia")}
          className="boxEmptyContentPortfolio"
          onClick={() => setShowModalForm(true)}
        >
          <div
            className={`cardEmptyContentPortfolio ${
              theme === "dark" ? "darkCCP" : "lightCCP"
            }`}
          >
            <CrossIcon
              customStyles={"rotateCross"}
              height={50}
              width={50}
              strokeWidth={"4"}
            />
          </div>
        </div>

        {formData && formData.multimedia && formData.multimedia.length > 0
          ? formData.multimedia.map((item: MultimediaProps, index: number) => {
              const isYouTube =
                item.url.includes("youtube.com") ||
                item.url.includes("youtu.be");

              const isBase64Video =
                item.url.startsWith("data:video/") ||
                (item.url.length > 100 && !item.url.startsWith("http"));

              return (
                <div key={index} className="cardContentPortfolio">
                  <div className="boxSpansMultimedia">
                    <span className="spanDesc">{item.description}</span>
                    <CrossIcon
                      click={() => deleteMultimedia(index)}
                      customStyles={`crossDeleteItem ${
                        theme === "dark" ? "darkCDM" : "lightCDM"
                      }`}
                      height={20}
                      width={20}
                      strokeWidth={"2"}
                    />
                  </div>
                  {item.type === "image" ? (
                    <img
                      tabIndex={0}
                      src={item?.url}
                      aria-label={`${tw("item")} (${tw("image")}) ${index}, ${
                        item.description
                      }`}
                      alt={t("item") + " " + index}
                    />
                  ) : isYouTube ? (
                    <iframe
                      className="videoCard"
                      width="100%"
                      aria-label={`${tw("item")} (${tw(
                        "aria.video",
                      )}) ${index}, ${item.description}`}
                      src={
                        item.url
                          .replace("youtu.be/", "www.youtube.com/embed/")
                          .split("?")[0]
                      }
                      title={item.description}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      className="videoCard"
                      src={getVideoSrc(item.url, isBase64Video)}
                      controls
                      aria-label={`${tw("item")} (${tw(
                        "aria.video",
                      )}) ${index}, ${item.description}`}
                      width="100%"
                    />
                  )}
                </div>
              );
            })
          : null}
      </div>
      {showModalForm && (
        <ModalWeb
          show={showModalForm}
          setShow={setShowModalForm}
          msg={t("form_multimedia")}
          customMaxHeight={"90vh"}
        >
          <FormMultimedia
            t={t}
            setFormData={setFormData}
            formData={formData}
            roleAccount={roleAccount}
            setShowModalForm={setShowModalForm}
          />
        </ModalWeb>
      )}
    </div>
  );
};
