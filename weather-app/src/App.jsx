import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";


function App() {

  const [sehir, setSehir] = useState("İzmir");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=38.41273&longitude=27.13838&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code"
    )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      setWeather(data);
    });
  }, []);

  return (
    <div className="app">
      <Header />

      <WeatherCard 
      weather={weather}
      sehir={sehir}
      />
    </div>
  );
}

export default App;