import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const query = hotel?.hotelName;
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
      console.error("Error fetching photo from Pexels:", error);
      setPhotoUrl("/placeholder.jpg");
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + "," + hotel?.hotelAddress)}`}
      target="_blank"
    >
      <div className="transition-all cursor-pointer hover:scale-105">
        <img
          src={photoUrl || "/placeholder.jpg"}
          className="rounded-xl h-[180px] w-full object-cover"
          alt={hotel?.hotelName}
        />
        <div className="flex flex-col gap-2 my-3">
          <h2 className="font-medium text-black">{hotel?.hotelName}</h2>
          <h2 className="flex items-center gap-2 text-xs text-gray-600">
            <img
              src="https://em-content.zobj.net/source/apple/391/round-pushpin_1f4cd.png"
              width={15}
              alt="Address icon"
            />
            {hotel?.hotelAddress}
          </h2>
          <h2 className="flex items-center gap-2 text-xs text-black">
            <img
              src="https://em-content.zobj.net/source/huawei/375/money-bag_1f4b0.png"
              width={15}
              alt="Price icon"
            />
            {hotel?.price}
          </h2>
          <h2 className="flex items-center gap-2 text-xs text-black">
            <img
              src="https://em-content.zobj.net/source/samsung/405/star_2b50.png"
              width={15}
              alt="Rating icon"
            />
            {hotel?.rating}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
