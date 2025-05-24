
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, AlertCircle, Video } from "lucide-react";

interface InterviewStatsProps {
  todayCount: number;
  upcomingCount: number;
  pendingCount: number;
  videoCallCount: number;
}

export const InterviewStats = ({ todayCount, upcomingCount, pendingCount, videoCallCount }: InterviewStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Interviews</p>
              <p className="text-2xl font-bold">{todayCount}</p>
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
              <p className="text-2xl font-bold">{upcomingCount}</p>
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
              <p className="text-2xl font-bold">{pendingCount}</p>
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
              <p className="text-2xl font-bold">{videoCallCount}</p>
            </div>
            <Video className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
