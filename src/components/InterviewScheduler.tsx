import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Video, Phone, MapPin, Plus, Edit, Trash2, Users, AlertCircle, Copy, Play } from "lucide-react";
import { VoiceInterviewEngine } from "@/components/VoiceInterviewEngine";
import { InterviewFeedbackEngine } from "@/components/InterviewFeedbackEngine";
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

  const [newInterview, setNewInterview] = useState({
    candidate: "",
    position: "",
    interviewer: "",
    date: "",
    time: "",
    duration: 60,
    type: "Video Call",
    location: "",
    notes: ""
  });

  const [activeVoiceInterview, setActiveVoiceInterview] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);
  const { toast } = useToast();

  const upcomingInterviews = interviews.filter(interview => 
    new Date(interview.date + " " + interview.time) > new Date()
  );

  const todayInterviews = interviews.filter(interview => 
    interview.date === new Date().toISOString().split('T')[0]
  );

  const handleScheduleInterview = () => {
    const interviewLink = `https://airecruiter.com/interview/unique-${Date.now()}-${newInterview.candidate.toLowerCase().replace(/\s+/g, '-')}`;
    
    const interview = {
      id: interviews.length + 1,
      ...newInterview,
      status: "Pending",
      avatar: "/placeholder.svg",
      interviewLink
    };
    setInterviews([...interviews, interview]);
    setNewInterview({
      candidate: "",
      position: "",
      interviewer: "",
      date: "",
      time: "",
      duration: 60,
      type: "Video Call",
      location: "",
      notes: ""
    });

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

  const copyInterviewLink = (link) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Interview link copied to clipboard",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "default";
      case "Pending": return "secondary";
      case "Rescheduled": return "outline";
      case "Completed": return "default";
      default: return "secondary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video Call": return <Video className="h-4 w-4" />;
      case "Phone Call": return <Phone className="h-4 w-4" />;
      case "In-Person": return <MapPin className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
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

  const InterviewCard = ({ interview }: { interview: any }) => (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={interview.avatar} />
                <AvatarFallback>{interview.candidate.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{interview.candidate}</h4>
                <p className="text-sm text-gray-600">{interview.position}</p>
              </div>
            </div>
            <Badge variant={getStatusColor(interview.status)}>
              {interview.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>{new Date(interview.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{interview.time} ({interview.duration}min)</span>
            </div>
            <div className="flex items-center space-x-2">
              {getTypeIcon(interview.type)}
              <span>{interview.type}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span>{interview.interviewer}</span>
            </div>
          </div>

          {/* Interview Link */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-blue-800">Unique Interview Link</p>
                <p className="text-xs text-blue-600 break-all">{interview.interviewLink}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyInterviewLink(interview.interviewLink)}
                className="ml-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {interview.notes && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600">{interview.notes}</p>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-sm text-gray-600">{interview.location}</span>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4" />
              </Button>
              {interview.status === "Confirmed" && (
                <>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleStartVoiceInterview(interview)}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button size="sm">Join</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Advanced Interview Scheduler</CardTitle>
              <CardDescription>
                AI-powered voice interviews with automatic feedback and email notifications
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Schedule New Interview</DialogTitle>
                  <DialogDescription>
                    Set up a voice interview with automatic question generation
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="candidate">Candidate Name</Label>
                      <Input
                        id="candidate"
                        value={newInterview.candidate}
                        onChange={(e) => setNewInterview({...newInterview, candidate: e.target.value})}
                        placeholder="Enter candidate name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position</Label>
                      <Select value={newInterview.position} onValueChange={(value) => setNewInterview({...newInterview, position: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                          <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                          <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                          <SelectItem value="Product Manager">Product Manager</SelectItem>
                          <SelectItem value="UX Designer">UX Designer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="interviewer">Interviewer</Label>
                      <Select value={newInterview.interviewer} onValueChange={(value) => setNewInterview({...newInterview, interviewer: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select interviewer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="John Smith">John Smith</SelectItem>
                          <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                          <SelectItem value="Alex Thompson">Alex Thompson</SelectItem>
                          <SelectItem value="Lisa Wang">Lisa Wang</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type">Interview Type</Label>
                      <Select value={newInterview.type} onValueChange={(value) => setNewInterview({...newInterview, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Video Call">Video Call</SelectItem>
                          <SelectItem value="Phone Call">Phone Call</SelectItem>
                          <SelectItem value="In-Person">In-Person</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newInterview.date}
                        onChange={(e) => setNewInterview({...newInterview, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newInterview.time}
                        onChange={(e) => setNewInterview({...newInterview, time: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Select value={newInterview.duration.toString()} onValueChange={(value) => setNewInterview({...newInterview, duration: parseInt(value)})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location/Meeting Link</Label>
                    <Input
                      id="location"
                      value={newInterview.location}
                      onChange={(e) => setNewInterview({...newInterview, location: e.target.value})}
                      placeholder="Meeting room, phone number, or video link"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newInterview.notes}
                      onChange={(e) => setNewInterview({...newInterview, notes: e.target.value})}
                      placeholder="Interview agenda, focus areas, or special instructions"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Save as Draft</Button>
                    <Button onClick={handleScheduleInterview}>Schedule Interview</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Interviews</p>
                <p className="text-2xl font-bold">{todayInterviews.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold">{upcomingInterviews.length}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Confirmation</p>
                <p className="text-2xl font-bold">{interviews.filter(i => i.status === "Pending").length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Voice Interviews</p>
                <p className="text-2xl font-bold">{interviews.filter(i => i.type === "Video Call").length}</p>
              </div>
              <Video className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
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
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Interviews */}
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
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
