import { useEffect } from "react";
import { useWeather } from "@/hooks/useWeather";
import Header from "@/components/Header";
import UnitToggle from "@/components/UnitToggle";
import CurrentWeather from "@/components/CurrentWeather";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";
import LoadingOverlay from "@/components/LoadingOverlay";
import ErrorMessage from "@/components/ErrorMessage";
import Footer from "@/components/Footer";

const Weather = () => {
  const { 
    weatherData, 
    location, 
    isLoading, 
    isError, 
    error, 
    searchByCity, 
    getCurrentLocation,
    refetchWeather
  } = useWeather();

  // Attempt to get user's location on initial load
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleSearch = (query: string) => {
    searchByCity(query);
  };

  const handleLocationRequest = () => {
    getCurrentLocation();
  };

  const errorMessage = error instanceof Error ? error.message : "Failed to fetch weather data";

  return (
    <div className="font-sans bg-gradient-to-br from-blue-50 to-blue-100 dark:from-darkBg dark:to-gray-800 min-h-screen transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header 
          onSearch={handleSearch}
          onLocationRequest={handleLocationRequest}
          isLoading={isLoading}
        />
        
        <UnitToggle />
        
        {isError && (
          <ErrorMessage message={errorMessage} onRetry={refetchWeather} />
        )}
        
        {weatherData && location && (
          <>
            <CurrentWeather current={weatherData.current} location={location} />
            <DailyForecast forecast={weatherData.daily} />
            <HourlyForecast hourly={weatherData.hourly} current={weatherData.current} />
          </>
        )}
        
        <Footer />
      </div>
      
      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
};

export default Weather;
