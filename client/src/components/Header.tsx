import { useState } from "react";
import { useTheme } from "@/context/WeatherContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CloudSun, Moon, Sun, Search, MapPin } from "lucide-react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onLocationRequest: () => void;
  isLoading: boolean;
}

const Header = ({ onSearch, onLocationRequest, isLoading }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 flex items-center">
          <CloudSun className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">SkyView Weather</h1>
        </div>
        
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="mr-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full md:w-64 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              />
            </div>
            <Button 
              type="submit" 
              className="ml-2 bg-primary hover:bg-blue-600 text-white"
              disabled={isLoading || !searchQuery.trim()}
            >
              Search
            </Button>
          </form>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onLocationRequest}
            disabled={isLoading}
            className="ml-2 p-2 rounded-full bg-primary text-white"
            aria-label="Use current location"
          >
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
