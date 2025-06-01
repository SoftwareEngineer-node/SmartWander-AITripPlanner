import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='my-5 text-xl font-bold'>Top Attractions</h2>
        <div>
          {trip.tripData?.itinerary.map((item,index)=>(
            <div className='mt-5'>
<<<<<<< HEAD
            <h2 className='text-lg font-medium'>Day {item.day}</h2>
=======
            <h2 className='text-lg font-medium'>{item.day}</h2>
>>>>>>> a4cfcb93538eea0c77bfb8972f2ddb9b0e75d1cc
            <div className='grid gap-5 md:grid-cols-2'>
            {item.plan.map((place,index)=>(
              <div>
                <h2 className='text-sm font-medium text-blue-600'>{place.time}</h2>
                <PlaceCardItem place={place}/>

              </div>
            ))}
            </div>
        </div>
          ))}
        </div>
    </div>
  )
}

export default PlacesToVisit
<<<<<<< HEAD
=======


>>>>>>> a4cfcb93538eea0c77bfb8972f2ddb9b0e75d1cc
