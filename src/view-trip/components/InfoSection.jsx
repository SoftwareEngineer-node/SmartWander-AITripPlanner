import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';


function InfoSection({trip}) {

  const [photoUrl,setPhotoUrl] = useState();

  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[0].name)
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[0].name)
      setPhotoUrl(PhotoUrl)
    })
  }
  
  return (

    <div>
        <img src={photoUrl?photoUrl:"/placeholder.jpg"} className='h-[300px] w-full object-cover rounded' />
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-2 my-5'>
            <h2 className='flex items-center gap-2 text-2xl font-bold'><FaLocationDot />{trip?.userSelection?.location?.label}</h2>
            <div className='flex gap-6'>
              <h2 className='flex items-center gap-2 p-1 px-3 text-sm text-gray-500 bg-gray-200 rounded-full md:text-md'><img src="https://em-content.zobj.net/source/twitter/348/calendar_1f4c5.png" width={20}/> {trip.userSelection?.noOfDays} Day</h2>
              <h2 className="flex items-center gap-2 p-1 px-3 text-sm text-gray-500 bg-gray-200 rounded-full md:text-md"><img src="https://em-content.zobj.net/source/twitter/348/coin_1fa99.png" width={20}/>{trip.userSelection?.budget} Budget</h2>
              <h2 className='flex items-center gap-2 p-1 px-3 text-sm text-gray-500 bg-gray-200 rounded-full md:text-md'><img src="https://em-content.zobj.net/source/twitter/348/clinking-beer-mugs_1f37b.png" width={20}/> No. Of Traveler: {trip.userSelection?.traveler}</h2>
            </div>
          </div>
          <Button><IoSend /></Button>
        </div>
   
    </div>

  )
}

export default InfoSection