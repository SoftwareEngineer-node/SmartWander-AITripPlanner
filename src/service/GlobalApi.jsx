import axios from "axios";

const LOCATIONIQ_API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

// === LocationIQ: Forward Geocoding (search place info based on text input) ===
export const getPlaceDetails = async (query) => {
  const url = `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(query)}&format=json`;
  return axios.get(url);
};

// === LocationIQ: Reverse Geocoding (optional, if needed) ===
export const getPlaceByCoords = async (lat, lon) => {
  const url = `https://us1.locationiq.com/v1/reverse.php?key=${LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lon}&format=json`;
  return axios.get(url);
};

// === Pexels: Fetch images based on location or place name ===
export const getPlacePhotoFromPexels = async (query) => {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`;
  return axios.get(url, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });
};
