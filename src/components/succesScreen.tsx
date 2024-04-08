import React from "react";
import "./SuccessScreen.css"; // Make sure to create a corresponding CSS file

const SuccessScreen: React.FC = () => {
  return (
    <div className="success-screen animate-fade-in">
      <h2>Daten Erfolgreich Gesendet!</h2>
      <p>
        Ihre Informationen wurden erfolgreich übermittelt. Wir werden uns in
        Kürze bei Ihnen melden!
      </p>
      <p>
        Oder Sie können uns direkt anrufen oder schreiben:<br />
        Tel: +49 15906391221<br />
        Mail: yevhen.smoliuk@spezmaschimpex.de
      </p>
    </div>
  );
};

export default SuccessScreen;
