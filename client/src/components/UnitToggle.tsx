import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/WeatherContext";

const UnitToggle = () => {
  const { unit, toggleUnit } = useTheme();

  return (
    <div className="flex justify-end mb-4">
      <div className="bg-white dark:bg-gray-800 rounded-full p-1 inline-flex items-center border border-gray-200 dark:border-gray-700">
        <Button
          variant={unit === "celsius" ? "default" : "ghost"}
          className={`py-1 px-3 h-auto rounded-full ${
            unit === "celsius" 
              ? "bg-primary text-white" 
              : "text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => unit === "fahrenheit" && toggleUnit()}
        >
          °C
        </Button>
        <Button
          variant={unit === "fahrenheit" ? "default" : "ghost"}
          className={`py-1 px-3 h-auto rounded-full ${
            unit === "fahrenheit" 
              ? "bg-primary text-white" 
              : "text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => unit === "celsius" && toggleUnit()}
        >
          °F
        </Button>
      </div>
    </div>
  );
};

export default UnitToggle;
