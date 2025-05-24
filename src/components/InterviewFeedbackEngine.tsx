
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Star, TrendingUp, Clock, User, Mail, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeedbackData {
  candidateId: string;
  candidateName: string;
  position: string;
  scores: {
    communication: number;
    technical: number;
    problemSolving: number;
    cultural: number;
  };
  overallScore: number;
  recommendation: 'selected' | 'rejected';
  feedback: string;
  answers: string[];
  interviewDuration: number;
  questionsAnswered?: number;
  voiceDetected?: boolean;
}

interface InterviewFeedbackEngineProps {
  feedbackData: FeedbackData;
  onBack: () => void;
}

export const InterviewFeedbackEngine = ({ feedbackData, onBack }: InterviewFeedbackEngineProps) => {
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const handleSendEmail = (type: 'selection' | 'rejection') => {
    setEmailSent(true);
    const emailType = type === 'selection' ? 'Selection' : 'Rejection';
    toast({
      title: `${emailType} Email Sent`,
      description: `${emailType} email has been sent to ${feedbackData.candidateName}`,
    });
  };

  const shouldShowSelectionEmail = feedbackData.overallScore >= 70;
  const shouldShowRejectionEmail = feedbackData.overallScore < 70;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Interviews
        </Button>
        <h1 className="text-2xl font-bold">Interview Feedback Analysis</h1>
      </div>

      {/* Overall Results */}
      <Card className={`border-2 ${feedbackData.recommendation === 'selected' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {feedbackData.recommendation === 'selected' ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600" />
            )}
            <div>
              <h2 className="text-2xl">{feedbackData.candidateName}</h2>
              <p className="text-lg text-gray-600">{feedbackData.position}</p>
            </div>
          </CardTitle>
          <div className="flex items-center gap-4">
            <Badge 
              variant={feedbackData.recommendation === 'selected' ? 'default' : 'destructive'}
              className="text-lg px-4 py-2"
            >
              {feedbackData.recommendation === 'selected' ? 'SELECTED' : 'NOT SELECTED'}
            </Badge>
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(feedbackData.overallScore)}`}>
                {feedbackData.overallScore}%
              </div>
              <p className="text-sm text-gray-600">Overall Score</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Score Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(feedbackData.scores).map(([category, score]) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <Badge variant={getScoreBadgeVariant(score)}>
                    {score}%
                  </Badge>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Interview Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Interview Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-lg font-semibold">{formatDuration(feedbackData.interviewDuration)}</div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <User className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <div className="text-lg font-semibold">{feedbackData.questionsAnswered || feedbackData.answers.length}</div>
                <div className="text-sm text-gray-600">Questions Answered</div>
              </div>
            </div>
            
            {feedbackData.voiceDetected !== undefined && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className={`text-lg font-semibold ${feedbackData.voiceDetected ? 'text-green-600' : 'text-red-600'}`}>
                  {feedbackData.voiceDetected ? 'Voice Detected' : 'No Voice Detected'}
                </div>
                <div className="text-sm text-gray-600">Audio Analysis</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>AI Analysis & Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {feedbackData.feedback}
          </div>
        </CardContent>
      </Card>

      {/* Response Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Response Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {feedbackData.answers.map((answer, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-sm text-gray-600 mb-1">
                  {index === 0 ? 'Introduction' : `Question ${index}`}
                </div>
                <div className="text-gray-800">{answer}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send Notification Email
          </CardTitle>
          <CardDescription>
            Send appropriate email notification based on interview results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 justify-center">
            {shouldShowSelectionEmail && (
              <Button 
                onClick={() => handleSendEmail('selection')}
                disabled={emailSent}
                className="bg-green-600 hover:bg-green-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                {emailSent ? 'Selection Email Sent' : 'Send Selection Email'}
              </Button>
            )}
            
            {shouldShowRejectionEmail && (
              <Button 
                onClick={() => handleSendEmail('rejection')}
                disabled={emailSent}
                variant="destructive"
              >
                <Mail className="h-4 w-4 mr-2" />
                {emailSent ? 'Rejection Email Sent' : 'Send Rejection Email'}
              </Button>
            )}
          </div>
          
          <div className="text-center text-sm text-gray-600">
            {shouldShowSelectionEmail ? 
              `Score of ${feedbackData.overallScore}% qualifies for selection email` :
              `Score of ${feedbackData.overallScore}% requires rejection email (threshold: 70%)`
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
