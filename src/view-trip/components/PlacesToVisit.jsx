import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const itinerary = trip.tripData?.itinerary;

  return (
    <div>
      <h2 className="my-5 text-xl font-bold">Top Attractions</h2>
      <div>
        {itinerary &&
          Object.keys(itinerary).map((dayKey) => (
            <div key={dayKey} className="mt-5">
              <h2 className="text-lg font-medium capitalize">{dayKey}</h2>
              <div className="grid gap-5 md:grid-cols-2">
                {itinerary[dayKey].map((place, index) => (
                  <div key={index}>
                    <h2 className="text-sm font-medium text-gray-400">{place.timeTravel}</h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
