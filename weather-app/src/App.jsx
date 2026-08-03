import "./App.css";

import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <div className="app">
      <Header />
      <WeatherCard />
    </div>
  );
}

export default App;