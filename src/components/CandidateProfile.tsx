import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Star, Edit, Trash2, Send, FileText, MessageSquare, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CandidateProfileProps {
  candidateId: string;
  onBack: () => void;
}

export const CandidateProfile = ({ candidateId, onBack }: CandidateProfileProps) => {
  const { toast } = useToast();
  
  // Mock candidate data - in real app, this would come from props or API
  const candidate = {
    id: candidateId,
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    role: "Senior Frontend Developer",
    experience: "5+ years",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
    matchScore: 95,
    status: "Interview Scheduled",
    avatar: "/placeholder.svg",
    summary: "Experienced frontend developer with a strong background in React and modern web technologies. Passionate about creating user-friendly interfaces and optimizing performance.",
    education: "BS Computer Science - Stanford University",
    previousCompanies: ["Google", "Meta", "Stripe"],
    applicationDate: "2024-01-20",
    lastContact: "2024-01-23"
  };

  const handleEdit = () => {
    toast({
      title: "Edit Candidate",
      description: "Opening candidate edit form",
    });
  };

  const handleDelete = () => {
    toast({
      title: "Delete Confirmation",
      description: "Are you sure you want to delete this candidate?",
      variant: "destructive",
    });
  };

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: `Message sent to ${candidate.name}`,
    });
  };

  const handleScheduleInterview = () => {
    toast({
      title: "Schedule Interview",
      description: `Opening interview scheduler for ${candidate.name}`,
    });
  };

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: `Email sent to ${candidate.email}`,
    });
  };

  const handleAddNote = () => {
    toast({
      title: "Add Note",
      description: "Opening note editor",
    });
  };

  const handleDownloadResume = () => {
    toast({
      title: "Download Started",
      description: `Downloading ${candidate.name}'s resume`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Candidates
        </Button>
        <h1 className="text-2xl font-bold">Candidate Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={candidate.avatar} />
                  <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{candidate.name}</CardTitle>
                  <CardDescription className="text-lg">{candidate.role}</CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{candidate.status}</Badge>
                    <Badge variant="default">Match Score: {candidate.matchScore}%</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{candidate.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Professional Summary</h3>
              <p className="text-gray-700">{candidate.summary}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Education</h3>
              <p className="text-gray-700">{candidate.education}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Previous Companies</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.previousCompanies.map((company, index) => (
                  <Badge key={index} variant="outline">{company}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Match Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{candidate.matchScore}%</div>
                <Progress value={candidate.matchScore} className="w-full" />
                <p className="text-sm text-gray-600 mt-2">AI Compatibility Score</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Applied</p>
                  <p className="text-xs text-gray-600">{candidate.applicationDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Last Contact</p>
                  <p className="text-xs text-gray-600">{candidate.lastContact}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline" onClick={handleScheduleInterview}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
              <Button className="w-full" variant="outline" onClick={handleSendEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button className="w-full" variant="outline" onClick={handleAddNote}>
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </Button>
              <Button className="w-full" variant="outline" onClick={handleDownloadResume}>
                <FileText className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
