import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { PropsCompany, PropsCompanyReadOnly } from "../../../../store";
import { CrossIcon } from "../../../../common";
import { ModalWeb } from "../../../../common-app";
import { FormMultimedia } from "./components";
import "./portfolio.styles.scss";
import { useState } from "react";

interface Props {
  t: TFunction<"main", undefined>;
  setFormData: React.Dispatch<React.SetStateAction<PropsCompany>>;
  formData: PropsCompany;
  roleAccount: string;
  setRoleAccount: React.Dispatch<React.SetStateAction<string>>;
  rolesCompany: any;
  inputsReadOnly: PropsCompanyReadOnly;
  handleChange: (
    key: keyof PropsCompany
  ) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  console.log("formData", formData);

  return (
    <div className="rootPortfolio">
      <div className="containerContentPortfolio">
        {formData && formData.multimedia && formData.multimedia.length > 0 ? (
          formData.multimedia.map(
            (item: Record<string, string>, index: number) => {
              const isYouTube =
                item.url.includes("youtube.com") ||
                item.url.includes("youtu.be");

              const isBase64Video =
                item.url.startsWith("data:video/") ||
                (item.url.length > 100 && !item.url.startsWith("http"));

              if (index === 0)
                return (
                  <div
                    tabIndex={0}
                    key={index}
                    aria-label={tw("add_multimedia")}
                    className="boxEmptyContentPortfolio"
                    onClick={() => setShowModalForm(true)}
                  >
                    <div className="cardEmptyContentPortfolio">
                      <CrossIcon
                        customStyles={"rotateCross"}
                        height={50}
                        width={50}
                        strokeWidth={"4"}
                      />
                    </div>
                  </div>
                );

              return (
                <div key={index} className="cardContentPortfolio">
                  <span> {item.description}</span>
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
                        "aria.video"
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
                      src={
                        isBase64Video
                          ? `data:video/mp4;base64,${item.url}`
                          : item.url
                      }
                      controls
                      aria-label={`${tw("item")} (${tw(
                        "aria.video"
                      )}) ${index}, ${item.description}`}
                      width="100%"
                    />
                  )}
                </div>
              );
            }
          )
        ) : (
          <div
            tabIndex={0}
            key={0}
            aria-label={tw("add_multimedia")}
            className="boxEmptyContentPortfolio"
            onClick={() => setShowModalForm(true)}
          >
            <div className="cardEmptyContentPortfolio">
              <CrossIcon
                customStyles={"rotateCross"}
                height={50}
                width={50}
                strokeWidth={"4"}
              />
            </div>
          </div>
        )}
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
