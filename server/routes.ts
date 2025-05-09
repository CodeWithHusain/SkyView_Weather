import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";

const API_KEY = process.env.WEATHER_API_KEY || "7dbde7bd3e6348debb6144801250905";
const WEATHER_API_BASE_URL = "http://api.weatherapi.com/v1";

export async function registerRoutes(app: Express): Promise<Server> {
  // Geocoding API endpoint
  app.get("/api/geocoding", async (req, res) => {
    try {
      const query = req.query.q as string;
      
      if (!query) {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
      }
      
      // Search for location
      const response = await fetch(`${WEATHER_API_BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`WeatherAPI error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Transform the data to match our expected format
      const transformedData = Array.isArray(data) ? data.map(location => ({
        name: location.name,
        lat: location.lat,
        lon: location.lon,
        country: location.country
      })) : [];
      
      // Save search to history
      if (transformedData.length > 0) {
        await storage.addSearchHistory({ query });
      }
      
      return res.json(transformedData);
    } catch (error) {
      console.error("Geocoding error:", error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to get location data" 
      });
    }
  });
  
  // Reverse geocoding API endpoint
  app.get("/api/reverse-geocoding", async (req, res) => {
    try {
      const { lat, lon } = req.query;
      
      if (!lat || !lon) {
        return res.status(400).json({ message: "Parameters 'lat' and 'lon' are required" });
      }
      
      // Get location data from coordinates
      const response = await fetch(`${WEATHER_API_BASE_URL}/search.json?key=${API_KEY}&q=${lat},${lon}`);
      
      if (!response.ok) {
        throw new Error(`WeatherAPI error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Transform the data to match our expected format
      const transformedData = Array.isArray(data) ? data.map(location => ({
        name: location.name,
        lat: parseFloat(location.lat),
        lon: parseFloat(location.lon),
        country: location.country
      })) : [];
      
      return res.json(transformedData);
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to get location data" 
      });
    }
  });
  
  // Weather API endpoint
  app.get("/api/weather", async (req, res) => {
    try {
      const { lat, lon } = req.query;
      
      if (!lat || !lon) {
        return res.status(400).json({ message: "Parameters 'lat' and 'lon' are required" });
      }
      
      // Check cache first
      const cachedData = await storage.getWeatherCache(lat as string, lon as string);
      
      if (cachedData) {
        // If cache is less than 30 minutes old, return it
        const cacheTime = new Date(cachedData.createdAt).getTime();
        const now = new Date().getTime();
        const cacheAge = (now - cacheTime) / 1000 / 60; // in minutes
        
        if (cacheAge < 30) {
          return res.json(cachedData.data);
        }
      }
      
      // Get forecast data (includes current weather, hourly and daily forecast)
      const response = await fetch(
        `${WEATHER_API_BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no&alerts=yes`
      );
      
      if (!response.ok) {
        throw new Error(`WeatherAPI error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Transform the API response to match our OneCallResponse format
      const transformedData = {
        lat: parseFloat(lat as string),
        lon: parseFloat(lon as string),
        timezone: data.location.tz_id,
        timezone_offset: 0, // WeatherAPI doesn't provide this directly
        current: {
          dt: Math.floor(new Date(data.current.last_updated_epoch * 1000).getTime() / 1000),
          sunrise: Math.floor(new Date(data.forecast.forecastday[0].astro.sunrise).getTime() / 1000),
          sunset: Math.floor(new Date(data.forecast.forecastday[0].astro.sunset).getTime() / 1000),
          temp: data.current.temp_c,
          feels_like: data.current.feelslike_c,
          pressure: data.current.pressure_mb,
          humidity: data.current.humidity,
          dew_point: 0, // Not directly provided by WeatherAPI
          uvi: data.current.uv,
          clouds: data.current.cloud,
          visibility: data.current.vis_km * 1000, // Convert to meters
          wind_speed: data.current.wind_kph / 3.6, // Convert km/h to m/s
          wind_deg: data.current.wind_degree,
          weather: [
            {
              id: data.current.condition.code,
              main: data.current.condition.text,
              description: data.current.condition.text,
              icon: data.current.condition.icon
            }
          ]
        },
        hourly: data.forecast.forecastday.flatMap((day: any) => 
          day.hour.map((hour: any) => ({
            dt: Math.floor(new Date(hour.time_epoch * 1000).getTime() / 1000),
            temp: hour.temp_c,
            feels_like: hour.feelslike_c,
            pressure: hour.pressure_mb,
            humidity: hour.humidity,
            dew_point: 0,
            uvi: hour.uv,
            clouds: hour.cloud,
            visibility: hour.vis_km * 1000,
            wind_speed: hour.wind_kph / 3.6,
            wind_deg: hour.wind_degree,
            weather: [
              {
                id: hour.condition.code,
                main: hour.condition.text,
                description: hour.condition.text,
                icon: hour.condition.icon
              }
            ],
            pop: hour.chance_of_rain / 100
          }))
        ),
        daily: data.forecast.forecastday.map((day: any) => ({
          dt: Math.floor(new Date(day.date_epoch * 1000).getTime() / 1000),
          sunrise: Math.floor(new Date(`${day.date} ${day.astro.sunrise}`).getTime() / 1000),
          sunset: Math.floor(new Date(`${day.date} ${day.astro.sunset}`).getTime() / 1000),
          moonrise: Math.floor(new Date(`${day.date} ${day.astro.moonrise}`).getTime() / 1000),
          moonset: Math.floor(new Date(`${day.date} ${day.astro.moonset}`).getTime() / 1000),
          moon_phase: 0, // Not directly provided
          temp: {
            day: day.day.avgtemp_c,
            min: day.day.mintemp_c,
            max: day.day.maxtemp_c,
            night: day.hour[23].temp_c,
            eve: day.hour[18].temp_c, 
            morn: day.hour[6].temp_c
          },
          feels_like: {
            day: day.day.avgtemp_c,
            night: day.hour[23].feelslike_c,
            eve: day.hour[18].feelslike_c,
            morn: day.hour[6].feelslike_c
          },
          pressure: day.hour[12].pressure_mb,
          humidity: day.day.avghumidity,
          dew_point: 0,
          wind_speed: day.day.maxwind_kph / 3.6,
          wind_deg: day.hour[12].wind_degree,
          weather: [
            {
              id: day.day.condition.code,
              main: day.day.condition.text,
              description: day.day.condition.text,
              icon: day.day.condition.icon
            }
          ],
          clouds: day.hour[12].cloud,
          pop: day.day.daily_chance_of_rain / 100,
          rain: day.day.totalprecip_mm,
          uvi: day.day.uv
        }))
      };
      
      // Cache the transformed data
      await storage.addWeatherCache({
        latitude: lat as string,
        longitude: lon as string,
        location: `${lat},${lon}`,
        data: transformedData
      });
      
      return res.json(transformedData);
    } catch (error) {
      console.error("Weather API error:", error);
      return res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to get weather data" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
