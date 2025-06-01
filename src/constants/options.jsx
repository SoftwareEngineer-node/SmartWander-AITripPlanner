import {
  FaPlaneDeparture,
  FaGlassCheers,
  FaHome,
  FaUsers,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
  FaGem
} from 'react-icons/fa';

export const SelectTravelesList = [
  {
    id: 1,
    title: "Solo Adventure",
    desc: "Embrace the journey on your own terms.",
    icon: <FaPlaneDeparture size={32} className="text-blue-700" />,
    people: "1 Traveler",
  },
  {
    id: 2,
    title: "Romantic Escape",
    desc: "Cherish unforgettable moments with your special someone.",
    icon: <FaGlassCheers size={32} className="text-blue-700" />,
    people: "2 Travelers",
  },
  {
    id: 3,
    title: "Family Fun",
    desc: "Build lasting memories with your family.",
    icon: <FaHome size={32} className="text-blue-700" />,
    people: "3-5 Members",
  },
  {
    id: 4,
    title: "Group Adventure",
    desc: "Share the thrill with your friends.",
    icon: <FaUsers size={32} className="text-blue-700" />,
    people: "6-10 Travelers",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Budget-Friendly",
    desc: "Plan a trip that’s easy on your wallet.",
    icon: <FaMoneyBillWave size={32} className="text-blue-700" />,
  },
  {
    id: 2,
    title: "Mid-Range",
    desc: "Enjoy a balance of comfort and value.",
    icon: <FaMoneyCheckAlt size={32} className="text-blue-700" />,
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Indulge in premium experiences without limits.",
    icon: <FaGem size={32} className="text-blue-700" />,
  },
];


export const AI_PROMPT='Generate Travel Plan For Location :{location}, for {totalDays} Days for {traveler} with a {budget}, give me Hotels options list with HotelName, HotelAddress, Price,HotelImageUrl, GeoCoordinates, rating, descriptions and suggest itinerary with placeName, PlaceDetails, PlaceImageUrl, GeoCoordinates, TicketPricing, TimeTravel each of the location for {totalDays} days with each day plan with best time to visit in JSON format'