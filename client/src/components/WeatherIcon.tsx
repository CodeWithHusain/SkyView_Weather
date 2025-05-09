import { 
  CloudSun, 
  Cloud, 
  Sun, 
  Moon, 
  CloudMoon, 
  CloudRain, 
  CloudDrizzle,
  CloudSnow, 
  CloudFog, 
  CloudLightning,
  Zap
} from "lucide-react";

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  size?: number;
  className?: string;
}

const WeatherIcon = ({ code, isDay = true, size = 24, className = "" }: WeatherIconProps) => {
  // Weather condition codes: https://openweathermap.org/weather-conditions
  
  // Thunderstorm
  if (code >= 200 && code < 300) {
    return <CloudLightning size={size} className={`text-indigo-500 ${className}`} />;
  }
  
  // Drizzle
  if (code >= 300 && code < 400) {
    return <CloudDrizzle size={size} className={`text-blue-500 ${className}`} />;
  }
  
  // Rain
  if (code >= 500 && code < 600) {
    return <CloudRain size={size} className={`text-blue-500 ${className}`} />;
  }
  
  // Snow
  if (code >= 600 && code < 700) {
    return <CloudSnow size={size} className={`text-gray-300 ${className}`} />;
  }
  
  // Atmosphere (fog, mist, etc.)
  if (code >= 700 && code < 800) {
    return <CloudFog size={size} className={`text-gray-500 ${className}`} />;
  }
  
  // Clear sky
  if (code === 800) {
    return isDay 
      ? <Sun size={size} className={`text-yellow-500 ${className}`} />
      : <Moon size={size} className={`text-yellow-400 ${className}`} />;
  }
  
  // Few clouds
  if (code === 801) {
    return isDay 
      ? <CloudSun size={size} className={`text-yellow-500 ${className}`} />
      : <CloudMoon size={size} className={`text-gray-400 ${className}`} />;
  }
  
  // Clouds
  if (code > 801 && code < 900) {
    return <Cloud size={size} className={`text-gray-500 ${className}`} />;
  }
  
  // Extreme weather
  if (code >= 900) {
    return <Zap size={size} className={`text-yellow-600 ${className}`} />;
  }
  
  // Default
  return <Sun size={size} className={`text-yellow-500 ${className}`} />;
};

export default WeatherIcon;
