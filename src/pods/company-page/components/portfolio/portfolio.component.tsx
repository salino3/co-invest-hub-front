import { TFunction } from "i18next";
import { PropsCompany, PropsCompanyReadOnly } from "../../../../store";
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
              return (
                <div key={index} className="cardContentPortfolio">
                  {item.description}
                  {isYouTube ? (
                    <iframe
                      width="100%"
                      height="315"
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
