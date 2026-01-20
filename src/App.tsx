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
  key: keyof UserData;
};


interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}
export type UserData = {
  interest: string;
  propertyType: string;
  solarUsage: string;
  roofOrientation: string;
  areaSize: string;
  buildingType: string;
  heatingType: string;
  persons: string;
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
    interest: "",
    propertyType: "",
    solarUsage: "",
    roofOrientation: "",
    areaSize: "",
    buildingType: "",
    heatingType: "",
    persons: "",
    name: "",
    phone: "",
    email: "",
    question: "",
    plz: "",
  });

  const [screenData, setScreenData] = useState<ScreenDataType[]>([
    {
      question: "Was möchten Sie planen?",
      answers: ["Photovoltaik", "Wärmepumpe", "Photovoltaik + Wärmepumpe"],
      key: "interest",
    },
  ]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleNextScreenSelection = (selectedAnswer: string): void => {
    console.log(selectedAnswer);
    
    // Update logic for screen flow based on first answer
    if (activeScreen === 1) {
       let nextScreens: ScreenDataType[] = [];
       const commonStart: ScreenDataType = {
         question: "Was möchten Sie planen?",
         answers: ["Photovoltaik", "Wärmepumpe", "Photovoltaik + Wärmepumpe"],
         key: "interest",
       };

       if (selectedAnswer === "Photovoltaik") {
         nextScreens = [
           commonStart,
           {
             question: "Wo möchten Sie die Solarpanels installieren?",
             answers: [
               "Einfamilienhaus",
               "Zweifamilienhaus",
               "Mehrfamilienhaus",
               "Firmengebäude",
               "Freifläche",
             ],
             key: "propertyType",
           },
           {
             question: "Wie möchten Sie den Solarstrom nutzen?",
             answers: ["Eigenverbrauch", "Einspeisung ins Netz", "Beides"],
             key: "solarUsage",
           },
           {
             question: "Haben Sie eine nach Süden ausgerichtete Dachfläche?",
             answers: ["Ja", "Nein", "Teilweise", "Nicht sicher"],
             key: "roofOrientation",
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
             key: "areaSize",
           },
         ];
       } else if (selectedAnswer === "Wärmepumpe") {
         nextScreens = [
           commonStart,
           {
             question: "Wo soll die Wärmepumpe installiert werden?",
             answers: [
               "Einfamilienhaus",
               "Zweifamilienhaus",
               "Mehrfamilienhaus",
               "Firmengebäude",
             ],
             key: "propertyType",
           },
           {
             question: "Handelt es sich um einen Neubau oder Bestandsgebäude?",
             answers: ["Neubau", "Bestandsgebäude", "Sanierung geplant"],
             key: "buildingType",
           },
           {
            question: "Wie groß ist die zu beheizende Wohnfläche?",
            answers: [
              "Bis 100 m²",
              "100 - 150 m²",
              "150 - 200 m²",
              "Über 200 m²",
            ],
            key: "areaSize",
           },
           {
             question: "Wie heizen Sie aktuell?",
             answers: ["Gas", "Öl", "Strom", "Holz/Pellets", "Sonstiges"],
             key: "heatingType",
           },
           {
             question: "Wie viele Personen leben im Haushalt?",
             answers: ["1-2", "3-4", "5 oder mehr"],
             key: "persons",
           },
         ];
       } else {
         // PV + WP
         nextScreens = [
           commonStart,
           {
             question: "Wo möchten Sie die Anlage installieren?",
             answers: [
               "Einfamilienhaus",
               "Zweifamilienhaus",
               "Mehrfamilienhaus",
               "Firmengebäude",
             ],
             key: "propertyType",
           },
           {
             question: "Handelt es sich um einen Neubau oder Bestandsgebäude?",
             answers: ["Neubau", "Bestandsgebäude", "Sanierung geplant"],
             key: "buildingType",
           },
           {
             question: "Wie groß ist die zu beheizende Wohnfläche?",
             answers: [
               "Bis 100 m²",
               "100 - 150 m²",
               "150 - 200 m²",
               "Über 200 m²",
             ],
             key: "areaSize",
           },
           {
             question: "Haben Sie eine nach Süden ausgerichtete Dachfläche?",
             answers: ["Ja", "Nein", "Teilweise", "Nicht sicher"],
             key: "roofOrientation",
           },
           {
             question: "Wie heizen Sie aktuell?",
             answers: ["Gas", "Öl", "Strom", "Holz/Pellets", "Sonstiges"],
             key: "heatingType",
           },
         ];
       }
       setScreenData(nextScreens);
    }

    setUserData((prevUserData) => {
      const updatedUserData = { ...prevUserData };
      // Use the key from the current screen definition
      // Note: validation of array bounds is implied by logic
      const currentKey = screenData[activeScreen - 1]?.key || 
                        (activeScreen === 1 ? 'interest' : 'question'); // Fallback for safety
      
      if (currentKey) {
          (updatedUserData as any)[currentKey] = selectedAnswer;
      }
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
      interest: userData.interest,
      propertyType: userData.propertyType,
      solarUsage: userData.solarUsage,
      roofOrientation: userData.roofOrientation,
      areaSize: userData.areaSize,
      buildingType: userData.buildingType,
      heatingType: userData.heatingType,
      persons: userData.persons,
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

  // Conditional rendering based on success state
  if (success) {
    return <SuccessScreen />;
  }

  return (
    <div className="offer-section">
      <div className="form-wrap">
        <form onSubmit={handleFormSubmit}>

           <Progress
            percent={Math.round(((activeScreen - 1) / (screenData.length + 1)) * 100)}
            size="small"
            showInfo={true}
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
