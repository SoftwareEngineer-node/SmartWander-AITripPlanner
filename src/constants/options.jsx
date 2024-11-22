export const SelectTravelesList = [
    {
        id: 1,
        title: "Solo Adventure",
        desc: "Embrace the journey on your own terms.",
        icon: <img src="https://em-content.zobj.net/source/apple/391/airplane_2708-fe0f.png" width={40}/>,
        people: "1 Traveler",
    },
    {
        id: 2,
        title: "Romantic Escape",
        desc: "Cherish unforgettable moments with your special someone.",
        icon: <img src="https://em-content.zobj.net/source/facebook/355/clinking-glasses_1f942.png" width={40}/>,
        people: "2 Travelers",
    },
    {
        id: 3,
        title: "Family Fun",
        desc: "Build lasting memories with your family.",
        icon: <img src="https://em-content.zobj.net/source/whatsapp/401/house-with-garden_1f3e1.png" width={40}/>,
        people: "3-5 Members",
    },
    {
        id: 4,
        title: "Group Adventure",
        desc: "Share the thrill with your friends.",
        icon: <img src="https://em-content.zobj.net/source/whatsapp/401/men-holding-hands_1f46c.png" width={40}/>,
        people: "6-10 Travelers",
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Budget-Friendly",
        desc: "Plan a trip that’s easy on your wallet.",
        icon: <img src="https://em-content.zobj.net/source/whatsapp/401/dollar-banknote_1f4b5.png" width={40}/>,
    },
    {
        id: 2,
        title: "Mid-Range",
        desc: "Enjoy a balance of comfort and value.",
        icon: <img src="https://em-content.zobj.net/source/facebook/355/money-bag_1f4b0.png" width={40}/>,
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Indulge in premium experiences without limits.",
        icon: <img src="https://em-content.zobj.net/source/huawei/375/gem-stone_1f48e.png" width={40}/>,
    },
];

export const AI_PROMPT='Generate Travel Plan For Location :{location}, for {totalDays} Days for {traveler} with a {budget}, give me Hotels options list with HotelName, HotelAddress, Price,HotelImageUrl, GeoCoordinates, rating, descriptions and suggest itinerary with placeName, PlaceDetails, PlaceImageUrl, GeoCoordinates, TicketPricing, TimeTravel each of the location for {totalDays} days with each day plan with best time to visit in JSON format'