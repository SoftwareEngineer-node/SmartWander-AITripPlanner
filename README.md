# WanderWise – AI-Powered Trip Planner

WanderWise is a smart and scalable AI-based travel planning application that automates the creation of personalized itineraries, hotel and food recommendations, and map-based visualizations. Built for modern travelers, it integrates seamlessly with AI and location-based APIs to generate accurate, curated travel experiences in seconds.

> From solo getaways to family vacations, WanderWise offers a complete trip planning solution in a clean, responsive, and engaging UI.

---

## 🔍 Overview

WanderWise leverages advanced technologies like the Gemini API, Firebase, and location services such as OpenStreetMap and Nominatim to plan trips end-to-end. It takes user preferences (like budget, number of travelers, and destination) and returns a detailed, AI-generated itinerary.

Key components:
- **AI-generated trip plan**
- **Real-time hotel recommendations**
- **Dynamic, day-wise itinerary**
- **Modern, mobile-first UI**
- **Secure Google login**
- **Trip history management**

---

## 🌐 Live Application

**URL**: [WanderWise](https://wander-wise-app.netlify.app/) 

---

## 📦 Tech Stack

### Frontend
- **React.js** with Vite
- **Tailwind CSS** for responsive styling
- **TypeScript** for code safety and scalability
- **ShadCN UI** components
- **Framer Motion** for smooth animations
- **Lucide-React** icons

### Backend Services & APIs
- **Firebase Authentication**: Secure Google Sign-in
- **Firebase Firestore**: Persistent trip data storage
- **Gemini API (by Google)**: AI-based travel content generation
- **Pexels API**: Destination and hotel image content
- **OpenStreetMap + Leaflet.js**: Free and responsive mapping
- **Nominatim API**: Free geocoding for location coordinates
- **LocationIQ / OpenCage**: Place search and autocomplete

---

## 📱 Features

- Google OAuth secure login (Firebase)
- Dynamic form to input travel parameters
- Gemini AI integration for itinerary generation
- Hotel listings with image, location, ratings, price
- Day-wise trip plan with maps, timings, and attractions
- Responsive UI optimized for all screen sizes
- Real-time geolocation detection
- Mobile-first layout with adapted cards and layouts
- Trip history with CRUD support using Firestore

---


## ⚙️ Environment Variables

To run this project, you’ll need the following variables in a `.env.local` file:

```env
VITE_LOCATIONIQ_API_KEY=your_locationiq_api_key_here

VITE_GGOGLE_GEMINI_AI_API_KEY=your_gemini_api_key_here
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id_here

VITE_PEXELS_API_KEY=your_pexels_api_key_here

VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_firebase_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id_here
```

## 🧾 Acknowledgements

- [Google Gemini API](https://deepmind.google/technologies/gemini/)
- [Firebase](https://firebase.google.com/)
- [Pexels API](https://www.pexels.com/api/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Nominatim](https://nominatim.org/)
- [LocationIQ](https://locationiq.com/)

