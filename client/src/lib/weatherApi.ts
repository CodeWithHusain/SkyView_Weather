import { apiRequest } from "./queryClient";
import type { GeocodingResponse, OneCallResponse } from "@/types/weather";

const API_KEY = "7dbde7bd3e6348debb6144801250905"; // This would come from environment variable in production

export async function searchLocation(query: string): Promise<GeocodingResponse[]> {
  const response = await apiRequest("GET", `/api/geocoding?q=${encodeURIComponent(query)}`);
  return response.json();
}

export async function getWeatherByCoordinates(lat: number, lon: number): Promise<OneCallResponse> {
  const response = await apiRequest("GET", `/api/weather?lat=${lat}&lon=${lon}`);
  return response.json();
}

export async function getWeatherByCity(city: string): Promise<{
  location: GeocodingResponse; 
  weather: OneCallResponse
}> {
  const locations = await searchLocation(city);
  
  if (!locations || locations.length === 0) {
    throw new Error(`Location not found: ${city}`);
  }
  
  const location = locations[0];
  const weather = await getWeatherByCoordinates(location.lat, location.lon);
  
  return { location, weather };
}
