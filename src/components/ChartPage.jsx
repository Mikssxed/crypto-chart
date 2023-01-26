import React from "react";
import Chart from "./Chart";
import SelectedCoin from "./SelectedCoin";

const ChartPage = ({ selected, unselect, goBack }) => {
  return (
    <div className="chartPage">
      <div className="chartHeader">
        <div className="selectedCoinsChart">
          <h2>Selected Coins</h2>
          <p>Click to remove</p>
          <div className="selectedCoins">
            {selected.map((coin) => {
              return selected.length > 1 ? (
                <SelectedCoin
                  unselect={unselect}
                  key={coin.id}
                  name={coin.name}
                  image={coin.image}
                  symbol={coin.symbol}
                />
              ) : (
                <SelectedCoin
                  unselect={() =>
                    alert("At least one coin must be selected at this view!")
                  }
                  key={coin.id}
                  name={coin.name}
                  image={coin.image}
                  symbol={coin.symbol}
                />
              );
            })}
          </div>
        </div>
        <button onClick={goBack} className="coinButton active">
          Go Back
        </button>
      </div>
      <Chart selected={selected} />
    </div>
  );
};

export default ChartPage;
