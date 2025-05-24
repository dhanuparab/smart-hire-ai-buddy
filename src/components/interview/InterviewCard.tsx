
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, Phone, MapPin, Users, Edit, Copy, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface InterviewCardProps {
  interview: Interview;
  onStartVoiceInterview: (interview: Interview) => void;
}

export const InterviewCard = ({ interview, onStartVoiceInterview }: InterviewCardProps) => {
  const { toast } = useToast();

  const copyInterviewLink = (link: string) => {
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

  return (
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
                    onClick={() => onStartVoiceInterview(interview)}
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
};
