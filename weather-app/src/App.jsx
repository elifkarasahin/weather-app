import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";


function App() {

  const [sehir, setSehir] = useState("İzmir");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log("Component ilk kez açıldı.");
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