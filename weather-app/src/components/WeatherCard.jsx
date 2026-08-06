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
  return (
    <section className="weather-card">

      <h2>{sehir}</h2>

      <h3>{weather.current.temperature_2m}°C</h3>

      <p>☀️ Güncel hava durumu</p>
    </section>
  );

}