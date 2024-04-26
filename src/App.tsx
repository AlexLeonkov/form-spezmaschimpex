import React, { useState, useEffect, FormEvent } from "react";
import "./App.css";
import PropertyTypeButtons from "./components/questionAnswerButtons";
import ContactForm from "./components/contactForm";
import { Progress } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import SuccessScreen from "./components/succesScreen";
import emailjs from "emailjs-com";

export type ScreenDataType = {
  question: string;
  answers: string[];
};


interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}
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
declare const fbq: any;



emailjs.init("sHzLaUUELf-W-VCHb");

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
    console.log(newData, "newData");
    setUserData((prevUserData) => ({ ...prevUserData, ...newData }));
    const emailParams = {
      propertyType: userData.propertyType,
      solarUsage: userData.solarUsage,
      roofOrientation: userData.roofOrientation,
      areaSize: userData.areaSize,
      name: newData.name,
      phone: newData.phone,
      email: newData.email,
      question: newData.question,
      plz: newData.plz,
    };

    console.log(emailParams);

    fbq('track', 'Lead');

    window.gtag = window.gtag || function() { (window.dataLayer = window.dataLayer || []).push(arguments); };
      
    // Insert the Google Ads Event snippet
    window.gtag('event', 'conversion', { 'send_to': 'AW-11412859119/3yy_CMux_foYEO_RicIq' });

    emailjs.send("service_k8svi04", "template_ujspeyu", emailParams).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSuccess(true); // Update the success state
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );

    // setSuccess(true); // Set success to true to indicate submission was successful
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

           <Progress
            percent={((activeScreen - 1) / (screenData.length + 1)) * 100}
            size="small"
            strokeColor="#4392c7"
          />
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
            Zurück
          </button>

         
        </form>
      </div>
    </div>
  );
};

export default App;
