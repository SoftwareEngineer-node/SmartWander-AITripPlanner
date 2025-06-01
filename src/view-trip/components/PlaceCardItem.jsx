import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    const query = place?.placeName;
    if (!query) return;

    try {
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
        {
          headers: {
            Authorization: import.meta.env.VITE_PEXELS_API_KEY,
          },
        }
      );

      if (res.data.photos && res.data.photos.length > 0) {
        setPhotoUrl(res.data.photos[0].src.landscape);
      } else {
        setPhotoUrl("/placeholder.jpg");
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
      setPhotoUrl("/placeholder.jpg");
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`}
      target="_blank"
    >
      <div className="flex gap-5 p-3 mt-2 transition-all border cursor-pointer rounded-xl hover:scale-105 hover:shadow-md">
        <img
          src={photoUrl || "/placeholder.jpg"}
          className="w-[130px] h-[130px] rounded-xl object-cover"
          alt={place?.placeName}
        />
        <div>
          <h2 className="text-lg font-bold">{place?.placeName}</h2>
          <p className="text-sm text-gray-400">{place?.placeDetails}</p>
          <h2 className="flex items-center gap-2 text-sm text-black">
            <img
              src="https://em-content.zobj.net/source/whatsapp/401/ticket_1f3ab.png"
              width={15}
              alt="Ticket icon"
            />
            {place?.ticketPricing}
          </h2>
          <h2 className="flex items-center gap-2 text-sm text-black">
            <img
              src="https://em-content.zobj.net/source/samsung/405/ten-oclock_1f559.png"
              width={15}
              alt="Time icon"
            />
            {place?.timeTravel}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
