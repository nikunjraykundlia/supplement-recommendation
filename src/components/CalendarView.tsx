
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";

// Example supplement intake data (in a real app, this would come from Supabase)
// Format: Array of objects with date and status (taken or missed)
type IntakeRecord = {
  date: Date;
  morning: boolean;
  evening: boolean;
};

// Mock data for demonstration - this would come from the database in a real implementation
const mockIntakeData: IntakeRecord[] = [
  ...[...Array(30)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: new Date(date),
      morning: Math.random() > 0.3,
      evening: Math.random() > 0.35
    };
  })
];

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDayData, setSelectedDayData] = useState<IntakeRecord | null>(null);

  // Function to determine the CSS classes for a specific day in the calendar
  const getDayClassNames = (day: Date) => {
    const intakeRecord = mockIntakeData.find(record => 
      isSameDay(new Date(record.date), day)
    );

    if (!intakeRecord) return "";

    // Both morning and evening taken
    if (intakeRecord.morning && intakeRecord.evening) {
      return "bg-green-500/20 text-green-700 font-medium rounded-full";
    }
    // Only one of morning or evening taken
    else if (intakeRecord.morning || intakeRecord.evening) {
      return "bg-yellow-500/20 text-yellow-700 font-medium rounded-full";
    }
    // Neither taken
    else {
      return "bg-red-500/20 text-red-700 font-medium rounded-full";
    }
  };

  const handleDayClick = (day: Date | undefined) => {
    if (!day) return;
    
    setDate(day);
    
    // Find the intake record for the selected day
    const intakeRecord = mockIntakeData.find(record => 
      isSameDay(new Date(record.date), day)
    );
    
    setSelectedDayData(intakeRecord || null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Supplement Intake Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
          <div className="md:col-span-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDayClick}
              className={cn("p-3 pointer-events-auto")}
              modifiersClassNames={{
                selected: "bg-primary text-primary-foreground",
              }}
              modifiers={{
                customModifier: (date) => mockIntakeData.some(record => 
                  isSameDay(new Date(record.date), date)
                ),
              }}
              components={{
                Day: ({ date: dayDate, ...props }) => {
                  const customClasses = getDayClassNames(dayDate);
                  return (
                    <button {...props} className={cn(props.className || "", customClasses)} />
                  );
                }
              }}
            />
          </div>
          
          <div className="md:col-span-3">
            <div className="p-4 bg-muted rounded-lg h-full">
              <h3 className="font-medium mb-4">
                {date ? format(date, "MMMM d, yyyy") : "Select a day"}
              </h3>
              
              {selectedDayData ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Morning Supplement:</span>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      selectedDayData.morning 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    )}>
                      {selectedDayData.morning ? "Taken" : "Missed"}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Evening Supplement:</span>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      selectedDayData.evening 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    )}>
                      {selectedDayData.evening ? "Taken" : "Missed"}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span>Daily completion:</span>
                      <span className="font-medium">
                        {selectedDayData.morning && selectedDayData.evening 
                          ? "100%" 
                          : selectedDayData.morning || selectedDayData.evening 
                            ? "50%" 
                            : "0%"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No data available for this day
                </p>
              )}
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Legend:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500/20"></div>
                    <span>All supplements taken</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500/20"></div>
                    <span>Some supplements taken</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500/20"></div>
                    <span>No supplements taken</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
