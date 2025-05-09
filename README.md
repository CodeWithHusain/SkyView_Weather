# SkyView Weather App

A modern, responsive weather application built with React and TypeScript that provides real-time weather information.

## Features

- **Current Weather Display**: Shows temperature, feels like, humidity, wind speed, and more
- **Hourly Forecast**: View weather conditions for the next 10 hours
- **5-Day Forecast**: Plan ahead with a 5-day weather outlook
- **Location Search**: Search for weather in any location worldwide
- **Geolocation**: Get weather for your current location with one click
- **Dark Mode**: Toggle between light and dark themes
- **Unit Switching**: Toggle between Celsius and Fahrenheit
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Dynamic Backgrounds**: Background images change based on current weather conditions

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui
- **State Management**: React Context API, TanStack Query
- **Routing**: Wouter
- **API Integration**: Weather data from WeatherAPI.com
- **Backend**: Express.js with in-memory caching

## API

This project uses the WeatherAPI.com service to fetch weather data.

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/yourusername/skyview-weather.git
cd skyview-weather
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5000`

## Environment Variables

The following environment variables can be set:

- `WEATHER_API_KEY`: Your WeatherAPI.com API key

## Screenshots

![Weather App Screenshot](screenshots/weather-app.png)

## Author

Hussain
