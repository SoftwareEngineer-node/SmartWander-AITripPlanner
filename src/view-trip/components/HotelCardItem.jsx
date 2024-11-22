import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({hotel}) {
    const [photoUrl,setPhotoUrl] = useState();
    useEffect(()=>{
      hotel&&GetPlacePhoto();
    },[hotel])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:hotel?.hotelName
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[0].name)
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[0].name)
      setPhotoUrl(PhotoUrl)
    })
  }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+ "," +hotel?.hotelAddress} target='_blank'>

        <div className='transition-all cursor-pointer hover:scale-105'>
            <img src={photoUrl?photoUrl:"/placeholder.jpg"} className='rounded-xl h-[180px] w-full onject-cover' />
            <div className='flex flex-col gap-2 my-3'>
                <h2 className='font-medium text-black'>{hotel?.hotelName}</h2>
                <h2 className='flex items-center gap-2 text-xs text-gray-600'><img src="https://em-content.zobj.net/source/apple/391/round-pushpin_1f4cd.png" width={15}/>{hotel?.hotelAddress}</h2>
                <h2 className='flex items-center gap-2 text-xs text-black'><img src="https://em-content.zobj.net/source/huawei/375/money-bag_1f4b0.png" width={15}/>{hotel?.price}</h2>
                <h2 className='flex items-center gap-2 text-xs text-black'><img src="https://em-content.zobj.net/source/samsung/405/star_2b50.png" width={15}/>{hotel?.rating} </h2>
            </div>
        </div>
    </Link>  
)
}

export default HotelCardItem