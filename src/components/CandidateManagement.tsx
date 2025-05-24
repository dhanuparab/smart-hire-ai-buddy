
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Filter, Download, Mail, Phone, MapPin, Star, Brain, Calendar, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CandidateManagementProps {
  searchQuery: string;
}

export const CandidateManagement = ({ searchQuery }: CandidateManagementProps) => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const candidates = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      role: "Senior Frontend Developer",
      experience: "5+ years",
      skills: ["React", "TypeScript", "Node.js", "GraphQL"],
      status: "Interview Scheduled",
      matchScore: 95,
      salary: "$120,000 - $140,000",
      availability: "Available in 2 weeks",
      avatar: "/placeholder.svg",
      aiInsights: "Excellent technical skills with strong React experience. Cultural fit score: 92%",
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      email: "marcus.j@email.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
      role: "Data Scientist",
      experience: "7+ years",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
      status: "Under Review",
      matchScore: 92,
      salary: "$130,000 - $160,000",
      availability: "Immediate",
      avatar: "/placeholder.svg",
      aiInsights: "Strong analytical background with proven ML expertise. Team collaboration score: 88%",
      lastActivity: "1 day ago"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      role: "UX Designer",
      experience: "4+ years",
      skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
      status: "Phone Screen",
      matchScore: 88,
      salary: "$85,000 - $105,000",
      availability: "Available in 1 month",
      avatar: "/placeholder.svg",
      aiInsights: "Creative problem-solver with excellent design portfolio. Innovation score: 94%",
      lastActivity: "3 hours ago"
    },
    {
      id: 4,
      name: "David Park",
      email: "david.park@email.com",
      phone: "+1 (555) 321-0987",
      location: "Seattle, WA",
      role: "Backend Engineer",
      experience: "6+ years",
      skills: ["Java", "Spring Boot", "AWS", "Docker"],
      status: "Application Received",
      matchScore: 85,
      salary: "$110,000 - $130,000",
      availability: "Available in 3 weeks",
      avatar: "/placeholder.svg",
      aiInsights: "Solid backend expertise with cloud architecture experience. Reliability score: 91%",
      lastActivity: "5 hours ago"
    }
  ];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === "all" || candidate.status === selectedStatus;
    const matchesRole = selectedRole === "all" || candidate.role.includes(selectedRole);
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const CandidateCard = ({ candidate }: { candidate: any }) => (
    <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatar} />
              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{candidate.name}</h3>
              <p className="text-sm text-gray-600">{candidate.role}</p>
              <p className="text-xs text-gray-500">{candidate.lastActivity}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant={candidate.matchScore >= 90 ? "default" : "secondary"} className="mb-2">
              {candidate.matchScore}% Match
            </Badge>
            <Progress value={candidate.matchScore} className="w-20" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{candidate.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4" />
            <span>{candidate.experience}</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Skills:</p>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-start space-x-2">
            <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-blue-800">AI Insights</p>
              <p className="text-xs text-blue-700">{candidate.aiInsights}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Badge variant={
            candidate.status === "Interview Scheduled" ? "default" :
            candidate.status === "Under Review" ? "secondary" :
            candidate.status === "Phone Screen" ? "outline" : "secondary"
          }>
            {candidate.status}
          </Badge>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <Mail className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Phone className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">View Profile</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Candidate Profile</DialogTitle>
                  <DialogDescription>
                    Detailed information about {candidate.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={candidate.avatar} />
                      <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{candidate.name}</h3>
                      <p className="text-gray-600">{candidate.role}</p>
                      <p className="text-sm text-gray-500">{candidate.location}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Email</Label>
                      <p className="text-sm">{candidate.email}</p>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <p className="text-sm">{candidate.phone}</p>
                    </div>
                    <div>
                      <Label>Experience</Label>
                      <p className="text-sm">{candidate.experience}</p>
                    </div>
                    <div>
                      <Label>Availability</Label>
                      <p className="text-sm">{candidate.availability}</p>
                    </div>
                    <div>
                      <Label>Salary Expectation</Label>
                      <p className="text-sm">{candidate.salary}</p>
                    </div>
                    <div>
                      <Label>Match Score</Label>
                      <div className="flex items-center space-x-2">
                        <Progress value={candidate.matchScore} className="flex-1" />
                        <span className="text-sm font-medium">{candidate.matchScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>AI Insights</Label>
                    <div className="bg-blue-50 p-4 rounded-lg mt-2">
                      <p className="text-sm text-blue-800">{candidate.aiInsights}</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Interview
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      View Resume
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Management</CardTitle>
          <CardDescription>
            Manage and track candidates with AI-powered insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Application Received">Application Received</SelectItem>
                  <SelectItem value="Phone Screen">Phone Screen</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                  <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
                  <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                  <SelectItem value="UX Designer">UX Designer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No candidates found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
