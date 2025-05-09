import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <Alert variant="destructive" className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 mr-3" />
        <AlertTitle>Error</AlertTitle>
      </div>
      <AlertDescription className="mt-2">
        {message || "Unable to fetch weather data. Please check your connection and try again."}
      </AlertDescription>
      <Button 
        variant="outline" 
        className="mt-2 text-sm font-medium text-red-700 hover:text-red-900"
        onClick={onRetry}
      >
        Try Again
      </Button>
    </Alert>
  );
};

export default ErrorMessage;
