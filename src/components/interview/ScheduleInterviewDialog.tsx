
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewInterview {
  candidate: string;
  position: string;
  interviewer: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  location: string;
  notes: string;
}

interface ScheduleInterviewDialogProps {
  onSchedule: (interview: NewInterview) => void;
}

export const ScheduleInterviewDialog = ({ onSchedule }: ScheduleInterviewDialogProps) => {
  const [newInterview, setNewInterview] = useState<NewInterview>({
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

  const { toast } = useToast();

  const handleScheduleInterview = () => {
    onSchedule(newInterview);
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
  };

  return (
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
  );
};
