export function formatDate(timestamp: number, format: "time" | "day" | "date" = "date"): string {
  const date = new Date(timestamp * 1000);
  
  if (format === "time") {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }).format(date);
  }
  
  if (format === "day") {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
    }
  }
  
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(date);
}

export function formatTemp(temp: number, unit: "celsius" | "fahrenheit"): string {
  if (unit === "fahrenheit") {
    temp = (temp * 9/5) + 32;
  }
  return `${Math.round(temp)}°`;
}

export function formatWindSpeed(speed: number, unit: "celsius" | "fahrenheit"): string {
  const value = Math.round(speed);
  return `${value} m/s`;
}

export function formatVisibility(visibility: number): string {
  return `${Math.round(visibility / 1000)} km`;
}

export function formatPressure(pressure: number): string {
  return `${pressure} hPa`;
}

export function getWeatherBackgroundImage(weatherCode: number, isDay: boolean): string {
  // Weather condition codes: https://openweathermap.org/weather-conditions
  // Group 2xx: Thunderstorm
  if (weatherCode >= 200 && weatherCode < 300) {
    return isDay 
      ? "url(https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1400&h=400)" 
      : "url(https://images.unsplash.com/photo-1461696114087-397271a7aedc?auto=format&fit=crop&w=1400&h=400)";
  }
  
  // Group 3xx: Drizzle and Group 5xx: Rain
  if ((weatherCode >= 300 && weatherCode < 400) || (weatherCode >= 500 && weatherCode < 600)) {
    return isDay
      ? "url(https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1400&h=400)"
      : "url(https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?auto=format&fit=crop&w=1400&h=400)";
  }
  
  // Group 6xx: Snow
  if (weatherCode >= 600 && weatherCode < 700) {
    return isDay
      ? "url(https://images.unsplash.com/photo-1477601263568-180e2c6d046e?auto=format&fit=crop&w=1400&h=400)"
      : "url(https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&w=1400&h=400)";
  }
  
  // Group 7xx: Atmosphere (fog, mist, etc.)
  if (weatherCode >= 700 && weatherCode < 800) {
    return isDay
      ? "url(https://images.unsplash.com/photo-1542272201-b1ca555f8505?auto=format&fit=crop&w=1400&h=400)"
      : "url(https://images.unsplash.com/photo-1635141879645-7f0b8b658b1b?auto=format&fit=crop&w=1400&h=400)";
  }
  
  // Group 800: Clear
  if (weatherCode === 800) {
    return isDay 
      ? "url(https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1400&h=400)" 
      : "url(https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&w=1400&h=400)";
  }
  
  // Group 80x: Clouds
  if (weatherCode > 800 && weatherCode < 900) {
    // Few clouds (801)
    if (weatherCode === 801) {
      return isDay
        ? "url(https://images.unsplash.com/photo-1525490829609-d166ddb58678?auto=format&fit=crop&w=1400&h=400)"
        : "url(https://images.unsplash.com/photo-1594156596782-656c93e4d504?auto=format&fit=crop&w=1400&h=400)";
    }
    
    // Scattered clouds (802)
    if (weatherCode === 802) {
      return isDay
        ? "url(https://images.unsplash.com/photo-1505533542167-8c89838bb19e?auto=format&fit=crop&w=1400&h=400)"
        : "url(https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=1400&h=400)";
    }
    
    // Broken or overcast clouds (803, 804)
    return isDay
      ? "url(https://images.unsplash.com/photo-1499956827185-0d63ee78a910?auto=format&fit=crop&w=1400&h=400)"
      : "url(https://images.unsplash.com/photo-1580193813605-a5c78074d0df?auto=format&fit=crop&w=1400&h=400)";
  }
  
  // Default - clear blue sky
  return isDay
    ? "url(https://images.unsplash.com/photo-1566159276594-2a2a33b834b0?auto=format&fit=crop&w=1400&h=400)"
    : "url(https://images.unsplash.com/photo-1532978379173-523e16f371f9?auto=format&fit=crop&w=1400&h=400)";
}

export function isDay(current: { dt: number; sunrise: number; sunset: number }): boolean {
  return current.dt > current.sunrise && current.dt < current.sunset;
}
