import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CandidateProfile } from "@/components/CandidateProfile";
import { Bell, Clock, Star, TrendingUp, Users, Briefcase, Calendar, MessageSquare, Eye, Edit, Trash2, Send, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Dashboard = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const { toast } = useToast();

  const recentCandidates = [
    { id: "1", name: "Sarah Chen", role: "Senior Frontend Developer", match: 95, status: "Interview Scheduled", avatar: "/placeholder.svg" },
    { id: "2", name: "Marcus Johnson", role: "Data Scientist", match: 92, status: "Under Review", avatar: "/placeholder.svg" },
    { id: "3", name: "Emily Rodriguez", role: "UX Designer", match: 88, status: "Phone Screen", avatar: "/placeholder.svg" },
    { id: "4", name: "David Park", role: "Backend Engineer", match: 85, status: "Application Received", avatar: "/placeholder.svg" },
  ];

  const upcomingInterviews = [
    { candidate: "Sarah Chen", time: "Today, 2:00 PM", role: "Senior Frontend Developer", type: "Technical" },
    { candidate: "Alex Thompson", time: "Tomorrow, 10:30 AM", role: "Product Manager", type: "Final Round" },
    { candidate: "Lisa Wang", time: "Friday, 3:00 PM", role: "DevOps Engineer", type: "Culture Fit" },
  ];

  const notifications = [
    { message: "New candidate matched for Frontend Developer position", time: "5 min ago", type: "match" },
    { message: "Interview reminder: Sarah Chen in 30 minutes", time: "30 min ago", type: "reminder" },
    { message: "AI analysis completed for Data Scientist role", time: "1 hour ago", type: "analysis" },
  ];

  const handleViewProfile = (candidateId: string) => {
    setSelectedCandidate(candidateId);
  };

  const handleAIAssistant = () => {
    toast({
      title: "AI Assistant Activated",
      description: "AI Assistant is now helping you with recruitment tasks",
    });
  };

  const handleJoinCall = (candidate: string) => {
    toast({
      title: "Joining Call",
      description: `Connecting to interview with ${candidate}`,
    });
  };

  const handleReschedule = (candidate: string) => {
    toast({
      title: "Reschedule Interview",
      description: `Rescheduling interview with ${candidate}`,
    });
  };

  const handleAddCandidate = () => {
    toast({
      title: "Add New Candidate",
      description: "Opening candidate registration form",
    });
  };

  const handlePostJob = () => {
    toast({
      title: "Post New Job",
      description: "Opening job posting form",
    });
  };

  const handleScheduleInterview = () => {
    toast({
      title: "Schedule Interview",
      description: "Opening interview scheduling form",
    });
  };

  const handleSendMessage = () => {
    toast({
      title: "Send Message",
      description: "Opening message composer",
    });
  };

  const handleViewResume = () => {
    toast({
      title: "View Resume",
      description: "Opening resume viewer",
    });
  };

  if (selectedCandidate) {
    return (
      <CandidateProfile 
        candidateId={selectedCandidate} 
        onBack={() => setSelectedCandidate(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI-Powered Candidate Matches */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  Top AI-Matched Candidates
                </CardTitle>
                <CardDescription>
                  Candidates ranked by AI compatibility score
                </CardDescription>
              </div>
              <Button onClick={handleAIAssistant} variant="outline" size="sm">
                <Zap className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCandidates.map((candidate, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={candidate.avatar} />
                    <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                    <p className="text-sm text-gray-600">{candidate.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Match Score</span>
                      <Badge variant={candidate.match >= 90 ? "default" : "secondary"}>
                        {candidate.match}%
                      </Badge>
                    </div>
                    <Progress value={candidate.match} className="w-20 mt-1" />
                  </div>
                  <Badge variant="outline">{candidate.status}</Badge>
                  <Button size="sm" variant="outline" onClick={() => handleViewProfile(candidate.id)}>
                    <Eye className="h-3 w-3 mr-1" />
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions & Notifications */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'match' ? 'bg-green-500' :
                    notification.type === 'reminder' ? 'bg-blue-500' : 'bg-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={handleAddCandidate}>
                <Users className="h-4 w-4 mr-2" />
                Add New Candidate
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={handlePostJob}>
                <Briefcase className="h-4 w-4 mr-2" />
                Post New Job
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={handleScheduleInterview}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={handleSendMessage}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={handleViewResume}>
                <Eye className="h-4 w-4 mr-2" />
                View Resume
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Interviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Upcoming Interviews
          </CardTitle>
          <CardDescription>
            Your scheduled interviews for this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingInterviews.map((interview, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gradient-to-br from-gray-50 to-white">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{interview.candidate}</h4>
                  <Badge variant="outline">{interview.type}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{interview.role}</p>
                <p className="text-sm font-medium text-blue-600">{interview.time}</p>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="outline" onClick={() => handleJoinCall(interview.candidate)}>
                    Join Call
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleReschedule(interview.candidate)}>
                    Reschedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
