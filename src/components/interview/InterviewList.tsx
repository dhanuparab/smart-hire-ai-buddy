
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InterviewCard } from "./InterviewCard";
import { Calendar } from "lucide-react";

interface Interview {
  id: number;
  candidate: string;
  position: string;
  interviewer: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: string;
  location: string;
  notes: string;
  avatar: string;
  interviewLink: string;
}

interface InterviewListProps {
  interviews: Interview[];
  todayInterviews: Interview[];
  onStartVoiceInterview: (interview: Interview) => void;
}

export const InterviewList = ({ interviews, todayInterviews, onStartVoiceInterview }: InterviewListProps) => {
  return (
    <>
      {todayInterviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>
              Interviews scheduled for today with voice interview capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todayInterviews.map((interview) => (
                <InterviewCard 
                  key={interview.id} 
                  interview={interview} 
                  onStartVoiceInterview={onStartVoiceInterview}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Scheduled Interviews</CardTitle>
          <CardDescription>
            Manage all interviews with AI-powered voice assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interviews.map((interview) => (
              <InterviewCard 
                key={interview.id} 
                interview={interview} 
                onStartVoiceInterview={onStartVoiceInterview}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
