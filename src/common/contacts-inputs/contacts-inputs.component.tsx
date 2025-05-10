import "./contacts-inputs.styles.scss";

type Contact = {
  type: string;
  value: string;
};

type ContactInputsProps = {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
};

export const ContactsInputs: React.FC<ContactInputsProps> = ({
  contacts,
  setContacts,
}) => {
  const handleChange = (index: number, field: keyof Contact, value: string) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  };

  const addContact = () => {
    setContacts([...contacts, { type: "", value: "" }]);
  };

  const removeContact = (index: number) => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
  };
  console.log("Contacts", contacts);
  return (
    <div className="rootContactsInputs">
      <h3>Contacts</h3>
      {contacts.map((contact, index) => (
        <div key={index} className="boxInputsContactsInputs">
          <input
            type="text"
            placeholder="Type (e.g. email)"
            value={contact.type}
            onChange={(e) => handleChange(index, "type", e.target.value)}
          />

          <input
            type="text"
            placeholder="Value (e.g. contact@site.com)"
            value={contact.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
          />

          <button type="button" onClick={() => removeContact(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addContact}>
        Add Contact
      </button>
    </div>
  );
};
