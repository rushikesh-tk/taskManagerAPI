import React from "react";

const APIKey = ({ apiKEY }) => {
  const style = {
    p: {
      alignSelf: "center",
      marginLeft: "1rem",
    },
  };

  return (
    <div style={{ display: "flex" }}>
      <h3>APIKEY : </h3>
      {!apiKEY ? (
        <p style={style.p}>Enter credentials to create one</p>
      ) : (
        <p style={style.p}>{apiKEY}</p>
      )}
    </div>
  );
};

export default APIKey;
