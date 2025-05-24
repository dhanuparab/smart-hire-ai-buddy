
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Mail, FileText, Star, TrendingUp, TrendingDown } from 'lucide-react';
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
}

interface InterviewFeedbackEngineProps {
  feedback: FeedbackData;
  onSendEmail: (type: 'selection' | 'rejection') => void;
  onClose: () => void;
}

export const InterviewFeedbackEngine = ({ feedback, onSendEmail, onClose }: InterviewFeedbackEngineProps) => {
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="h-4 w-4" />;
    if (score >= 60) return <Star className="h-4 w-4" />;
    return <TrendingDown className="h-4 w-4" />;
  };

  const handleSendEmail = async (type: 'selection' | 'rejection') => {
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEmailSent(true);
    onSendEmail(type);
    
    toast({
      title: `${type === 'selection' ? 'Selection' : 'Rejection'} Email Sent`,
      description: `Email has been sent to ${feedback.candidateName} with interview feedback.`,
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const detailedFeedback = {
    selected: `Dear ${feedback.candidateName},

Congratulations! We are pleased to inform you that you have been selected for the ${feedback.position} position.

Your interview performance was excellent, with particularly strong scores in:
${Object.entries(feedback.scores)
  .filter(([_, score]) => score >= 75)
  .map(([skill, score]) => `• ${skill.charAt(0).toUpperCase() + skill.slice(1)}: ${score}%`)
  .join('\n')}

We were impressed by your technical knowledge and communication skills. Our team believes you would be a great fit for our organization.

Next Steps:
• HR will contact you within 2 business days
• We'll discuss compensation and start date
• Background check and reference verification

We look forward to welcoming you to our team!

Best regards,
AI Recruiter Pro Team`,

    rejected: `Dear ${feedback.candidateName},

Thank you for taking the time to interview for the ${feedback.position} position. We appreciate your interest in our company.

After careful consideration, we have decided to move forward with other candidates whose experience more closely matches our current needs.

Interview Feedback:
${Object.entries(feedback.scores)
  .map(([skill, score]) => `• ${skill.charAt(0).toUpperCase() + skill.slice(1)}: ${score}%`)
  .join('\n')}

Areas for improvement:
${Object.entries(feedback.scores)
  .filter(([_, score]) => score < 70)
  .map(([skill]) => `• Consider strengthening your ${skill} skills`)
  .join('\n') || '• Continue developing your overall technical expertise'}

We encourage you to apply for future positions that may be a better match for your background.

Best of luck in your job search!

Best regards,
AI Recruiter Pro Team`
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {feedback.recommendation === 'selected' ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
                Interview Feedback - {feedback.candidateName}
              </CardTitle>
              <CardDescription>{feedback.position}</CardDescription>
            </div>
            <Badge 
              variant={feedback.recommendation === 'selected' ? 'default' : 'destructive'}
              className="text-lg px-4 py-2"
            >
              {feedback.recommendation === 'selected' ? 'SELECTED' : 'REJECTED'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium">Overall Score</span>
            <span className={`text-3xl font-bold ${getScoreColor(feedback.overallScore)}`}>
              {feedback.overallScore.toFixed(1)}%
            </span>
          </div>
          <Progress value={feedback.overallScore} className="h-3" />
          <div className="mt-4 text-sm text-gray-600">
            Interview Duration: {formatDuration(feedback.interviewDuration)}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(feedback.scores).map(([skill, score]) => (
              <div key={skill} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getScoreIcon(score)}
                    <span className="font-medium capitalize">{skill}</span>
                  </div>
                  <span className={`text-xl font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            AI-Generated Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">{feedback.feedback}</p>
          </div>
        </CardContent>
      </Card>

      {/* Email Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Template Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white border rounded-lg p-6 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
              {detailedFeedback[feedback.recommendation]}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center space-x-4">
            {!emailSent ? (
              <>
                <Button
                  onClick={() => handleSendEmail(feedback.recommendation)}
                  className={`px-8 ${
                    feedback.recommendation === 'selected' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send {feedback.recommendation === 'selected' ? 'Selection' : 'Rejection'} Email
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Save Draft
                </Button>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>Email sent successfully!</span>
                </div>
                <Button onClick={onClose}>
                  Return to Dashboard
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
