import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  unit: "celsius" | "fahrenheit";
  toggleUnit: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved preference
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    
    // Check for system preference if no saved preference
    if (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    
    return savedTheme || "light";
  });
  
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">(() => {
    const savedUnit = localStorage.getItem("unit");
    return (savedUnit === "fahrenheit") ? "fahrenheit" : "celsius";
  });

  // Apply theme class to html element
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
    
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  // Save unit preference
  useEffect(() => {
    localStorage.setItem("unit", unit);
  }, [unit]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };
  
  const toggleUnit = () => {
    setUnit(prevUnit => prevUnit === "celsius" ? "fahrenheit" : "celsius");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, unit, toggleUnit }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
