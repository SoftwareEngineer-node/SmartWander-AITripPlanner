import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
  const [place,setPlace] = useState();
  const [formData,setFormData] = useState([]);
  const [openDailog,setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleInputChange=(name,value)=>{
    setFormData({
      ...formData,
      [name]:value
    })
  }

  useEffect(()=>{
    console.log(formData);
  },[formData])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

  const OnGenerateTrip=async()=>{

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDailog(true)
      return ;
    }

    if(formData?.noOfDays>10&&!formData?.location||!formData?.budget||!formData?.traveler){
      toast("Please fill all details.")
      return ;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace('{location}', formData?.location.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays)

    // console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--",result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())

  }

  const SaveAiTrip = async(TripData) => {
    setLoading(true); 
    const user= JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData) ,
      userEmail: user?.email,
      id:docId

    });
    setLoading(false); 
    navigate('/view-trip/'+docId)
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDailog(false);
      OnGenerateTrip(); 
    })
  };

  return (
    <div className='px-5 mt-10 sm:px-10 md:px-32 lg:px-56 xl:px-72'>
      <h2 className='text-3xl font-bold'>Share your ideal travel style and interests with us</h2>
      <p className='mt-3 text-xl text-grey-500'>Share a few details, and our AI trip planner will craft a tailored itinerary that perfectly matches your preferences</p>

      <div className='flex flex-col mt-20 gap-9'>
        <div>
          <h2 className='my-3 text-xl font-medium'>Where would you like to explore next?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange:(v)=>{setPlace(v); handleInputChange('location',v)}      
            }}
          />
        </div>
        <div>
          <h2 className='my-3 text-xl font-medium'>What is the duration of your planned trip?</h2>
          <Input placeholder={'For Example: 2'} type="number"
            onChange={(e)=>handleInputChange('noOfDays',e.target.value)}
          />
        </div>
        <div>
          <h2 className='my-3 text-xl font-medium'>How Much Do You Plan to Spend?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item,index)=>
              <div key={index} 
              onClick={()=>handleInputChange('budget',item.title)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                ${formData?.budget==item.title&&'shadow-lg border-blue-400'}
                `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='text-lg font-bold'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className='my-3 text-xl font-medium'>Who is Joining You on This Adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item,index)=>
              <div key={index} 
              onClick={()=>handleInputChange('traveler',item.people)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
                ${formData?.traveler==item.people&&'shadow-lg border-blue-400'}
                `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='text-lg font-bold'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='flex justify-end my-10'>
        <Button className='bg-[#2e79d5] text-white hover:bg-[#1e5c9d]'
          disabled={loading}
          onClick={OnGenerateTrip}>
          {loading?
            <FiLoader className='h-7 w-7 animate-spin'/>:'Plan My Journey'
          }
        </Button>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
            <img src="/logo.png" width={200}/>
            <h2 className='text-lg font-bold mt-7'>Sign In With Google</h2>
            <p>Sign in to the App with Google authentication securely</p>
            <Button  
              disabled={loading}
              onClick={login}          
              className="flex items-center w-full gap-4 mt-5">  
              <FcGoogle className='h-9 w-9' />Sign In With Google
            </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      
    </div>
  )
}

export default CreateTrip