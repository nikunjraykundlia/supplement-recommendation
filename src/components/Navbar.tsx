
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm py-3" 
        : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size={isScrolled ? "sm" : "md"} />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/")
                  ? "text-logo-magenta dark:text-logo-magenta"
                  : "text-gray-700 dark:text-gray-300 hover:text-logo-purple dark:hover:text-logo-purple"
              )}
            >
              Home
            </Link>
            <Link 
              to="/assessment" 
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/assessment")
                  ? "text-logo-magenta dark:text-logo-magenta"
                  : "text-gray-700 dark:text-gray-300 hover:text-logo-purple dark:hover:text-logo-purple"
              )}
            >
              Assessment
            </Link>
            {user && (
              <>
                <Link 
                  to="/results" 
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive("/results")
                      ? "text-logo-magenta dark:text-logo-magenta"
                      : "text-gray-700 dark:text-gray-300 hover:text-logo-purple dark:hover:text-logo-purple"
                  )}
                >
                  Results
                </Link>
                <Link 
                  to="/dashboard" 
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive("/dashboard")
                      ? "text-logo-magenta dark:text-logo-magenta"
                      : "text-gray-700 dark:text-gray-300 hover:text-logo-purple dark:hover:text-logo-purple"
                  )}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/track" 
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive("/track")
                      ? "text-logo-magenta dark:text-logo-magenta"
                      : "text-gray-700 dark:text-gray-300 hover:text-logo-purple dark:hover:text-logo-purple"
                  )}
                >
                  Track
                </Link>
              </>
            )}
          </nav>
          
          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="w-8 h-8 rounded-full bg-logo-gradient flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U"}
                      </span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/track" className="cursor-pointer">Track Progress</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gray-700 dark:text-gray-300">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-logo-gradient hover:opacity-90 text-white border-none">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium",
                  isActive("/")
                    ? "bg-gray-50 dark:bg-gray-800 text-logo-magenta dark:text-logo-magenta"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                Home
              </Link>
              <Link 
                to="/assessment" 
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium",
                  isActive("/assessment")
                    ? "bg-gray-50 dark:bg-gray-800 text-logo-magenta dark:text-logo-magenta"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                Assessment
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/results" 
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium",
                      isActive("/results")
                        ? "bg-gray-50 dark:bg-gray-800 text-logo-magenta dark:text-logo-magenta"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                  >
                    Results
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium",
                      isActive("/dashboard")
                        ? "bg-gray-50 dark:bg-gray-800 text-logo-magenta dark:text-logo-magenta"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/track" 
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium",
                      isActive("/track")
                        ? "bg-gray-50 dark:bg-gray-800 text-logo-magenta dark:text-logo-magenta"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                  >
                    Track
                  </Link>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/login">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full bg-logo-gradient hover:opacity-90 text-white border-none">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
              
              {user && (
                <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-logo-gradient flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U"}
                      </span>
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">
                      {user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"}
                    </span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 mt-2"
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
