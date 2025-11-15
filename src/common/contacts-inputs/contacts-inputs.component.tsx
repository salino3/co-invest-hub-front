import { TFunction } from "i18next";
import {
  Contacts,
  PropsCompany,
  PropsCompanyError,
  PropsCompanyReadOnly,
} from "../../store";
import { BasicInput } from "../basic-input";
import { Button } from "../button";
import "./contacts-inputs.styles.scss";

type ContactInputsProps = {
  t: TFunction<"main", undefined>;
  contacts: PropsCompany["contacts"];
  setContacts: React.Dispatch<React.SetStateAction<PropsCompany>>;
  formDataError: PropsCompanyError;
  inputsReadOnly: PropsCompanyReadOnly;
  roleAccount: string;
  handleChangeReadOnly: (input: keyof PropsCompanyReadOnly) => void;
  id: string | undefined;
  isNewCompany: boolean;
};

export const ContactsInputs: React.FC<ContactInputsProps> = ({
  t,
  contacts,
  setContacts,
  formDataError,
  inputsReadOnly,
  roleAccount,
  handleChangeReadOnly,
  id,
  isNewCompany,
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
              lbl={t("type_contact") + `${index === 0 ? " *" : ""}`}
              name="type"
              type="text"
              value={contact.type}
              change={(e) => handleChange(index, "type", e.target.value)}
              ariaRq
              ariaLabeInput={t("type_contact")}
              readonly={
                !isNewCompany && !!roleAccount && !inputsReadOnly?.type_contact
              }
              update={
                id && roleAccount
                  ? () => handleChangeReadOnly("type_contact")
                  : null
              }
            />
            <BasicInput
              lbl={t("value_contact") + `${index === 0 ? " *" : ""}`}
              name="value"
              type="text"
              change={(e) => handleChange(index, "value", e.target.value)}
              value={contact.value}
              ariaLabeInput={t("value_contact")}
            />

            {contacts?.length > 1 && (
              <Button
                customStyles="buttonStyle_04"
                type="button"
                click={() => removeContact(index)}
                text={t("remove")}
              />
            )}
          </div>
        ))}
      {!!roleAccount && (
        <Button
          customStyles="buttonStyle_03"
          type="button"
          click={addContact}
          text={t("add_contact")}
        />
      )}
    </div>
  );
};
