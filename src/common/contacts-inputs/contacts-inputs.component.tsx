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
  handleChangeReadOnly: (
    input: keyof PropsCompanyReadOnly,
    index?: number
  ) => void;
  id: string | undefined;
  isNewCompany: boolean;
  setInputsReadOnly: React.Dispatch<React.SetStateAction<PropsCompanyReadOnly>>;
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
  setInputsReadOnly,
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

  console.log("Contact:", contacts, inputsReadOnly);

  const addContact = () => {
    // 1. Logic with setContacts:

    setContacts((prev: PropsCompany) => {
      // KEY VALIDATION: Ensure prev.contacts is an array before spreading it.
      // This prevents the 'not iterable' error if contacts is an object or null/undefined
      const currentContacts = Array.isArray(prev.contacts) ? prev.contacts : [];

      return {
        ...prev,
        // Spread the validated array and add the new contact object.
        contacts: [...currentContacts, { type: "", value: "" }],
      };
    });

    // Logic to synchronize inputsReadOnly (must be passed from the parent)
    // Adds a 'false' state for the new contact's type and value inputs.
    setInputsReadOnly((prev) => ({
      ...prev,
      type_contact: [...prev.type_contact, false],
      value_contact: [...prev.value_contact, false],
    }));
  };

  const removeContact = (index: number) => {
    setContacts((prev: any) => ({
      ...prev,
      contacts: (prev.contacts || []).filter(
        (_: any, i: number) => i !== index
      ),
    }));

    // Logic to synchronize inputsReadOnly: remove the boolean state for the deleted contact.
    setInputsReadOnly((prev) => ({
      ...prev,
      type_contact: prev.type_contact.filter(
        (_: boolean, i: number) => i !== index
      ),
      value_contact: prev.value_contact.filter(
        (_: boolean, i: number) => i !== index
      ),
    }));
  };

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
                (!isNewCompany && !!id && !roleAccount) ||
                (!isNewCompany &&
                  !!roleAccount &&
                  !inputsReadOnly?.type_contact[index])
              }
              update={
                id && roleAccount
                  ? () => handleChangeReadOnly("type_contact", index)
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
              readonly={
                (!isNewCompany && !!id && !roleAccount) ||
                (!isNewCompany &&
                  !!roleAccount &&
                  !inputsReadOnly?.value_contact[index])
              }
              update={
                id && roleAccount
                  ? () => handleChangeReadOnly("value_contact", index)
                  : null
              }
            />

            {contacts?.length > 1 && (!!roleAccount || isNewCompany) && (
              <Button
                customStyles="buttonStyle_04"
                type="button"
                click={() => removeContact(index)}
                text={t("remove")}
              />
            )}
          </div>
        ))}
      {(!!roleAccount || isNewCompany) && (
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
