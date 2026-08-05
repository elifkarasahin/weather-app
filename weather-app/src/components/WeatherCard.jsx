export default function WeatherCard({ weather, sehir }) {

  if (!weather) {
  return (
    <section className="weather-card">

      <h2>{sehir}</h2>
      
      <h3>--°C</h3>

      <p>Henüz veri yok.</p>

    </section>
  );
  }
  return (
    <section className="weather-card">

      <h2>{sehir}</h2>

      <h3>{weather.current.temperature_2m}°C</h3>

      <p>☀️ Güncel hava durumu</p>
    </section>
  );

}