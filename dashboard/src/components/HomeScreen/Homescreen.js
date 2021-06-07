import React, { useState } from "react";
import "./Homescreen.css";

const Homescreen = ({ setApiKEY }) => {
  const [inputs, changeInputs] = useState({
    applicationName: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createAPIKEY(inputs);
    changeInputs({
      applicationName: "",
      password: "",
    });
  };

  const createAPIKEY = ({ applicationName, password }) => {
    fetch("http://localhost:5000/createapikey", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ applicationName, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setApiKEY(data.apikey);
        }
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
      });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputs.applicationName}
        placeholder="Application name"
        onChange={(e) =>
          changeInputs({ ...inputs, ["applicationName"]: e.target.value })
        }
        required
      />
      <input
        type="password"
        value={inputs.password}
        placeholder="Password"
        onChange={(e) =>
          changeInputs({ ...inputs, ["password"]: e.target.value })
        }
        required
      />
      <input type="submit" value="Create APIKEY" />
    </form>
  );
};

export default Homescreen;
