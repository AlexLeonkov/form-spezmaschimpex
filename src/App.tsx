import React, { useState } from 'react';

import './App.css';

function App() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Selected option:', selectedOption);
    // You would handle form submission here, perhaps sending the selection to a server
  };

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Wofür interessierst du dich?</legend>

        <label>
          <input
            type="radio"
            value="solarAndHeatPump"
            checked={selectedOption === 'solarAndHeatPump'}
            onChange={handleChange}
          />
          Solaranlage & Wärmepumpe
        </label>

        <label>
          <input
            type="radio"
            value="solar"
            checked={selectedOption === 'solar'}
            onChange={handleChange}
          />
          Solaranlage
        </label>

        <label>
          <input
            type="radio"
            value="heatPump"
            checked={selectedOption === 'heatPump'}
            onChange={handleChange}
          />
          Wärmepumpe
        </label>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
}
export default App;
