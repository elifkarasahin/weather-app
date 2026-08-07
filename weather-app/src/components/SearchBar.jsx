import { useEffect, useState } from "react";

export default function SearchBar({ onSelectCity }) {

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {

    const text = searchText.trim();

    // Arama kutusu boşsa her şeyi temizle
    if (text === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // 3 harften azsa API'ye istek gönderme
    if (text.length < 3) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();

    async function sehirleriAra() {

      setIsSearching(true);

      try {

        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            text
          )}&count=10&language=tr&format=json`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Şehir araması başarısız.");
        }

        const data = await response.json();

        const results = data.results || [];

        // Sadece Türkiye'deki sonuçları göster
        const turkeyResults = results.filter(
          (city) => city.country_code === "TR"
        );

        setSearchResults(turkeyResults);

      } catch (error) {

        // Eski istek iptal edildiyse hata gösterme
        if (error.name !== "AbortError") {

          console.error("Şehir arama hatası:", error);

          setSearchResults([]);

        }

      } finally {

        if (!controller.signal.aborted) {
          setIsSearching(false);
        }

      }

    }

    sehirleriAra();

    // Kullanıcı yeni harf yazdığında önceki isteği iptal et
    return () => {
      controller.abort();
    };

  }, [searchText]);


  function handleChange(event) {
    setSearchText(event.target.value);
  }


  function handleSelect(city) {

    const selectedCity = {
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
    };

    onSelectCity(selectedCity);

    // Şehir seçildikten sonra arama alanını temizle
    setSearchText("");
    setSearchResults([]);

  }


  const text = searchText.trim();


  return (
    <div className="search-bar">

      <input
        type="text"
        placeholder="Şehir giriniz..."
        value={searchText}
        onChange={handleChange}
      />

      {text !== "" && (
        <ul className="city-list">

          {/* 3 harften azsa */}
          {text.length < 3 && (
            <li className="search-message">
              En az 3 harf giriniz.
            </li>
          )}

          {/* API'den sonuç bekleniyorsa */}
          {text.length >= 3 && isSearching && (
            <li className="search-message">
              Şehirler aranıyor...
            </li>
          )}

          {/* API cevap verdi ama sonuç yoksa */}
          {text.length >= 3 &&
            !isSearching &&
            searchResults.length === 0 && (
              <li className="search-message">
                Şehir bulunamadı.
              </li>
            )}

          {/* Şehir sonuçları */}
          {text.length >= 3 &&
            !isSearching &&
            searchResults.map((city) => (
              <li
                key={`${city.id}-${city.latitude}-${city.longitude}`}
                onClick={() => handleSelect(city)}
              >

                <strong>{city.name}</strong>

                <span>
                  {city.admin1
                    ? ` — ${city.admin1}, Türkiye`
                    : " — Türkiye"}
                </span>

              </li>
            ))}

        </ul>
      )}

    </div>
  );
}