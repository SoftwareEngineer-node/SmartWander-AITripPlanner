import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        {/* Overlay */}
        <div className="absolute inset-0 z-0 bg-black/60" />

        {/* Background and Content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6 px-4 bg-center bg-cover sm:px-6 md:px-10 lg:px-20"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        >
          <h1 className="text-3xl font-bold text-center text-white sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-[#f7f7f7]">
              Smart Trip Planning for Your Next Adventure<br />
            </span>
            <br className="hidden sm:block" />
            <span className="text-lg font-medium text-blue-200 md:text-xl">
              Let us guide you to your perfect destination with ease and expertise.
            </span>
          </h1>
          <p className="max-w-2xl text-base text-center text-white sm:text-lg md:text-xl">
            Your dedicated travel planner, crafting personalized itineraries that align with your interests and budget.
          </p>
          <Link to={'/create-trip'}>
            <Button className="px-6 py-3 text-lg font-semibold text-white transition bg-blue-700 rounded-full shadow-lg hover:bg-blue-700">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      {/* About Section */}
      <div className="flex flex-col items-center gap-8 px-4 py-8 bg-white md:px-12 lg:px-20">
        <h2 className="text-2xl font-bold text-center text-gray-800 md:text-4xl">About Our AI Trip Planner</h2>
        <p className="max-w-3xl text-sm text-center text-gray-600 md:text-lg">
          Welcome to a new era of travel planning! Our AI-powered platform simplifies your experience—personalized itineraries,
          hidden gems, and flexible options for solo or family trips.
        </p>
        <div className="flex flex-col w-full gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Discover Hidden Gems',
              desc: 'Explore destinations off the beaten path, curated to match your unique preferences.',
              icon: 'https://em-content.zobj.net/source/twitter/348/gem-stone_1f48e.png'
            },
            {
              title: 'Seamless Planning',
              desc: 'Let our AI handle the logistics while you focus on enjoying your trip.',
              icon: 'https://em-content.zobj.net/source/twitter/348/fountain-pen_1f58b-fe0f.png'
            },
            {
              title: 'Flexible Itineraries',
              desc: 'Easily adjust your plans on-the-go to suit changing moods and opportunities.',
              icon: 'https://em-content.zobj.net/source/apple/391/globe-showing-europe-africa_1f30d.png'
            },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <img src={item.icon} alt={item.title} className="w-10 h-10 mt-1 md:w-12 md:h-12" />
              <div>
                <h3 className="text-base font-semibold text-gray-700 md:text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 md:text-base">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <section className="px-4 py-8 bg-blue-50 md:px-12 lg:px-20">
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-800 md:text-4xl">Explore Beautiful Destinations</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  className="object-cover w-full h-36 md:h-56 lg:h-64"
                />
                <div className="absolute bottom-0 left-0 w-full px-3 py-1 text-sm font-medium text-white bg-black bg-opacity-50 md:text-base md:px-4 md:py-2">
                  {item.name}
                </div>
              </div>
            ))}
          </div>

        <div className="px-4 mt-20 text-center sm:px-6 lg:px-8">
          <h3 className="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl">
            Ready to Plan Your Perfect Trip?
          </h3>
          <p className="max-w-xl mx-auto mb-6 text-sm text-gray-600 sm:text-base">
            Let WanderWise help you design unforgettable journeys with just a few clicks.
          </p>
          <Link to="/create-trip">
            <Button className="px-6 py-3 text-base font-semibold text-white transition duration-200 bg-blue-700 rounded-full shadow-md sm:text-lg hover:bg-blue-700">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-6 mt-16 text-sm text-center text-gray-500 bg-white">
        <div className="flex items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} WanderWise – AI Trip Planner</span>
        </div>
      </footer>
    </>
  );
}

export default Hero;
