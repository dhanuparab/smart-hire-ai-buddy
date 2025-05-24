
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VoiceInterviewEngine } from "@/components/VoiceInterviewEngine";
import { InterviewFeedbackEngine } from "@/components/InterviewFeedbackEngine";
import { InterviewStats } from "@/components/interview/InterviewStats";
import { ScheduleInterviewDialog } from "@/components/interview/ScheduleInterviewDialog";
import { InterviewList } from "@/components/interview/InterviewList";
import { interviewQuestionBank } from "@/components/InterviewQuestionBank";
import { useToast } from "@/hooks/use-toast";

export const InterviewScheduler = () => {
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidate: "Sarah Chen",
      position: "Senior Frontend Developer",
      interviewer: "John Smith",
      date: "2024-01-25",
      time: "14:00",
      duration: 60,
      type: "Video Call",
      status: "Confirmed",
      location: "Google Meet",
      notes: "Technical interview focusing on React and system design",
      avatar: "/placeholder.svg",
      interviewLink: `https://airecruiter.com/interview/unique-${Date.now()}-sarah-chen`
    },
    {
      id: 2,
      candidate: "Marcus Johnson",
      position: "Data Scientist",
      interviewer: "Emily Davis",
      date: "2024-01-25",
      time: "16:30",
      duration: 45,
      type: "Phone Call",
      status: "Pending",
      location: "+1 (555) 123-4567",
      notes: "Initial screening call",
      avatar: "/placeholder.svg",
      interviewLink: `https://airecruiter.com/interview/unique-${Date.now()}-marcus-johnson`
    },
    {
      id: 3,
      candidate: "Emily Rodriguez",
      position: "UX Designer",
      interviewer: "Alex Thompson",
      date: "2024-01-26",
      time: "10:00",
      duration: 90,
      type: "In-Person",
      status: "Confirmed",
      location: "Conference Room A",
      notes: "Portfolio review and design challenge",
      avatar: "/placeholder.svg",
      interviewLink: `https://airecruiter.com/interview/unique-${Date.now()}-emily-rodriguez`
    },
    {
      id: 4,
      candidate: "David Park",
      position: "Backend Engineer",
      interviewer: "Lisa Wang",
      date: "2024-01-26",
      time: "15:00",
      duration: 75,
      type: "Video Call",
      status: "Rescheduled",
      location: "Zoom",
      notes: "System architecture discussion",
      avatar: "/placeholder.svg",
      interviewLink: `https://airecruiter.com/interview/unique-${Date.now()}-david-park`
    }
  ]);

  const [activeVoiceInterview, setActiveVoiceInterview] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);
  const { toast } = useToast();

  const upcomingInterviews = interviews.filter(interview => 
    new Date(interview.date + " " + interview.time) > new Date()
  );

  const todayInterviews = interviews.filter(interview => 
    interview.date === new Date().toISOString().split('T')[0]
  );

  const handleScheduleInterview = (newInterviewData) => {
    const interviewLink = `https://airecruiter.com/interview/unique-${Date.now()}-${newInterviewData.candidate.toLowerCase().replace(/\s+/g, '-')}`;
    
    const interview = {
      id: interviews.length + 1,
      ...newInterviewData,
      status: "Pending",
      avatar: "/placeholder.svg",
      interviewLink
    };
    setInterviews([...interviews, interview]);

    toast({
      title: "Interview Scheduled",
      description: `Interview link generated: ${interviewLink}`,
    });
  };

  const handleStartVoiceInterview = (interview) => {
    const questions = interviewQuestionBank[interview.position] || interviewQuestionBank["Frontend Developer"];
    
    setActiveVoiceInterview({
      candidateId: interview.id.toString(),
      candidateName: interview.candidate,
      position: interview.position,
      duration: interview.duration,
      questions
    });
  };

  const handleInterviewComplete = (feedback) => {
    setFeedbackData(feedback);
    setActiveVoiceInterview(null);
  };

  const handleSendEmail = (type) => {
    toast({
      title: `${type === 'selection' ? 'Selection' : 'Rejection'} Email Sent`,
      description: "Candidate has been notified via email.",
    });
  };

  if (activeVoiceInterview) {
    return (
      <VoiceInterviewEngine
        {...activeVoiceInterview}
        onInterviewComplete={handleInterviewComplete}
        onDisconnect={() => setActiveVoiceInterview(null)}
      />
    );
  }

  if (feedbackData) {
    return (
      <InterviewFeedbackEngine
        feedback={feedbackData}
        onSendEmail={handleSendEmail}
        onClose={() => setFeedbackData(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Advanced Interview Scheduler</CardTitle>
              <CardDescription>
                AI-powered voice interviews with automatic feedback and email notifications
              </CardDescription>
            </div>
            <ScheduleInterviewDialog onSchedule={handleScheduleInterview} />
          </div>
        </CardHeader>
      </Card>

      <InterviewStats
        todayCount={todayInterviews.length}
        upcomingCount={upcomingInterviews.length}
        pendingCount={interviews.filter(i => i.status === "Pending").length}
        videoCallCount={interviews.filter(i => i.type === "Video Call").length}
      />

      <InterviewList
        interviews={interviews}
        todayInterviews={todayInterviews}
        onStartVoiceInterview={handleStartVoiceInterview}
      />
    </div>
  );
};
