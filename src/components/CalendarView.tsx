
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, subMonths, addMonths, isSameDay } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarViewProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  markedDates?: Date[];
  className?: string;
}

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isMarked: boolean;
  onClick: () => void;
  className?: string;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ 
  date, 
  isCurrentMonth, 
  isSelected, 
  isMarked, 
  onClick,
  className
}) => {
  return (
    <div
      className={cn(
        "h-10 w-10 flex items-center justify-center rounded-full cursor-pointer",
        isCurrentMonth ? "text-gray-900" : "text-gray-400",
        isSelected ? "bg-primary text-white" : "",
        isMarked && !isSelected ? "bg-green-100 text-green-800" : "",
        className
      )}
      onClick={onClick}
    >
      {format(date, 'd')}
    </div>
  );
};

const CalendarView: React.FC<CalendarViewProps> = ({ 
  selectedDate = new Date(),
  onDateSelect,
  markedDates = [],
  className
}) => {
  const [displayMonth, setDisplayMonth] = React.useState(new Date());
  
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(displayMonth),
    end: endOfMonth(displayMonth)
  });
  
  const startWeekday = getDay(startOfMonth(displayMonth));
  
  const handlePreviousMonth = () => {
    setDisplayMonth(subMonths(displayMonth, 1));
  };
  
  const handleNextMonth = () => {
    setDisplayMonth(addMonths(displayMonth, 1));
  };
  
  const isDateMarked = (date: Date) => {
    return markedDates.some(markedDate => isSameDay(markedDate, date));
  };
  
  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{format(displayMonth, 'MMMM yyyy')}</CardTitle>
        <div className="flex space-x-1">
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the start of the month */}
          {Array.from({ length: startWeekday }).map((_, index) => (
            <div key={`empty-start-${index}`} className="h-10 w-10" />
          ))}
          
          {/* Actual days of the month */}
          {daysInMonth.map((day) => (
            <CalendarDay
              key={day.toString()}
              date={day}
              isCurrentMonth={true}
              isSelected={selectedDate ? isSameDay(day, selectedDate) : false}
              isMarked={isDateMarked(day)}
              onClick={() => onDateSelect && onDateSelect(day)}
              className=""
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
