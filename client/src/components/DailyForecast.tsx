import { useTheme } from "@/context/WeatherContext";
import WeatherIcon from "./WeatherIcon";
import { formatDate, formatTemp } from "@/utils/helpers";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Wind } from "lucide-react";
import type { DailyForecast as DailyForecastType } from "@/types/weather";

interface DailyForecastProps {
  forecast: DailyForecastType[];
}

const DailyForecast = ({ forecast }: DailyForecastProps) => {
  const { unit } = useTheme();
  
  // Display only the next 5 days
  const fiveDayForecast = forecast.slice(0, 5);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">5-Day Forecast</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {fiveDayForecast.map((day) => {
          const isCurrentDay = day.dt === forecast[0].dt;
          const dayTime = true; // For the icon, we'll always show day icon in forecast
          
          return (
            <Card 
              key={day.dt} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-transform hover:scale-105"
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {formatDate(day.dt, "day")}
                  </p>
                  <WeatherIcon 
                    code={day.weather[0].id} 
                    isDay={dayTime} 
                    size={32} 
                    className="mx-auto mb-3" 
                  />
                  <div className="flex justify-center space-x-3">
                    <span className="text-xl font-bold text-gray-800 dark:text-white">
                      {formatTemp(day.temp.max, unit)}
                    </span>
                    <span className="text-xl text-gray-500 dark:text-gray-400">
                      {formatTemp(day.temp.min, unit)}
                    </span>
                  </div>
                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-400 capitalize">
                    {day.weather[0].description}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-1 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-center">
                      <Droplets className="text-blue-500 mr-1 h-3 w-3" />
                      <span>{day.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <Wind className="text-blue-500 mr-1 h-3 w-3" />
                      <span>{Math.round(day.wind_speed)} m/s</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default DailyForecast;
