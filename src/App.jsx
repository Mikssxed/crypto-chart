import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Coin from "./components/Coin";
import SelectedCoin from "./components/SelectedCoin";
import ChartPage from "./components/ChartPage";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [chart, setChart] = useState(false);

  //Get initial coins data and get from localStorage selected coins
  useEffect(() => {
    //1)Get coins data
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((err) => alert(err));

    //2) get local storage selected coins
    const data = window.localStorage.getItem("selectedCoins");
    if (data !== null) setSelected(JSON.parse(data));
  }, []);

  //allows to search
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //select coins
  const handleClick = async (e) => {
    if (selected.length >= 5) return alert("You can select up to 5 Coins");
    const current = e.target.closest(".coin"); //clicked coin
    const clicked = coins.filter((coin) => coin.symbol === current.id)[0]; //filter out clicked coin

    //adds filtered out coin to selected
    setSelected([
      ...selected,
      {
        ...clicked,
        prices: [],
      },
    ]);
  };

  //unselect coins
  const unselect = (e) => {
    const clicked = e.target.closest("div"); //clicked selected coin

    //removes clicked coin from selected coins
    setSelected(
      selected.filter((coin) => coin.symbol !== clicked.id.slice(0, -1))
    );
  };

  //load behind the scenes prices for selected coin; set local storage
  useEffect(() => {
    //load and set price for selected coins
    selected.map(
      async (coin) =>
        await axios
          .get(
            `https://api.coingecko.com/api/v3/coins/${coin.id.toLowerCase()}/market_chart?vs_currency=eur&days=1`
          )
          .then((data) => (coin.prices = data.data.prices))
          .catch((err) => alert(err))
    );

    //set local storage
    window.localStorage.setItem("selectedCoins", JSON.stringify(selected));
  }, [selected]);

  //change view to chart
  const seeChart = () => {
    if (selected.length === 0) return alert("Please, select at least one coin");
    setChart(true);
  };

  //change view to coins
  const goBack = () => {
    setChart(false);
  };

  //filter coins with input
  const filteredCoins = coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(search.toLowerCase()) && //filter coins
      !selected.some((i) => i.id === coin.id) //preventa bug when filtering coins
    );
  });

  return (
    <div className="App">
      {chart ? (
        <ChartPage goBack={goBack} selected={selected} unselect={unselect} />
      ) : (
        <>
          <div className="selectedCoinsContainer">
            <h2>Selected Coins</h2>
            <p>Up to 5!</p>
            <div className="selectedCoins">
              {selected.map((coin) => {
                return (
                  <SelectedCoin
                    unselect={unselect}
                    key={coin.id}
                    name={coin.name}
                    image={coin.image}
                    symbol={coin.symbol}
                  />
                );
              })}
            </div>
          </div>
          <div className="coinSearch">
            <form>
              <h1 className="coinText">Search a currency</h1>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Search"
                className="coinInput"
              />
            </form>

            <button onClick={seeChart} className="coinButton active">
              Check Chart!
            </button>
          </div>
          <div className="coinContainer">
            {filteredCoins.map((coin) => {
              return (
                <Coin
                  key={coin.id}
                  name={coin.name}
                  image={coin.image}
                  symbol={coin.symbol}
                  marketcap={coin.market_cap}
                  price={coin.current_price}
                  priceChange={coin.price_change_percentage_24h}
                  volume={coin.total_volume}
                  onClick={handleClick}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
