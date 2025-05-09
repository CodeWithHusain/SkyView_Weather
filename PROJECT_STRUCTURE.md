# Project Structure

## Overview
This project is a full-stack weather application with a React TypeScript frontend and an Express.js backend. 

## Directory Structure

```
/
├── client/                   # Frontend code
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── context/          # React contexts
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility libraries
│   │   ├── pages/            # Page components
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Utility functions
│   │   ├── App.tsx           # Main App component
│   │   ├── index.css         # Global styles
│   │   └── main.tsx          # Entry point
│   └── index.html            # HTML template
│
├── server/                   # Backend code
│   ├── index.ts              # Server entry point
│   ├── routes.ts             # API routes
│   ├── storage.ts            # Data storage
│   └── vite.ts               # Vite server integration
│
├── shared/                   # Shared between frontend and backend
│   └── schema.ts             # Data models and schemas
│
├── components.json           # shadcn/ui components configuration
├── drizzle.config.ts         # Drizzle ORM configuration
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

## Key Components

### Frontend
- **App.tsx**: The root component that sets up routing and context providers
- **Weather.tsx**: The main page that displays weather information
- **WeatherContext.tsx**: Provides theme and unit conversion functionality
- **useWeather.ts**: Custom hook for fetching and managing weather data
- **weatherApi.ts**: Functions for interacting with the backend API
- **helpers.ts**: Utility functions for formatting data

### Backend
- **routes.ts**: Handles API routes for weather data and geocoding
- **storage.ts**: In-memory storage for caching weather data
- **schema.ts**: Defines the data models using Drizzle ORM

## Data Flow
1. User interacts with the UI (searches for a location or requests current location)
2. Frontend makes a request to the backend API
3. Backend checks the cache for recent data
4. If not in cache, backend fetches data from WeatherAPI.com
5. Data is transformed to match our expected format
6. Backend sends data to frontend
7. Frontend displays weather information

## Key Features
- Current weather conditions
- Hourly forecast
- 5-day forecast
- Location search
- Geolocation support
- Dark mode toggle
- Temperature unit toggle (Celsius/Fahrenheit)
- Responsive design
- Dynamic backgrounds based on weather conditions