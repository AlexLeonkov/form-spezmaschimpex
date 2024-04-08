import React, { useState, FormEvent } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateContactData({ name, phone, email, question, plz }); // Add 'email' to this object if necessary.
  };

  const handlePrivacyCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyPolicyChecked(e.target.checked);
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
          placeholder="Für eventuelle Rückfragen"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      {/* Uncomment below if you have an email field */}
      <div className="form-group">
        <label htmlFor="emailInput">E-Mail</label>
        <input
          required
          type="(keine Werbung)"
          className="form-control"
          id="emailInput"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="questionInput">Ihre Frage</label>
        <input
          type="text"
          className="form-control"
          id="questionInput"
          placeholder="Ihre Frage hier (Optional)"
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
      {/* <button
        onClick={() => {
          setIsLoading(true);
          updateContactData({ name, phone, email, question, plz });
        }}
        className="btn-main btn-color"
      >
        Angebot anfordern
      </button> */}

<div className="´privacy">
  <input
    type="checkbox"
    id="privacyPolicy"
    checked={privacyPolicyChecked}
    onChange={handlePrivacyCheck}
  />
 <label htmlFor="privacyPolicy" className="privacy-policy-label">
  Ich willige ein, dass meine Angaben zur Kontaktaufnahme, Angebotserstellung und Zuordnung für Rückfragen gespeichert werden. Hier finden Sie Hinweise zum 
  <a href="policy.html"> Datenschutz</a>.
</label>

</div>

      <Button
        variant="contained"
        // color="primary"
        className="btn-main btn-color submitBtn"
        onClick={() => {
          setIsLoading(true);
          updateContactData({ name, phone, email, question, plz });
        }}
        disabled={isLoading || !privacyPolicyChecked}
        endIcon={isLoading ? <CircularProgress size={20} /> : null}
      >
        {isLoading ? "lädt..." : "Angebot anfordern"}
      </Button>

      {/* 
      <Button
        onClick={() => {
          setIsLoading(true);
          updateContactData({ name, phone, email, question, plz });
        }}
        className="btn-main btn-color"
        loading={isLoading}
      >
        {isLoading ? "Lädt..." : "Angebot anfordern"}
      </Button> */}
    </>
  );
};

export default ContactForm;
