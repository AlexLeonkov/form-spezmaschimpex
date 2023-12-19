import React from 'react';
import './SuccessScreen.css'; // Make sure to create a corresponding CSS file

const SuccessScreen: React.FC = () => {
  return (
    <div className="success-screen animate-fade-in">
      <h2>Data Sent Successfully!</h2>
      <p>Your information has been successfully submitted. We will be in touch soon!</p>
    </div>
  );
};

export default SuccessScreen;
