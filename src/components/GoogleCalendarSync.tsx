
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";

const GoogleCalendarSync = () => {
  const handleGoogleAuth = async () => {
    try {
      // Google OAuth flow will be implemented here
      toast.info("Google Calendar integration will be available soon!");
    } catch (error) {
      console.error('Google Calendar sync error:', error);
      toast.error("Failed to connect to Google Calendar");
    }
  };

  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2" 
      onClick={handleGoogleAuth}
    >
      <Calendar className="h-4 w-4" />
      Connect Google Calendar
    </Button>
  );
};

export default GoogleCalendarSync;
