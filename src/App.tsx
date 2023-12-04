import React, { useState } from "react";

import "./App.css";
import Screen1 from "./components/screen1";
import Screen2 from "./components/screen2";

function App() {
  const [selectedOption, setSelectedOption] = useState("");
  const [screen2, setscreen2] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Selected option:", selectedOption);
    // You would handle form submission here, perhaps sending the selection to a server
  };

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleClickItem = (item: string) => {
    setSelectedOption(item);
    // Additional logic when an item is clicked
    setscreen2(true);
    console.log(item);
  };

  return (
    <div className="container">
      <h2>What are u interested in</h2>
      <form className="form" onSubmit={handleSubmit}>
        {screen2 ? <Screen2 /> : <Screen1 onClick={handleClickItem} />}

        {/* <Screen1 /> */}

        {
          screen2 ?   <button type="submit">Submit</button> : <></>
        }
      
      </form>
    </div>
  );
}
export default App;
