import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div>
        <h2 className='my-5 text-xl font-bold'>Top Hotel Picks</h2>
        <div className='grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4'>
            {trip?.tripData?.hotelOptions?.map((hotel,index) =>(
                <HotelCardItem hotel={hotel}/>
            ))}
        </div>
    </div>
  )
}

export default Hotels