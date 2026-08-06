import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";


function App() {

  const [sehir, setSehir] = useState("İzmir");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function havaDurumunuGetir() {

      try {

      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=38.41273&longitude=27.13838&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code"
    
      );

      if (!response.ok) {
        throw new Error("Hava durumu alınamadı.");
      }

    
    const data = await response.json();

    setWeather(data);
    } catch (error) {
      setError(error);
    }finally {
      setLoading(false);
    }
  }
  havaDurumunuGetir();
  
  }, []);

  return (
    <div className="app">
      <Header />

      <WeatherCard 
      weather={weather}
      sehir={sehir}
      loading={loading}
      error={error}
      />
    </div>
  );
}

export default App;