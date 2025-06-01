import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate instead of useNavigation
import UserTripCardItem from './components/UserTripCardItem';

function History() {
  const navigate = useNavigate(); // ✅ correct hook
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/');
      return;
    }

    try {
      const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
      const querySnapshot = await getDocs(q);

      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ✅ include doc ID
        ...doc.data(),
      }));

      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching user trips:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='px-5 mt-10 sm:px-10 md:px-32 lg:px-56 xl:px-72'>
      <h2 className='text-3xl font-bold'>My Previous Trips</h2>

      <div className='grid grid-cols-2 gap-5 mt-10 md:grid-cols-3'>
        {!loading && userTrips.length > 0 ? (
          userTrips.map((trip, index) => (
            <UserTripCardItem trip={trip} key={trip.id || index} />
          ))
        ) : loading ? (
          [...Array(6)].map((_, index) => (
            <div key={index} className='h-[220px] w-full bg-slate-300 animate-pulse rounded-xl'></div>
          ))
        ) : (
          <div className="text-sm text-center text-gray-500 col-span-full">No previous trips found.</div>
        )}
      </div>
    </div>
  );
}

export default History;
