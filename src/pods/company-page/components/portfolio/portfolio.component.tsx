import { TFunction } from "i18next";
import { PropsCompany, PropsCompanyReadOnly } from "../../../../store";
import "./portfolio.styles.scss";
import { CrossIcon } from "../../../../common";

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

  console.log("formData", formData);

  // description

  // type

  // url

  return (
    <div className="rootPortfolio">
      <div className="containerContentPortfolio">
        {formData &&
          formData.multimedia &&
          formData.multimedia.length > 0 &&
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
                  <div key={index} className="boxEmptyContentPortfolio">
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
                  {item.description}
                  {item.type === "image" ? (
                    <img src={item?.url} alt={"Image " + index} />
                  ) : isYouTube ? (
                    <iframe
                      className="videoCard"
                      width="100%"
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
                      width="100%"
                    />
                  )}
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};
