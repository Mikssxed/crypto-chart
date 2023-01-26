import React from "react";

const SelectedCoin = ({ image, name, unselect, symbol }) => {
  return (
    <div id={symbol + 1} onClick={unselect} className="coinSel ${}">
      <img src={image} alt="crypto" />
      <h3>{name}</h3>
    </div>
  );
};

export default SelectedCoin;
