
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative">
      {/* Background shapes */}
      <div className="hero-shape-1 animate-float"></div>
      <div className="hero-shape-2 animate-float" style={{ animationDelay: "-3s" }}></div>
      
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid z-0"></div>
      
      <div className="z-10 text-center px-4">
        <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">404</h1>
        <p className="text-xl text-foreground mb-8 max-w-md">The page you're looking for doesn't exist or has been moved.</p>
        <Button asChild size="lg">
          <a href="/" className="inline-flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
