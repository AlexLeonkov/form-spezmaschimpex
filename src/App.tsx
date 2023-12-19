import React, { useState, useEffect, FormEvent } from "react";
import "./App.css";
import PropertyTypeButtons from "./components/questionAnswerButtons";
import ContactForm from "./components/contactForm";
import { Progress } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import SuccessScreen from "./components/succesScreen";

export type ScreenDataType = {
  question: string;
  answers: string[];
};

export type UserData = {
  propertyType: string;
  solarUsage: string;
  roofOrientation: string;
  areaSize: string;
  name: string;
  phone: string;
  email: string;
  question: string;
  plz: string;
};

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<number>(1);

  const [success, setSuccess] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    propertyType: "",
    solarUsage: "",
    roofOrientation: "",
    areaSize: "",
    name: "",
    phone: "",
    email: "",
    question: "",
    plz: "",
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleNextScreenSelection = (selectedAnswer: string): void => {
    console.log(selectedAnswer);
    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData };
      const userDataKey = Object.keys(updatedUserData)[
        activeScreen - 1
      ] as keyof UserData;
      updatedUserData[userDataKey] = selectedAnswer;
      return updatedUserData;
    });
    setActiveScreen((prevScreen) => prevScreen + 1);
  };

  const handlePreviousScreen = (): void => {
    setActiveScreen((prevScreen) => Math.max(prevScreen - 1, 1));
  };

  const updateContactData = (newData: Partial<UserData>): void => {
    setUserData((prevUserData) => ({ ...prevUserData, ...newData }));
    setSuccess(true); // Set success to true to indicate submission was successful
  };

  const handleFormSubmit = (event: FormEvent): void => {
    event.preventDefault();

    console.log(userData);

    // Implement form submission logic
  };

  const screenData: ScreenDataType[] = [
    {
      question: "Wo möchten Sie die Solarpanels installieren?",
      answers: [
        "Einfamilienhaus",
        "Zweifamilienhaus",
        "Mehrfamilienhaus",
        "Firmengebäude",
        "Freifläche",
      ],
    },
    {
      question: "Wie möchten Sie den Solarstrom nutzen?",
      answers: ["Eigenverbrauch", "Einspeisung ins Netz", "Beides"],
    },
    {
      question: "Haben Sie eine nach Süden ausgerichtete Dachfläche?",
      answers: ["Ja", "Nein", "Teilweise", "Nicht sicher"],
    },
    {
      question: "Wie groß ist die Fläche bzw. geplante Anlage?",
      answers: [
        "Bis zu 30 m²",
        "30 - 100 m²",
        "100 - 200 m²",
        "200 - 500 m²",
        "Über 500 m²",
      ],
    },
    // Fügen Sie mehr Bildschirme hinzu, falls benötigt
  ];
  

  // Conditional rendering based on success state
  if (success) {
    return <SuccessScreen />;
  }




  return (
    <div className="offer-section">
      <div className="form-wrap">
        <form onSubmit={handleFormSubmit}>
          {activeScreen <= screenData.length && (
            <PropertyTypeButtons
              onAnswerSelect={handleNextScreenSelection}
              questionData={screenData[activeScreen - 1]}
            />
          )}

          {activeScreen === screenData.length + 1 && (
            <ContactForm
              updateContactData={updateContactData}
              userData={userData}
            />
          )}

        

          <button
            type="button"
            disabled={activeScreen === 1}
            className="btn-back"
            onClick={handlePreviousScreen}
          >
            Back
          </button>

          <Progress
            percent={((activeScreen - 1) / (screenData.length + 1)) * 100}
            size="small"
          />
        </form>
      </div>
    </div>
  );
};

export default App;
