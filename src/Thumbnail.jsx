import React, { useState } from "react";

function Thumbnail({ name, number, img, toggleCurrentEntry }) {
  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b(?!of|the)\w/g, (match) => match.toUpperCase());
  };

  return (
    <div
      className="thumbnail"
      onClick={() => {
        toggleCurrentEntry(number);
      }}
    >
      <img src={img} alt="" />
      <h3>{capitalizeFirstLetter(name)}</h3>
      <p>{number.toString().padStart(3, "0")}</p>
    </div>
  );
}

export default Thumbnail;
