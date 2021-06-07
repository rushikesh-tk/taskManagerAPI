import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Homescreen from "./components/HomeScreen/Homescreen";
import APIKey from "./components/APIKey";

const App = () => {
  const [apiKEY, setApiKEY] = useState();

  return (
    <>
      <Navbar />
      <Homescreen setApiKEY={setApiKEY} />
      <APIKey apiKEY={apiKEY} />
    </>
  );
};

export default App;
