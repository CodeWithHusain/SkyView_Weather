import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getWeatherByCoordinates, getWeatherByCity } from "@/lib/weatherApi";
import type { GeocodingResponse, OneCallResponse } from "@/types/weather";
import { useToast } from "@/hooks/use-toast";

export function useWeather() {
  const [location, setLocation] = useState<GeocodingResponse | null>(null);
  const { toast } = useToast();
  
  // Fetch weather for current coordinates
  const fetchWeatherByGeolocation = async () => {
    return new Promise<{coords: {latitude: number, longitude: number}}>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    })
    .then(async (position) => {
      const { latitude, longitude } = position.coords;
      
      // Get reverse geocoding data (city name)
      const response = await fetch(`/api/reverse-geocoding?lat=${latitude}&lon=${longitude}`);
      const locationData: GeocodingResponse[] = await response.json();
      
      if (locationData && locationData.length > 0) {
        setLocation(locationData[0]);
      }
      
      // Get weather data
      return getWeatherByCoordinates(latitude, longitude);
    });
  };
  
  // Query for weather data
  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
    error: weatherError,
    refetch: refetchWeather
  } = useQuery<OneCallResponse>({
    queryKey: ["weather", location?.lat, location?.lon],
    enabled: !!location,
    queryFn: () => {
      if (!location) throw new Error("No location set");
      return getWeatherByCoordinates(location.lat, location.lon);
    }
  });

  // Mutation for searching by city
  const {
    mutate: searchByCity,
    isPending: isSearching
  } = useMutation({
    mutationFn: async (city: string) => {
      try {
        const { location: newLocation, weather } = await getWeatherByCity(city);
        setLocation(newLocation);
        return weather;
      } catch (error) {
        throw error;
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to search location",
        variant: "destructive"
      });
    }
  });

  // Mutation for getting current location
  const {
    mutate: getCurrentLocation,
    isPending: isGettingCurrentLocation
  } = useMutation({
    mutationFn: fetchWeatherByGeolocation,
    onError: (error) => {
      toast({
        title: "Location Error",
        description: error instanceof Error 
          ? error.message 
          : "Failed to get your current location. Please ensure location access is enabled.",
        variant: "destructive"
      });
    }
  });

  // Check if any operation is loading
  const isLoading = isWeatherLoading || isSearching || isGettingCurrentLocation;

  return {
    weatherData,
    location,
    isLoading,
    isError: isWeatherError,
    error: weatherError,
    searchByCity,
    getCurrentLocation,
    refetchWeather
  };
}
