import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, addDays, subDays, subWeeks } from "date-fns";
import { Calendar, Clock, ArrowRight, LineChart, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CalendarView from "@/components/CalendarView";
import { getUserSupplements, getSupplementsByIds, recordSupplementIntake, getCompletedDates, calculateWeeklyAssessmentScore } from "@/lib/ai-recommender";
import { Supplement } from "@/lib/supplements";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import GoogleCalendarSync from './GoogleCalendarSync';

// Define WeekDay interface for tracking intake
interface WeekDay {
  date: Date;
  day: string;
  morning: boolean | null;
  evening: boolean | null;
  isFuture: boolean;
  isToday: boolean;
}

interface IntakeButtonProps {
  taken: boolean | null;
  disabled?: boolean;
  onClick: () => void;
}

const IntakeButton = ({ taken, disabled = false, onClick }: IntakeButtonProps) => (
  <button
    className={cn(
      "w-8 h-8 rounded-full flex items-center justify-center transition-all-200",
      taken === true && "bg-primary/20 text-primary",
      taken === false && "bg-destructive/20 text-destructive",
      taken === null && "bg-muted text-muted-foreground",
      disabled ? "opacity-50 cursor-not-allowed" : "hover:ring-1 hover:ring-primary/50"
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {taken === true && <Check className="w-4 h-4" />}
    {taken === false && <X className="w-4 h-4" />}
    {taken === null && "-"}
  </button>
);

const CombinedTracker = () => {
  const [intakeData, setIntakeData] = useState<WeekDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [markedDates, setMarkedDates] = useState<Date[]>([]);
  const [userSupplements, setUserSupplements] = useState<Supplement[]>([]);
  const [complianceScore, setComplianceScore] = useState<number>(0);
  
  // Initialize data on component mount
  useEffect(() => {
    loadUserSupplements();
    loadWeekData();
    loadCompletedDates();
    calculateScore();
  }, []);
  
  // Load user's supplements
  const loadUserSupplements = () => {
    const supplementIds = getUserSupplements();
    const supplements = getSupplementsByIds(supplementIds);
    setUserSupplements(supplements);
  };
  
  // Calculate and set the weekly assessment score
  const calculateScore = () => {
    const score = calculateWeeklyAssessmentScore();
    setComplianceScore(score);
  };
  
  // Load the week's intake data
  const loadWeekData = () => {
    // Get the start of the week (Monday)
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const startOfWeek = subDays(today, dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    
    const weekdays: WeekDay[] = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(startOfWeek, i);
      const dayName = format(date, 'EEE');
      const isToday = isSameDay(date, today);
      const isFuture = date > today;
      
      // Get saved intake data from localStorage
      let morning: boolean | null = null;
      let evening: boolean | null = null;
      
      const supplementIds = getUserSupplements();
      const dateString = format(date, 'yyyy-MM-dd');
      
      // Check localStorage for intake records
      const records = localStorage.getItem("supplementIntakeRecords");
      if (records) {
        const parsedRecords = JSON.parse(records);
        
        // For simplicity, consider all supplements marked as taken if any is recorded as taken
        const morningRecord = parsedRecords.find((r: any) => 
          r.date === dateString && r.timeOfDay === 'morning' && supplementIds.includes(r.supplementId)
        );
        
        const eveningRecord = parsedRecords.find((r: any) => 
          r.date === dateString && r.timeOfDay === 'evening' && supplementIds.includes(r.supplementId)
        );
        
        morning = morningRecord ? morningRecord.taken : null;
        evening = eveningRecord ? eveningRecord.taken : null;
      }
      
      return {
        date,
        day: dayName,
        morning,
        evening,
        isFuture,
        isToday
      };
    });
    
    setIntakeData(weekdays);
  };
  
  // Load dates where all supplements were taken
  const loadCompletedDates = () => {
    const completedDates = getCompletedDates();
    setMarkedDates(completedDates);
  };
  
  // Toggle intake status for a day and time
  const toggleIntake = (dayIndex: number, timeOfDay: 'morning' | 'evening') => {
    const newData = [...intakeData];
    const currentValue = newData[dayIndex][timeOfDay];
    const day = newData[dayIndex];
    
    // Only allow toggling if the day is not in the future
    if (!day.isFuture) {
      // If null, set to true, if true, set to false, if false, set to true
      const newValue = currentValue === null ? true : !currentValue;
      newData[dayIndex][timeOfDay] = newValue;
      setIntakeData(newData);
      
      // Save to localStorage for each supplement
      const supplementIds = getUserSupplements();
      const dateString = format(day.date, 'yyyy-MM-dd');
      
      supplementIds.forEach(supplementId => {
        recordSupplementIntake(supplementId, dateString, newValue, timeOfDay);
      });
      
      // Update marked dates
      loadCompletedDates();
      
      // Recalculate compliance score
      calculateScore();
      
      // Show toast notification
      toast.success(`${format(day.date, 'EEE')} ${timeOfDay} supplements marked as ${newValue ? 'taken' : 'not taken'}`);
    }
  };
  
  // Handle selecting a date on the calendar
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    
    // Update the selected date's intake status in the calendar
    const dateString = format(date, 'yyyy-MM-dd');
    const supplementIds = getUserSupplements();
    
    // Check if this date is already marked
    const isMarked = markedDates.some(d => isSameDay(d, date));
    
    if (!isMarked) {
      // Mark all supplements as taken for this date
      supplementIds.forEach(supplementId => {
        recordSupplementIntake(supplementId, dateString, true, 'morning');
        recordSupplementIntake(supplementId, dateString, true, 'evening');
      });
      
      // Update marked dates
      loadCompletedDates();
      
      // Update week data if the selected date is in the current week
      const today = new Date();
      const startOfWeek = subWeeks(today, 0);
      const endOfWeek = addDays(startOfWeek, 6);
      
      if (date >= startOfWeek && date <= endOfWeek) {
        loadWeekData();
      }
      
      // Recalculate compliance score
      calculateScore();
      
      toast.success(`${format(date, 'MMM d')} marked as completed`);
    } else {
      // Unmark this date
      supplementIds.forEach(supplementId => {
        recordSupplementIntake(supplementId, dateString, false, 'morning');
        recordSupplementIntake(supplementId, dateString, false, 'evening');
      });
      
      // Update marked dates
      loadCompletedDates();
      
      // Update week data if the selected date is in the current week
      const today = new Date();
      const startOfWeek = subWeeks(today, 0);
      const endOfWeek = addDays(startOfWeek, 6);
      
      if (date >= startOfWeek && date <= endOfWeek) {
        loadWeekData();
      }
      
      // Recalculate compliance score
      calculateScore();
      
      toast.success(`${format(date, 'MMM d')} marked as incomplete`);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Weekly Assessment Score */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">Weekly Compliance Score</CardTitle>
          <div className="text-lg font-semibold">{complianceScore}%</div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={complianceScore} className="h-2.5" />
            <p className="text-sm text-muted-foreground">
              {complianceScore >= 80 
                ? "Excellent! You're staying consistent with your supplement routine."
                : complianceScore >= 50
                ? "Good progress. Keep working on consistency."
                : "You're just getting started. Try to be more consistent with your supplements."}
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Supplement Intake Tracker */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">Daily Supplement Tracker</CardTitle>
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <Calendar className="h-4 w-4" />
            <span>This Week</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] text-sm">
              <thead>
                <tr>
                  <th className="pb-3 text-left font-medium text-foreground/70">Day</th>
                  <th className="pb-3 text-center font-medium text-foreground/70">Morning</th>
                  <th className="pb-3 text-center font-medium text-foreground/70">Evening</th>
                </tr>
              </thead>
              <tbody>
                {intakeData.map((day, index) => (
                  <tr key={day.day} className={day.isToday ? "bg-accent/20" : ""}>
                    <td className="py-3 pl-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className={cn(
                            "w-2 h-2 rounded-full",
                            day.isToday ? "bg-primary" : "bg-transparent"
                          )}
                        />
                        <span className={cn(
                          day.isToday ? "font-medium" : "",
                          day.isFuture ? "text-foreground/50" : ""
                        )}>
                          {day.day} {format(day.date, 'M/d')}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex justify-center">
                        <IntakeButton 
                          taken={day.morning} 
                          disabled={day.isFuture}
                          onClick={() => toggleIntake(index, 'morning')}
                        />
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex justify-center">
                        <IntakeButton 
                          taken={day.evening} 
                          disabled={day.isFuture}
                          onClick={() => toggleIntake(index, 'evening')}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex items-center justify-between text-xs text-foreground/70">
            <div className="flex items-center gap-1">
              <LineChart className="h-3 w-3" />
              <span>Tracking started when you first took the assessment</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Monthly Calendar View</h3>
          <GoogleCalendarSync />
        </div>
        
        <p className="text-sm text-foreground/70 mb-4">
          Green dots indicate days when you've taken all your supplements. Click on a date to view or update your intake.
        </p>
        <CalendarView 
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          markedDates={markedDates}
          className="bg-card border border-border rounded-xl p-4"
        />
        
        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
          <h4 className="font-medium mb-2">
            {format(selectedDate, 'MMMM d, yyyy')} - Supplement Details
          </h4>
          <div className="text-sm">
            {markedDates.some(d => isSameDay(d, selectedDate)) ? (
              <div className="text-green-600 flex items-center">
                <Check className="w-4 h-4 mr-2" />
                All supplements taken for this day
              </div>
            ) : (
              <div className="text-amber-500">
                No records found for this day. Click on the date in the calendar to mark as taken.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedTracker;
