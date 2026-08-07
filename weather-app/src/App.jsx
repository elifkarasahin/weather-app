import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";

import cities from "./data/cities";


function App() {

  function havaDurumuBilgisi(kod) {

  switch (kod) {

    case 0:
      return {
        text: "Açık",
        icon: "☀️",
        theme: "sunny"
      };

    case 1:
      return {
        text: "Çoğunlukla Açık",
        icon: "🌤️",
        theme: "sunny"
      };

    case 2:
      return {
        text: "Parçalı Bulutlu",
        icon: "⛅",
        theme: "cloudy"
      };

    case 3:
      return {
        text: "Bulutlu",
        icon: "☁️",
        theme: "cloudy"
      };

    case 45:
    case 48:
      return {
        text: "Sisli",
        icon: "🌫️",
        theme: "fog"
      };

    case 51:
    case 53:
    case 55:
      return {
        text: "Çiseleme",
        icon: "🌦️",
        theme: "rain"
      };

    case 61:
    case 63:
    case 65:
      return {
        text: "Yağmurlu",
        icon: "🌧️",
        theme: "rain"
      };

    case 71:
    case 73:
    case 75:
      return {
        text: "Karlı",
        icon: "❄️",
        theme: "snow"
      };

    case 80:
    case 81:
    case 82:
      return {
        text: "Sağanak Yağış",
        icon: "🌧️",
        theme: "rain"
      };

    case 95:
      return {
        text: "Fırtına",
        icon: "⛈️",
        theme: "storm"
      };

    default:
      return {
        text: "Bilinmeyen",
        icon: "🌍",
        theme: "default"
      };

  

}

}

  const [selectedCity, setSelectedCity] = useState(() => {

  const savedCity = localStorage.getItem("selectedCity");

  if (savedCity) {
    return JSON.parse(savedCity);
  }

  return {
    name: "İzmir",
    latitude: 38.4237,
    longitude: 27.1428,
  };

});
  const [recentCities, setRecentCities] = useState(() => {
    const savedCities = localStorage.getItem("recentCities");

    return savedCities ? JSON.parse(savedCities) : [];
  });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function havaDurumunuGetir() {

      setLoading(true);
      setError(null);


      try {

      const response = await fetch(
       `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code`
      );

      if (!response.ok) {
        throw new Error("Hava durumu alınamadı.");
      }

      
    const data = await response.json();

    const weatherInfo = havaDurumuBilgisi(
     data.current.weather_code
);

    const weatherData = {
  temperature: data.current.temperature_2m,
  feelsLike: data.current.apparent_temperature,
  humidity: data.current.relative_humidity_2m,
  wind: data.current.wind_speed_10m,
  weatherCode: data.current.weather_code,

  weatherText: weatherInfo.text,
  weatherIcon: weatherInfo.icon,
  theme: weatherInfo.theme,

  cityName: selectedCity.name,
};

setWeather(weatherData);
setRecentCities((prev) => {

  const filtered = prev.filter(
    (item) => item.cityName !== weatherData.cityName
  );

  return [weatherData, ...filtered].slice(0, 5);

});
    } catch (error) {
      setError(error);
    }finally {
      setLoading(false);
    }
  }
  havaDurumunuGetir();
  
  }, [selectedCity]);

  useEffect(() => {
        localStorage.setItem(
          "recentCities",
          JSON.stringify(recentCities)
        );
      }, [recentCities]);

  function handleSelectCity(city) {
    setSelectedCity(city);
    
    
    localStorage.setItem(
    "selectedCity",
    JSON.stringify(city)
  );
  }

  function handleRecentCityClick(cityName) {

    const selected = cities.find(
      (city) => city.name === cityName
    );

    if (!selected) return;

    setSelectedCity(selected);

    localStorage.setItem(
      "selectedCity",
      JSON.stringify(selected)
    );

  }

  return (
  <div className="app">

    <Header />

    <SearchBar
      cities={cities}
      onSelectCity={handleSelectCity}
    />

    <div className="weather-layout">

      <aside className="left-panel">
  <h2>Son Arananlar</h2>

  {recentCities.map((city) => (

  <div
    key={city.cityName}
    className="recent-city"
    onClick={() =>
                handleRecentCityClick(city.cityName)
              }
            >

    <span>
      {city.weatherIcon} {city.cityName}
    </span>

    <strong>
      {city.temperature}°
    </strong>

  </div>

))}
</aside>

      <main className="center-panel">

  <div className="weather-card-wrapper">

    <WeatherCard
      weather={weather}
      sehir={selectedCity.name}
      loading={loading}
      error={error}
    />

  </div>

</main>

      <aside className="right-panel">

        <h2>5 Günlük Tahmin</h2>

      </aside>

    </div>

  </div>
);
}

export default App;