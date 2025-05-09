import { useTheme } from "@/context/WeatherContext";
import { Card, CardContent } from "@/components/ui/card";
import WeatherIcon from "./WeatherIcon";
import { formatDate, formatTemp, isDay } from "@/utils/helpers";
import type { HourlyForecast as HourlyForecastType, CurrentWeather } from "@/types/weather";

interface HourlyForecastProps {
  hourly: HourlyForecastType[];
  current: CurrentWeather;
}

const HourlyForecast = ({ hourly, current }: HourlyForecastProps) => {
  const { unit } = useTheme();
  
  // Display the next 10 hours
  const nextHours = hourly.slice(0, 10);
  
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Today's Forecast</h2>
      
      <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <CardContent className="p-4 overflow-x-auto">
          <div className="flex space-x-6 min-w-max">
            {nextHours.map((hour, index) => {
              const hourTime = new Date(hour.dt * 1000);
              const hourLabel = index === 0 
                ? "Now" 
                : formatDate(hour.dt, "time");
              const dayTime = isDay({ 
                dt: hour.dt, 
                sunrise: current.sunrise, 
                sunset: current.sunset 
              });
              
              return (
                <div key={hour.dt} className="flex flex-col items-center p-2 min-w-[80px]">
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                    {hourLabel}
                  </span>
                  <WeatherIcon 
                    code={hour.weather[0].id} 
                    isDay={dayTime} 
                    size={28} 
                    className="my-2" 
                  />
                  <span className="text-lg font-bold text-gray-800 dark:text-white">
                    {formatTemp(hour.temp, unit)}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default HourlyForecast;
