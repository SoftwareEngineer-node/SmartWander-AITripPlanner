import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { IoSend } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import axios from 'axios';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) {
      console.log("Trip Data:", trip);
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const query = trip?.userSelection?.location?.label || trip?.userSelection?.location?.display_name;
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

      if (res.data.photos?.length > 0) {
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
    <div className="w-full">
      {/* Banner Image */}
      <img
        src={photoUrl || "/placeholder.jpg"}
        className="w-full h-[250px] md:h-[350px] object-cover rounded-lg"
        alt="Destination"
      />

      {/* Trip Details */}
      <div className="flex flex-col gap-4 my-6 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col gap-3">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 md:text-2xl">
            <FaLocationDot className="text-black" />
            {trip?.userSelection?.location?.label ||
              trip?.userSelection?.location?.display_name ||
              'Unknown Location'}
          </h2>

          <div className="flex flex-wrap gap-3 text-sm md:text-base">
            {trip?.userSelection?.noOfDays && (
              <span className="flex items-center gap-2 px-3 py-1 text-gray-600 bg-gray-100 rounded-full">
                <img src="https://em-content.zobj.net/source/twitter/348/calendar_1f4c5.png" width={20} />
                {trip.userSelection.noOfDays} Day
              </span>
            )}
            {trip?.userSelection?.budget && (
              <span className="flex items-center gap-2 px-3 py-1 text-gray-600 bg-gray-100 rounded-full">
                <img src="https://em-content.zobj.net/source/twitter/348/coin_1fa99.png" width={20} />
                {trip.userSelection.budget} Budget
              </span>
            )}
            {trip?.userSelection?.traveler && (
              <span className="flex items-center gap-2 px-3 py-1 text-gray-600 bg-gray-100 rounded-full">
                <img src="https://em-content.zobj.net/source/twitter/348/clinking-beer-mugs_1f37b.png" width={20} />
                No. of Traveler: {trip.userSelection.traveler}
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default InfoSection;
