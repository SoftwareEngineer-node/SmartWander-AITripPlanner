import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import LocationSearchInput from '@/components/custom/LocationSearchInput';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (formData?.noOfDays > 10 || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace('{location}', formData?.location.display_name)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },
    })
    .then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);
      OnGenerateTrip();
    });
  };

  return (
    <div className='px-5 mt-10 sm:px-10 md:px-32 lg:px-56 xl:px-72'>
    <h2 className="text-3xl font-bold text-center text-gray-800 sm:text-4xl sm:text-left">
        Share your ideal travel style and interests
    </h2>
    <p className="mt-3 text-base text-center text-gray-500 sm:text-lg sm:text-left">
      Tell us a few details and our AI will craft a personalized itinerary just for you.
    </p>

      <div className='flex flex-col gap-12 mt-16'>
        <div>
          <h2 className='mb-3 text-lg font-semibold text-gray-700 sm:text-xl'>Where would you like to explore next?</h2>
          <LocationSearchInput
            onSelect={(place) => {
              setPlace(place);
              handleInputChange('location', place);
            }}
          />
        </div>
        <div>
          <h2 className='mb-3 text-lg font-semibold text-gray-700 sm:text-xl'>Duration of your trip</h2>
          <Input placeholder={'For Example: 2'} type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>
        <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-700 sm:text-xl">
          What's your estimated budget?
        </h2>
          <div className='grid grid-cols-2 gap-5 mt-4 sm:grid-cols-3'>
            {SelectBudgetOptions.map((item, index) =>
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-5 rounded-xl border transition cursor-pointer bg-white hover:shadow-lg
                ${formData?.budget == item.title && 'shadow-lg border-blue-700'}
                `}>
                <h2 className='mb-2 text-3xl'>{item.icon}</h2>
                <h2 className='text-base font-semibold'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className='mb-3 text-lg font-semibold text-gray-700 sm:text-xl'>Who's Joining You on This Adventure?</h2>
          <div className='grid grid-cols-2 gap-5 mt-4 sm:grid-cols-3'>
            {SelectTravelesList.map((item, index) =>
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-5 rounded-xl border transition cursor-pointer bg-white hover:shadow-lg
                ${formData?.traveler == item.people && 'shadow-lg border-blue-700'}
                `}>
                <h2 className='mb-2 text-3xl'>{item.icon}</h2>
                <h2 className='text-base font-semibold'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='flex justify-end mt-12 mb-3'>
        <Button className='px-6 py-3 text-sm font-semibold text-white transition bg-blue-700 rounded-full shadow-md hover:bg-blue-700 sm:text-base disabled:opacity-60'
          disabled={loading}
          onClick={OnGenerateTrip}>
          {loading ?
            <FiLoader className='h-7 w-7 animate-spin' /> : 'Plan My Journey'
          }
        </Button>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center text-gray-800">Sign In Required</DialogTitle>

            <DialogDescription>
              <img src="/logo.png" width={200} />
              <h2 className='text-lg font-bold mt-7'>Sign In Required</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                disabled={loading}
                onClick={login}
                className="flex items-center w-full gap-4 mt-5">
                <FcGoogle className='h-9 w-9' />Continue with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
