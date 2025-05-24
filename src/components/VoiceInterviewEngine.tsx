
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Phone, PhoneOff, Volume2, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InterviewQuestion {
  id: number;
  question: string;
  expectedPoints: string[];
  timeLimit: number;
}

interface VoiceInterviewEngineProps {
  candidateId: string;
  candidateName: string;
  position: string;
  duration: number;
  questions: InterviewQuestion[];
  onInterviewComplete: (feedback: any) => void;
  onDisconnect: () => void;
}

export const VoiceInterviewEngine = ({
  candidateId,
  candidateName,
  position,
  duration,
  questions,
  onInterviewComplete,
  onDisconnect
}: VoiceInterviewEngineProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState(0);
  const [candidateAnswers, setCandidateAnswers] = useState<string[]>([]);
  const [isWaitingForCandidate, setIsWaitingForCandidate] = useState(true);
  const [waitTime, setWaitTime] = useState(300); // 5 minutes in seconds
  const [interviewStatus, setInterviewStatus] = useState<'waiting' | 'active' | 'completed' | 'disconnected'>('waiting');
  
  const { toast } = useToast();
  const timerRef = useRef<NodeJS.Timeout>();
  const questionTimerRef = useRef<NodeJS.Timeout>();
  const waitTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Start waiting timer for candidate to join
    waitTimerRef.current = setInterval(() => {
      setWaitTime(prev => {
        if (prev <= 1) {
          handleAutoDisconnect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (waitTimerRef.current) clearInterval(waitTimerRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (questionTimerRef.current) clearInterval(questionTimerRef.current);
    };
  }, []);

  const handleAutoDisconnect = () => {
    setInterviewStatus('disconnected');
    toast({
      title: "Interview Ended",
      description: "Candidate did not join within 5 minutes. Interview automatically disconnected.",
      variant: "destructive",
    });
    onDisconnect();
  };

  const handleCandidateJoin = () => {
    setIsWaitingForCandidate(false);
    setIsConnected(true);
    setInterviewStatus('active');
    if (waitTimerRef.current) clearInterval(waitTimerRef.current);
    
    // Start main interview timer
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleInterviewComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Start first question
    startQuestion();
    
    toast({
      title: "Interview Started",
      description: `${candidateName} has joined the interview.`,
    });
  };

  const startQuestion = () => {
    const question = questions[currentQuestionIndex];
    setQuestionTimeRemaining(question.timeLimit);
    
    questionTimerRef.current = setInterval(() => {
      setQuestionTimeRemaining(prev => {
        if (prev <= 1) {
          handleNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate speaking the question
    speakQuestion(question.question);
  };

  const speakQuestion = (question: string) => {
    // Text-to-speech simulation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate starting recording
    toast({
      title: "Recording Started",
      description: "Please answer the question clearly.",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Simulate saving answer
    const simulatedAnswer = `Simulated answer for question ${currentQuestionIndex + 1}`;
    setCandidateAnswers(prev => [...prev, simulatedAnswer]);
    
    toast({
      title: "Answer Recorded",
      description: "Moving to next question.",
    });
    
    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (questionTimerRef.current) clearInterval(questionTimerRef.current);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeout(() => {
        startQuestion();
      }, 2000);
    } else {
      handleInterviewComplete();
    }
  };

  const handleInterviewComplete = () => {
    setInterviewStatus('completed');
    if (timerRef.current) clearInterval(timerRef.current);
    if (questionTimerRef.current) clearInterval(questionTimerRef.current);
    
    // Generate feedback
    const feedback = generateInterviewFeedback();
    onInterviewComplete(feedback);
    
    toast({
      title: "Interview Completed",
      description: "Thank you for your time. Feedback will be sent shortly.",
    });
  };

  const generateInterviewFeedback = () => {
    // Simulate AI-powered feedback generation
    const scores = {
      communication: Math.floor(Math.random() * 40) + 60,
      technical: Math.floor(Math.random() * 40) + 60,
      problemSolving: Math.floor(Math.random() * 40) + 60,
      cultural: Math.floor(Math.random() * 40) + 60,
    };
    
    const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / 4;
    
    return {
      candidateId,
      candidateName,
      position,
      scores,
      overallScore,
      recommendation: overallScore >= 75 ? 'selected' : 'rejected',
      feedback: `Based on the interview responses, the candidate demonstrated ${overallScore >= 75 ? 'strong' : 'adequate'} skills in the assessed areas.`,
      answers: candidateAnswers,
      interviewDuration: duration * 60 - timeRemaining,
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (interviewStatus === 'waiting') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Clock className="h-6 w-6 text-blue-600" />
            Waiting for Candidate
          </CardTitle>
          <CardDescription>
            Interview scheduled for {candidateName} - {position}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formatTime(waitTime)}
            </div>
            <p className="text-gray-600">Time remaining for candidate to join</p>
            <div className="mt-4">
              <Progress value={(300 - waitTime) / 300 * 100} className="w-full" />
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500">
              Interview will automatically disconnect if candidate doesn't join within 5 minutes
            </p>
            <Button onClick={handleCandidateJoin} className="w-full">
              Simulate Candidate Join
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (interviewStatus === 'disconnected') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-red-600">
            <XCircle className="h-6 w-6" />
            Interview Disconnected
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p>The interview was automatically disconnected due to candidate absence.</p>
          <Button onClick={onDisconnect} className="mt-4">
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (interviewStatus === 'completed') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            Interview Completed
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p>Thank you for completing the interview. Feedback will be processed and sent shortly.</p>
          <Button onClick={onDisconnect} className="mt-4">
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Live Interview - {candidateName}</span>
          <Badge variant="default" className="bg-green-600">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
            LIVE
          </Badge>
        </CardTitle>
        <CardDescription>{position}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Interview Progress */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatTime(timeRemaining)}
              </div>
              <p className="text-sm text-gray-600">Time Remaining</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {currentQuestionIndex + 1}/{questions.length}
              </div>
              <p className="text-sm text-gray-600">Questions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {formatTime(questionTimeRemaining)}
              </div>
              <p className="text-sm text-gray-600">Question Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Question */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Volume2 className="h-6 w-6 text-blue-600 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">
                  Question {currentQuestionIndex + 1}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {currentQuestion.question}
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <Progress 
                value={(currentQuestion.timeLimit - questionTimeRemaining) / currentQuestion.timeLimit * 100} 
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recording Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            variant={isRecording ? "destructive" : "default"}
            size="lg"
            className="px-8"
          >
            {isRecording ? (
              <>
                <MicOff className="mr-2 h-5 w-5" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="mr-2 h-5 w-5" />
                Start Answer
              </>
            )}
          </Button>
          
          <Button
            onClick={handleNextQuestion}
            variant="outline"
            size="lg"
          >
            Skip Question
          </Button>
          
          <Button
            onClick={onDisconnect}
            variant="outline"
            size="lg"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <PhoneOff className="mr-2 h-5 w-5" />
            End Interview
          </Button>
        </div>

        {/* Interview Status */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            {isRecording ? "🔴 Recording in progress..." : "Press 'Start Answer' to record your response"}
          </p>
          {isConnected && (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              <span className="text-sm">Connected</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
