
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Clock, Star, TrendingUp, Users, Briefcase, Calendar, MessageSquare } from "lucide-react";

export const Dashboard = () => {
  const recentCandidates = [
    { name: "Sarah Chen", role: "Senior Frontend Developer", match: 95, status: "Interview Scheduled", avatar: "/placeholder.svg" },
    { name: "Marcus Johnson", role: "Data Scientist", match: 92, status: "Under Review", avatar: "/placeholder.svg" },
    { name: "Emily Rodriguez", role: "UX Designer", match: 88, status: "Phone Screen", avatar: "/placeholder.svg" },
    { name: "David Park", role: "Backend Engineer", match: 85, status: "Application Received", avatar: "/placeholder.svg" },
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI-Powered Candidate Matches */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-600" />
              Top AI-Matched Candidates
            </CardTitle>
            <CardDescription>
              Candidates ranked by AI compatibility score
            </CardDescription>
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
                  <Button size="sm">View Profile</Button>
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
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Add New Candidate
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Briefcase className="h-4 w-4 mr-2" />
                Post New Job
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
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
                  <Button size="sm" variant="outline">Join Call</Button>
                  <Button size="sm" variant="ghost">Reschedule</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
