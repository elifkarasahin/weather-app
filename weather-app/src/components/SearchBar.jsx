import { useState } from "react";

export default function SearchBar({
  cities,
  onSelectCity,
}) {

  const [searchText, setSearchText] = useState("");

  function handleChange(event) {
    setSearchText(event.target.value);
  }

  function handleSelect(city) {

    onSelectCity(city);

  setSearchText("");
  }

  const filteredCities = cities.filter((city) => 
    city.name.toLowerCase().startsWith(searchText.toLowerCase())

  );

  return (
    <div className="search-bar">

      <input
        type="text"
        placeholder="Şehir giriniz..."
        value={searchText}
        onChange={handleChange}
      />

      {searchText !== "" && (
        <ul className="city-list">
          {filteredCities.map((city) => (
            <li key={city.name}
            onClick={() => handleSelect(city)}>
              {city.name}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}