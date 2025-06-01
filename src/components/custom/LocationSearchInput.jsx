// src/components/custom/LocationSearchInput.jsx
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

function LocationSearchInput({ onSelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      if (query.length < 3) return;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    };

    const debounce = setTimeout(fetchLocations, 400);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (location) => {
    setQuery(location.display_name);
    setSuggestions([]);
    onSelect(location);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full overflow-y-auto bg-white border shadow-md max-h-60">
          {suggestions.map((place, idx) => (
            <li
              key={idx}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationSearchInput;
