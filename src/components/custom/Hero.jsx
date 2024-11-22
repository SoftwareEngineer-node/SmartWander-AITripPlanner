import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="flex flex-col items-center justify-center h-screen gap-6 px-6 bg-center bg-cover md:px-12 lg:px-20"
        style={{
          backgroundImage: "url('/bg.jpg')", // Replace with your image path
        }}
      >
        <h1 className="font-extrabold text-[45px] text-center mt-16 text-white">
          <span className="text-black">Smart Trip Planning for Your Next Adventure:</span> <br />
          Let us guide you to your perfect destination with ease and expertise.
        </h1>
        <p className="max-w-3xl text-xl text-center text-gray-200">
          Your dedicated travel planner, crafting personalized itineraries that align with your interests and budget.
        </p>
        <Link to={'/create-trip'}>
          <Button className="px-6 py-3 text-lg font-medium bg-[#2e79d5] text-white hover:bg-[#1e5c9d] transition-all rounded-lg">
            Get Started
          </Button>
        </Link>
      </div>

      {/* About Section */}
      <div className="flex flex-col items-center gap-8 px-6 py-12 bg-white md:px-12 lg:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 md:text-4xl">About Our AI Trip Planner</h2>
        <p className="max-w-4xl text-lg text-center text-gray-600 md:text-xl">
          Welcome to a new era of travel planning! Our AI-powered platform is designed to simplify your trip planning experience.
          Whether you're dreaming of a solo backpacking adventure, a romantic getaway, or a family vacation, we provide personalized
          itineraries and recommendations tailored just for you.
        </p>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <img src="https://em-content.zobj.net/source/twitter/348/gem-stone_1f48e.png" alt="Destination" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Discover Hidden Gems</h3>
            <p className="text-gray-600">
              Explore destinations off the beaten path, curated to match your unique preferences.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src="https://em-content.zobj.net/source/twitter/348/fountain-pen_1f58b-fe0f.png" alt="Planning" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Seamless Planning</h3>
            <p className="text-gray-600">
              Let our AI handle the logistics while you focus on enjoying your trip.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src="https://em-content.zobj.net/source/apple/391/globe-showing-europe-africa_1f30d.png" alt="Explore" className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Flexible Itineraries</h3>
            <p className="text-gray-600">
              Easily adjust your plans on-the-go to suit changing moods and opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="px-6 py-12 bg-blue-50 md:px-12 lg:px-20">
        <h2 className="mb-10 text-3xl font-bold text-center text-gray-800 md:text-4xl">Explore Beautiful Destinations</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Paris, France', image: '/paris.jpg' },
            { name: 'Kyoto, Japan', image: '/kyoto.jpg' },
            { name: 'Santorini, Greece', image: '/santorini.jpg' },
            { name: 'Grand Canyon, USA', image: '/grand-canyon.jpg' },
            { name: 'Sydney, Australia', image: '/sydney.jpg' },
            { name: 'Cape Town, South Africa', image: '/cape-town.jpg' },
          ].map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden transition-all rounded-lg shadow-md hover:scale-105 hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-56 md:h-64 lg:h-72"
              />
              <div className="absolute bottom-0 left-0 w-full px-4 py-2 text-lg font-medium text-white bg-black bg-opacity-50">
                {item.name}
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-action within Gallery */}
        <div className="flex flex-col items-center justify-center gap-6 mt-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 md:text-4xl">Wanna Create Your Trip?</h2>
          <Link to={'/create-trip'}>
            <Button className="px-6 py-3 text-lg font-medium bg-[#2e79d5] text-white hover:bg-[#1e5c9d] transition-all rounded-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center text-center text-gray-500 bg-white">
          <p className="flex items-center gap-2 mt-2 text-sm">
            WanderWise - AI Trip Planner is build by Payal Sahu  <img src="https://em-content.zobj.net/source/twitter/348/camping_1f3d5-fe0f.png" width={20} />
          </p>
        </div>
      </footer>
    </>
  );
}

export default Hero;
