
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar } from "lucide-react";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { getWeeklyComplianceScore } from "@/lib/supabase";

const WeeklyCompliance = () => {
  const { user } = useAuth();
  const [complianceScore, setComplianceScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  const today = new Date();
  const startDate = startOfWeek(today, { weekStartsOn: 1 });
  const endDate = endOfWeek(today, { weekStartsOn: 1 });
  
  useEffect(() => {
    const fetchComplianceScore = async () => {
      try {
        if (user) {
          const startDateString = format(startDate, 'yyyy-MM-dd');
          const endDateString = format(endDate, 'yyyy-MM-dd');
          const score = await getWeeklyComplianceScore(user.id, startDateString, endDateString);
          setComplianceScore(score);
        } else {
          // If not logged in, use mock data
          setTimeout(() => {
            setComplianceScore(Math.floor(Math.random() * 41) + 60); // Random 60-100
          }, 500);
        }
      } catch (error) {
        console.error("Error fetching compliance score:", error);
        // Fallback to mock data on error
        setComplianceScore(85);
      } finally {
        setLoading(false);
      }
    };
    
    fetchComplianceScore();
  }, [user]);

  const getComplianceColorClass = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const getComplianceTextClass = (score: number) => {
    if (score >= 80) return "text-green-800";
    if (score >= 60) return "text-yellow-800";
    return "text-red-800";
  };
  
  const getComplianceMessage = (score: number) => {
    if (score >= 80) return "Great job! Keep it up!";
    if (score >= 60) return "Good progress! Try to be more consistent.";
    return "You need to improve your consistency.";
  };
  
  // Generate week day labels
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(startDate, i);
    return format(day, 'EEE');
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Weekly Compliance</CardTitle>
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <Calendar className="h-4 w-4" />
          <span>{format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}</span>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 animate-pulse">
            <div className="h-16 w-16 rounded-full bg-muted mb-4"></div>
            <div className="h-4 w-40 bg-muted rounded mb-2"></div>
            <div className="h-3 w-64 bg-muted rounded"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-muted"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={2 * Math.PI * 60 * (1 - (complianceScore || 0) / 100)}
                    className={cn("transition-all duration-1000", getComplianceColorClass(complianceScore || 0))}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{complianceScore}%</span>
                  <span className="text-xs opacity-70">Compliance</span>
                </div>
              </div>
            </div>
            
            <p className={cn(
              "text-center font-medium mb-6",
              getComplianceTextClass(complianceScore || 0)
            )}>
              {getComplianceMessage(complianceScore || 0)}
            </p>
            
            <div className="border-t pt-4">
              <div className="text-sm font-medium mb-2 flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>Daily Breakdown</span>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mt-4">
                {weekDays.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">{day}</div>
                    <div className={cn(
                      "h-8 rounded-md",
                      // Simulate a visual pattern
                      index === new Date().getDay() - 1 ? "bg-primary/70" : "bg-muted"
                    )}></div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyCompliance;
