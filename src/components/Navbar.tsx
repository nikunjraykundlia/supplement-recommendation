
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Assessment", path: "/assessment" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Track", path: "/track" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all-300",
        scrolled || isOpen || location.pathname !== "/" 
          ? "glass-effect border-b border-border/50" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">W</span>
            </span>
            <span className="font-display font-medium text-xl">Wellness Architect</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-base font-medium transition-all-200 hover:text-primary",
                  location.pathname === link.path 
                    ? "text-primary" 
                    : "text-foreground/80"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden absolute w-full left-0 glass-effect border-b border-border/50 transition-all-300",
          isOpen ? "max-h-96 py-4" : "max-h-0 overflow-hidden py-0"
        )}
      >
        <nav className="flex flex-col space-y-4 px-4 sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-base font-medium py-2 transition-all-200 hover:text-primary",
                location.pathname === link.path 
                  ? "text-primary" 
                  : "text-foreground/80"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
