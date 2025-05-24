
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InterviewFeedbackEngineProps {
  feedback: any;
  onSendEmail: (type: string) => void;
  onClose: () => void;
}

export const InterviewFeedbackEngine = ({ feedback, onSendEmail, onClose }: InterviewFeedbackEngineProps) => {
  const [emailsSent, setEmailsSent] = useState({
    selection: false,
    rejection: false,
  });

  const { candidateName, position, scores, overallScore, recommendation, feedback: aiFeedback, answers, interviewDuration } = feedback;
  const { toast } = useToast();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendSelectionEmail = () => {
    onSendEmail('selection');
    setEmailsSent({ ...emailsSent, selection: true });
    toast({
      title: "Selection Email Sent",
      description: "Congratulations email sent to candidate",
    });
  };

  const handleSendRejectionEmail = () => {
    onSendEmail('rejection');
    setEmailsSent({ ...emailsSent, rejection: true });
    toast({
      title: "Rejection Email Sent", 
      description: "Thank you email sent to candidate",
    });
  };

  // Determine which email button to show based on score
  const showSelectionButton = overallScore >= 70;
  const showRejectionButton = overallScore < 70;

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold">Interview Feedback - {candidateName}</CardTitle>
        <CardDescription>AI-Generated Feedback for {position} Role</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Score and Recommendation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600">{overallScore.toFixed(1)}</div>
              <p className="text-sm text-gray-500">Overall Score</p>
              <Progress value={overallScore} max={100} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              {overallScore >= 70 ? (
                <div className="flex items-center text-green-600 text-xl font-semibold">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  Recommended for Selection
                </div>
              ) : (
                <div className="flex items-center text-red-600 text-xl font-semibold">
                  <XCircle className="h-6 w-6 mr-2" />
                  Not Recommended
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">{aiFeedback}</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Scores */}
        <div className="space-y-2">
          <h4 className="text-md font-semibold">Detailed Scores</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(scores).map(([key, value]: [string, any]) => (
              <Card key={key}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                      <p className="text-2xl font-bold">{value}</p>
                    </div>
                    <Badge variant="secondary">{value}%</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interview Answers */}
        <div className="space-y-2">
          <h4 className="text-md font-semibold">Interview Answers</h4>
          <div className="space-y-3">
            {answers.map((answer, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-4">
                  <p className="font-semibold text-sm">
                    {index === 0 ? "Introduction:" : `Question ${index}:`}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">{answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interview Duration */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Interview Duration: {formatTime(interviewDuration)}
          </p>
        </div>

        {/* Email Actions - Conditional based on score */}
        <div className="flex justify-center space-x-4">
          {showSelectionButton && (
            <Button
              variant="default"
              onClick={handleSendSelectionEmail}
              disabled={emailsSent.selection}
              className="bg-green-600 hover:bg-green-700"
            >
              {emailsSent.selection ? (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Selection Email Sent
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Send Selection Email
                </>
              )}
            </Button>
          )}
          
          {showRejectionButton && (
            <Button
              variant="destructive"
              onClick={handleSendRejectionEmail}
              disabled={emailsSent.rejection}
            >
              {emailsSent.rejection ? (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Rejection Email Sent
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Send Rejection Email
                </>
              )}
            </Button>
          )}
          
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        
        {/* Score-based recommendation */}
        <div className="text-center text-sm text-gray-500">
          {overallScore >= 70 ? (
            "Score is above 70% - Selection email option available"
          ) : (
            "Score is below 70% - Rejection email option available"
          )}
        </div>
      </CardContent>
    </Card>
  );
};
