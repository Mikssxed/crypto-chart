import React from "react";

const Coin = ({
  image,
  name,
  symbol,
  price,
  priceChange,
  onClick,
}) => {
  return (
    <div id={symbol} onClick={onClick} className="coin">
      <div className="coinHeader">
        <img src={image} alt="crypto" />
        <h1>{name}</h1>
        <p className="coinSymbol">{symbol}</p>
      </div>
      <div className="coinData">
        <p className="coinPrice">Coin Price: € {price}</p>
        {priceChange < 0 ? (
          <span className="coinPercent red">{priceChange.toFixed(2)}%</span>
        ) : (
          <span className="coinPercent green">{priceChange.toFixed(2)}%</span>
        )}
      </div>
    </div>
  );
};

export default Coin;
