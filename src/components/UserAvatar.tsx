
import { useState } from "react";
import {
  ChevronDown,
  Dumbbell,
  BrainCircuit,
  PieChart,
  Shield,
  AlertTriangle,
  Zap,
  Award,
  CalendarDays
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getUserProfile, getUserDeficiencies, getUserStrengthAreas, getAssessmentHistory } from "@/lib/ai-recommender";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface UserAvatarProps {
  size?: "sm" | "md" | "lg";
  showMenu?: boolean;
  onSignOut?: () => void;
}

const UserAvatar = ({ size = "md", showMenu = true, onSignOut }: UserAvatarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const userProfile = getUserProfile();
  const deficiencies = getUserDeficiencies();
  const strengthAreas = getUserStrengthAreas();
  const assessmentHistory = getAssessmentHistory();
  
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };
  
  const getInitials = () => {
    if (userProfile?.displayName) {
      return userProfile.displayName.charAt(0).toUpperCase();
    }
    return "U";
  };
  
  const getLatestAssessmentDate = () => {
    if (assessmentHistory.length > 0) {
      const latestAssessment = assessmentHistory[assessmentHistory.length - 1];
      return format(new Date(latestAssessment.date), "MMM d, yyyy");
    }
    return "No assessments yet";
  };
  
  const getComplianceScore = () => {
    return userProfile?.complianceScore || 0;
  };
  
  const getAssessmentCount = () => {
    return assessmentHistory.length;
  };
  
  const getAvatarColor = () => {
    const score = getComplianceScore();
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-primary";
  };
  
  if (!showMenu) {
    return (
      <Avatar className={cn(sizeClasses[size])}>
        <AvatarImage src={userProfile?.avatar} />
        <AvatarFallback className={getAvatarColor()}>
          {getInitials()}
        </AvatarFallback>
      </Avatar>
    );
  }
  
  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-2 p-1 rounded-full transition hover:bg-muted">
          <Avatar className={cn(sizeClasses[size])}>
            <AvatarImage src={userProfile?.avatar} />
            <AvatarFallback className={getAvatarColor()}>
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          {size !== "sm" && <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium text-lg">{userProfile?.displayName || "User"}</h3>
              <p className="text-muted-foreground text-sm">{userProfile?.email || ""}</p>
            </div>
            <Avatar className="h-14 w-14">
              <AvatarImage src={userProfile?.avatar} />
              <AvatarFallback className={getAvatarColor()}>
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="space-y-4">
            {/* User Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-muted rounded-lg p-2">
                <PieChart className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Compliance</p>
                <p className="font-medium">{getComplianceScore()}%</p>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <CalendarDays className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Assessments</p>
                <p className="font-medium">{getAssessmentCount()}</p>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <Award className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Last Assessed</p>
                <p className="font-medium text-xs">{getLatestAssessmentDate()}</p>
              </div>
            </div>
            
            {/* Health Profile */}
            {deficiencies.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  Nutrient Gaps
                </h4>
                <div className="flex flex-wrap gap-1">
                  {deficiencies.map((deficiency, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                      {deficiency}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {strengthAreas.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-green-500" />
                  Strength Areas
                </h4>
                <div className="flex flex-wrap gap-1">
                  {strengthAreas.map((strength, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => window.location.href = "/dashboard"}
        >
          <BrainCircuit className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => window.location.href = "/track"}
        >
          <Zap className="mr-2 h-4 w-4" />
          <span>Track Progress</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => window.location.href = "/assessment"}
        >
          <Shield className="mr-2 h-4 w-4" />
          <span>New Assessment</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={onSignOut}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
