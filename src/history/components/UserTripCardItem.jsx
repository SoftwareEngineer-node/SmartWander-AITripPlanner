import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
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
    <Link to={'/view-trip/'+trip?.id}>
        <div className='transition-all hover:scale-105 '>
            <img src={photoUrl?photoUrl:"/placeholder.jpg"} className="rounded-xl h-[200px] w-full onject-cover"/>
            <div>
                <h2 className='text-lg font-bold text-black'>{trip?.userSelection?.location?.label}</h2>
                <h2 className='text-sm text-gray-500 '>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
            </div>
        </div>
    </Link>
  )
}

export default UserTripCardItem