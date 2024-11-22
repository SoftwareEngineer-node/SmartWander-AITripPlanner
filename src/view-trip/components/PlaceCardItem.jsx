import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {

  const [photoUrl,setPhotoUrl] = useState();

  useEffect(()=>{
    place&&GetPlacePhoto();
  },[place])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:place.placeName
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      // console.log(resp.data.places[0].photos[0].name)
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[0].name)
      setPhotoUrl(PhotoUrl)
    })
  }


  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName } target='_blank'>
        <div className='flex gap-5 p-3 mt-2 transition-all border cursor-pointer rounded-xl hover:scale-105 hover:shadow-md '>
            <img src={photoUrl?photoUrl:"/placeholder.jpg"} className='w-[130px] h-[130px] rounded-xl object-cover' />
            <div>
                <h2 className='text-lg font-bold'>{place.placeName}</h2>
                <p className='text-sm text-gray-400'>{place.placeDetails}</p>
                <h2 className='flex items-center gap-2 text-sm text-black'><img src="https://em-content.zobj.net/source/whatsapp/401/ticket_1f3ab.png" width={15}/>{place.ticketPricing}</h2>
                <h2 className='flex items-center gap-2 text-sm text-black' ><img src="https://em-content.zobj.net/source/samsung/405/ten-oclock_1f559.png" width={15}/>{place.time}</h2>
            </div>
        </div>
    </Link>
    
  )
}

export default PlaceCardItem
