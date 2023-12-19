import React, { useState, FormEvent } from "react";

type UserData = {
  name: string;
  phone: string;
  email: string;
  question: string;
  plz: string;
};

type ContactFormProps = {
  updateContactData: (newData: UserData) => void;
  userData: UserData;
};

const ContactForm: React.FC<ContactFormProps> = ({
  updateContactData,
  userData,
}) => {
  const [name, setName] = useState(userData.name);
  const [phone, setPhone] = useState(userData.phone);
  const [email, setEmail] = useState(userData.email); // Add this if you have an email field.
  const [question, setQuestion] = useState(userData.question);
  const [plz, setPlz] = useState(userData.plz);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateContactData({ name, phone, email, question, plz }); // Add 'email' to this object if necessary.
  };

  return (
    <>
      <h3>Kontaktieren Sie uns</h3>
      <div className="form-group">
        <label htmlFor="nameInput">Name</label>
        <input
          type="text"
          className="form-control"
          id="nameInput"
          placeholder="Max Musterman"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneInput">Rufnummer</label>
        <input
          type="text"
          className="form-control"
          id="phoneInput"
          placeholder="+49 1764221745"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      {/* Uncomment below if you have an email field */}
      {/* <div className="form-group">
        <label htmlFor="emailInput">E-Mail</label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div> */}
      <div className="form-group">
        <label htmlFor="questionInput">Ihre Frage</label>
        <input
          type="text"
          className="form-control"
          id="questionInput"
          placeholder="Ihre Frage hier"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="plzInput">Ihre PLZ</label>
        <input
          type="text"
          className="form-control"
          id="plzInput"
          placeholder="PLZ"
          value={plz}
          onChange={(e) => setPlz(e.target.value)}
        />
      </div>
      <button
        onClick={() => updateContactData({ name, phone, email, question, plz })}
        className="btn-main btn-color"
      >
        Angebot anfordern
      </button>
    </>
  );
};

export default ContactForm;
