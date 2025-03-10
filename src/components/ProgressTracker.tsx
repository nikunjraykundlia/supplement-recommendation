
import { useState } from "react";
import { Calendar, LineChart, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for the current week's intake tracking
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const todayIndex = new Date().getDay() - 1; // 0 = Monday in our array
const mockIntakeData = weekDays.map((day, index) => ({
  day,
  morning: index <= todayIndex ? Math.random() > 0.2 : null,
  evening: index <= todayIndex ? Math.random() > 0.3 : null,
  isFuture: index > todayIndex,
  isToday: index === todayIndex
}));

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

const ProgressTracker = () => {
  const [intakeData, setIntakeData] = useState(mockIntakeData);
  
  const toggleIntake = (dayIndex: number, timeOfDay: 'morning' | 'evening') => {
    const newData = [...intakeData];
    const currentValue = newData[dayIndex][timeOfDay];
    
    // Only allow toggling if the day is not in the future
    if (!newData[dayIndex].isFuture) {
      // If null, set to true, if true, set to false, if false, set to true
      newData[dayIndex][timeOfDay] = currentValue === null ? true : !currentValue;
      setIntakeData(newData);
    }
  };
  
  // Calculate weekly compliance percentage
  const calculateCompliance = () => {
    let totalPossibleDoses = 0;
    let takenDoses = 0;
    
    intakeData.forEach(day => {
      if (!day.isFuture) {
        totalPossibleDoses += 2; // Morning and evening
        if (day.morning === true) takenDoses++;
        if (day.evening === true) takenDoses++;
      }
    });
    
    return totalPossibleDoses === 0 ? 0 : Math.round((takenDoses / totalPossibleDoses) * 100);
  };
  
  const compliancePercentage = calculateCompliance();
  
  return (
    <div className="bg-card p-6 rounded-xl border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Supplement Intake Tracker</h3>
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <Calendar className="h-4 w-4" />
          <span>This Week</span>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Weekly Compliance</span>
          <span className="text-sm font-medium">{compliancePercentage}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all-300 rounded-full"
            style={{ width: `${compliancePercentage}%` }}
          />
        </div>
      </div>
      
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
                      {day.day}
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
          <span>Tracking started on Monday</span>
        </div>
        <button className="text-primary hover:underline">
          View Full History
        </button>
      </div>
    </div>
  );
};

export default ProgressTracker;
