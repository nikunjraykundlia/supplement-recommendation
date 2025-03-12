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
  CalendarDays,
  Target,
  Leaf,
  TrendingUp,
  User
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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";

interface UserAvatarProps {
  size?: "sm" | "md" | "lg";
  showMenu?: boolean;
  onSignOut?: () => void;
}

const UserAvatar = ({ size = "md", showMenu = true, onSignOut }: UserAvatarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  
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
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    if (userProfile?.displayName) {
      return userProfile.displayName.charAt(0).toUpperCase();
    }
    return "U";
  };
  
  const getUserName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    if (userProfile?.displayName) {
      return userProfile.displayName;
    }
    return "User";
  };
  
  const getEmail = () => {
    if (user?.email) {
      return user.email;
    }
    return userProfile?.email || "";
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
  
  const getAssessmentProgress = () => {
    if (assessmentHistory.length === 0) return 0;
    const scores = assessmentHistory.map(a => a.complianceScore || 0);
    const initialScore = scores[0];
    const currentScore = scores[scores.length - 1];
    return currentScore - initialScore;
  };
  
  const getAvatarColor = () => {
    const score = getComplianceScore();
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-primary";
  };
  
  const getProgressStatus = () => {
    const progress = getAssessmentProgress();
    if (progress > 0) return "Improving";
    if (progress < 0) return "Declining";
    return "Stable";
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
          <div className="relative">
            <Avatar className={cn(sizeClasses[size])}>
              <AvatarImage src={userProfile?.avatar} />
              <AvatarFallback className={getAvatarColor()}>
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className={cn(
              "avatar-badge",
              getComplianceScore() >= 80 ? "" : 
              getComplianceScore() >= 50 ? "away" : "offline"
            )} />
          </div>
          {size !== "sm" && <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuItem className="cursor-pointer">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="w-full">
                <span>Your Avatar</span>
              </DropdownMenuSubTrigger>
              
              <DropdownMenuSubContent className="w-80 p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{getUserName()}</h3>
                    <p className="text-muted-foreground text-sm">{getEmail()}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className={cn(
                        "h-4 w-4",
                        getAssessmentProgress() > 0 ? "text-green-500" :
                        getAssessmentProgress() < 0 ? "text-red-500" : "text-yellow-500"
                      )} />
                      <span className="text-sm font-medium">
                        {getProgressStatus()}
                      </span>
                    </div>
                  </div>
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={userProfile?.avatar} />
                    <AvatarFallback className={getAvatarColor()}>
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="space-y-4">
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
                  
                  {deficiencies.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        Areas to Improve
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
                        Your Strengths
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
                  
                  {assessmentHistory.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        Progress Tracking
                      </h4>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Initial Score</span>
                          <span className="text-sm font-medium">
                            {assessmentHistory[0].complianceScore || 0}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Current Score</span>
                          <span className="text-sm font-medium">
                            {assessmentHistory[assessmentHistory.length - 1].complianceScore || 0}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className={cn(
                            "text-sm font-medium",
                            getAssessmentProgress() > 0 ? "text-green-500" :
                            getAssessmentProgress() < 0 ? "text-red-500" : "text-yellow-500"
                          )}>
                            {getAssessmentProgress() > 0 ? "+" : ""}{getAssessmentProgress()}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </div>
        </DropdownMenuItem>
        
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
