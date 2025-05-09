import { useTheme } from "@/context/WeatherContext";
import { Card, CardContent } from "@/components/ui/card";
import WeatherIcon from "./WeatherIcon";
import { 
  formatDate, 
  formatTemp, 
  formatWindSpeed, 
  formatVisibility, 
  formatPressure,
  getWeatherBackgroundImage,
  isDay
} from "@/utils/helpers";
import { Thermometer, Wind, Droplets, Eye, Sunrise, Sunset, Gauge, Sun } from "lucide-react";
import type { CurrentWeather as CurrentWeatherType, GeocodingResponse } from "@/types/weather";

interface CurrentWeatherProps {
  current: CurrentWeatherType;
  location: GeocodingResponse;
}

const CurrentWeather = ({ current, location }: CurrentWeatherProps) => {
  const { unit } = useTheme();
  const dayTime = isDay(current);
  
  // Default to a clear sky code if no weather data is available
  const weatherCode = current.weather && current.weather[0] ? current.weather[0].id : 800;
  const backgroundImage = getWeatherBackgroundImage(weatherCode, dayTime);
  
  const formattedDate = new Date(current.dt * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    hour: 'numeric',
    minute: '2-digit'
  });

  return (
    <section className="mb-8">
      <Card className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all">
        <div 
          className="h-48 bg-cover bg-center" 
          style={{ backgroundImage: backgroundImage }}
        ></div>
        
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {location.name}, {location.country}
                </h2>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{formattedDate}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-1 capitalize">{current.weather[0].description}</p>
            </div>
            
            <div className="flex items-center">
              <WeatherIcon code={current.weather[0].id} isDay={dayTime} size={40} className="mr-4" />
              <span className="text-5xl font-bold text-gray-800 dark:text-white">
                {formatTemp(current.temp, unit)}
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center">
                <Thermometer className="text-primary mr-2 h-5 w-5" />
                <span className="text-gray-700 dark:text-gray-300">Feels Like</span>
              </div>
              <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                {formatTemp(current.feels_like, unit)}
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center">
                <Wind className="text-primary mr-2 h-5 w-5" />
                <span className="text-gray-700 dark:text-gray-300">Wind</span>
              </div>
              <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                {formatWindSpeed(current.wind_speed, unit)}
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center">
                <Droplets className="text-primary mr-2 h-5 w-5" />
                <span className="text-gray-700 dark:text-gray-300">Humidity</span>
              </div>
              <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                {current.humidity}%
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center">
                <Eye className="text-primary mr-2 h-5 w-5" />
                <span className="text-gray-700 dark:text-gray-300">Visibility</span>
              </div>
              <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white">
                {formatVisibility(current.visibility)}
              </p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <span className="text-gray-600 dark:text-gray-400">Sunrise</span>
              <div className="flex items-center mt-1">
                <Sunrise className="text-yellow-500 mr-2 h-5 w-5" />
                <span className="font-medium text-gray-800 dark:text-white">
                  {formatDate(current.sunrise, "time")}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-gray-600 dark:text-gray-400">Sunset</span>
              <div className="flex items-center mt-1">
                <Sunset className="text-orange-500 mr-2 h-5 w-5" />
                <span className="font-medium text-gray-800 dark:text-white">
                  {formatDate(current.sunset, "time")}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-gray-600 dark:text-gray-400">Pressure</span>
              <div className="flex items-center mt-1">
                <Gauge className="text-primary mr-2 h-5 w-5" />
                <span className="font-medium text-gray-800 dark:text-white">
                  {formatPressure(current.pressure)}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-gray-600 dark:text-gray-400">UV Index</span>
              <div className="flex items-center mt-1">
                <Sun className="text-yellow-600 mr-2 h-5 w-5" />
                <span className="font-medium text-gray-800 dark:text-white">
                  {Math.round(current.uvi)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CurrentWeather;
