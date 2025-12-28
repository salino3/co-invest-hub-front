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
  return <div className="rootPortfolio">Portfolio</div>;
};
