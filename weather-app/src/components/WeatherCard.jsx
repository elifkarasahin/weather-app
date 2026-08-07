export default function WeatherCard({ weather, sehir, loading, error }) {

  if (loading) {
    return(
      <section className="weather-card">
        <h2>{sehir}</h2>
        <h3>⏳</h3>
        <p>Hava durumu yükleniyor...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="weather-card">
        <h2>{sehir}</h2>
        <h3>❌</h3>
        <p>{error.message}</p>
      </section>
    );
  }

  if (!weather) {
  return (
    <section className="weather-card">

      <h2>{sehir}</h2>
      
      <h3>--°C</h3>

      <p>Henüz veri yok.</p>

    </section>
  );
  }

  const theme = weather.theme;

  return (
      <section className={`weather-card ${theme}`}>

      <h2>{sehir}</h2>

      <h3>{weather.temperature}°C</h3>

      <p>{weather.weatherIcon} {weather.weatherText}</p>

      <div className="weather-details">

        <div className="detail-card">
          <h4>🌡️ Hissedilen</h4>
          <p>{weather.feelsLike}°C</p>
        </div>

        <div className="detail-card">
          <h4>💧 Nem</h4>
          <p>%{weather.humidity}</p>
        </div>

        <div className="detail-card">
          <h4>💨 Rüzgar</h4>
          <p>{weather.wind} km/h</p>
        </div>
      </div>
    </section>
  );

}