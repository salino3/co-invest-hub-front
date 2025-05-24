import { TFunction } from "i18next";
import {
  Contacts,
  PropsCompany,
  PropsCompanyError,
  PropsCompanyReadOnly,
} from "../../store";
import { BasicInput } from "../basic-input";
import "./contacts-inputs.styles.scss";

type ContactInputsProps = {
  t: TFunction<"main", undefined>;
  contacts: PropsCompany["contacts"];
  setContacts: React.Dispatch<React.SetStateAction<PropsCompany>>;
  formDataError: PropsCompanyError;
  inputsReadOnly: PropsCompanyReadOnly;
  roleAccount: string;
  handleChangeReadOnly: (input: keyof PropsCompanyReadOnly) => void;
};

export const ContactsInputs: React.FC<ContactInputsProps> = ({
  t,
  contacts,
  setContacts,
  formDataError,
  inputsReadOnly,
  roleAccount,
  handleChangeReadOnly,
}) => {
  const handleChange = (
    index: number,
    field: keyof Contacts,
    value: string
  ) => {
    const updated = [...contacts];
    updated[index][field] = value;

    setContacts((prev: any) => ({
      ...prev,
      contacts: updated,
    }));
  };

  const addContact = () => {
    setContacts((prev: any) => ({
      ...prev,
      contacts: [...(prev.contacts || []), { type: "", value: "" }],
    }));
  };

  const removeContact = (index: number) => {
    setContacts((prev: any) => ({
      ...prev,
      contacts: (prev.contacts || []).filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  console.log("Contacts", contacts);
  return (
    <div className="rootContactsInputs">
      <h3>Contacts</h3>
      {contacts &&
        contacts?.length > 0 &&
        contacts.map((contact, index) => (
          <div key={index} className="boxInputsContactsInputs">
            <BasicInput
              lbl={t("Type (e.g. email)")}
              name="type"
              type="text"
              value={contact.type}
              change={(e) => handleChange(index, "type", e.target.value)}
            />
            <BasicInput
              lbl={t("Value (e.g. contact@site.com)")}
              name="value"
              type="text"
              change={(e) => handleChange(index, "value", e.target.value)}
              value={contact.value}
            />

            {contacts?.length > 1 && (
              <button type="button" onClick={() => removeContact(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
      <button type="button" onClick={addContact}>
        Add Contact
      </button>
    </div>
  );
};
