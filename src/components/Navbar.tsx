import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const [hasCompletedAssessment, setHasCompletedAssessment] = useState(false);
  
  useEffect(() => {
    const lastAssessment = localStorage.getItem("lastAssessmentDate");
    setHasCompletedAssessment(!!lastAssessment);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard", authRequired: true, assessmentRequired: true },
    { name: "Track", path: "/track", authRequired: true, assessmentRequired: true },
  ];
  
  const filteredNavLinks = navLinks.filter(link => {
    if (link.authRequired && !user) return false;
    if (link.assessmentRequired && !hasCompletedAssessment) return false;
    return true;
  });

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "py-2 shadow-md bg-background/90 backdrop-blur-md" : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <Logo size={isScrolled ? "sm" : "md"} type="full" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "font-medium hover:text-primary transition-colors",
                  location.pathname === link.path ? "text-primary" : "text-foreground/80"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {user && (
              <Link to="/assessment">
                <Button variant="default" size="sm">
                  {hasCompletedAssessment ? "Re-take Assessment" : "Take Assessment"}
                </Button>
              </Link>
            )}
            
            {user ? (
              <UserAvatar size="md" showMenu={true} onSignOut={signOut} />
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          <div className="flex items-center md:hidden gap-2">
            {user && <UserAvatar size="sm" showMenu={false} />}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2 focus:outline-none"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background md:hidden transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 py-20">
          <nav className="flex flex-col space-y-6">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xl font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {user && (
              <Link 
                to="/assessment"
                className="text-xl font-medium text-primary hover:opacity-80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {hasCompletedAssessment ? "Re-take Assessment" : "Take Assessment"}
              </Link>
            )}
            
            {!user ? (
              <div className="flex flex-col space-y-4 pt-4 border-t border-border">
                <Link
                  to="/login"
                  className="text-xl font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="text-xl font-medium text-primary hover:opacity-80 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="text-xl font-medium text-destructive hover:opacity-80 transition-colors pt-4 text-left border-t border-border"
              >
                Sign Out
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
