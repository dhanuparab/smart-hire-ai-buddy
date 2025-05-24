
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Eye, Edit, Trash2, Users, Calendar, DollarSign, MapPin, Building, Briefcase } from "lucide-react";

export const JobPostings = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $140,000",
      applicants: 47,
      status: "Active",
      postedDate: "2024-01-15",
      description: "We're looking for a talented Senior Frontend Developer to join our team...",
      requirements: ["5+ years React experience", "TypeScript proficiency", "Team leadership"],
      benefits: ["Health insurance", "401k matching", "Flexible PTO"]
    },
    {
      id: 2,
      title: "Data Scientist",
      department: "Analytics",
      location: "Remote",
      type: "Full-time",
      salary: "$130,000 - $160,000",
      applicants: 23,
      status: "Active",
      postedDate: "2024-01-18",
      description: "Join our data science team to build cutting-edge ML models...",
      requirements: ["PhD in relevant field", "Python/R expertise", "ML experience"],
      benefits: ["Health insurance", "Stock options", "Learning budget"]
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$85,000 - $105,000",
      applicants: 31,
      status: "Draft",
      postedDate: "2024-01-20",
      description: "Create beautiful and intuitive user experiences...",
      requirements: ["4+ years UX design", "Figma expertise", "User research skills"],
      benefits: ["Health insurance", "Design conferences", "Creative time"]
    }
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    requirements: "",
    benefits: ""
  });

  const handleCreateJob = () => {
    const job = {
      id: jobs.length + 1,
      ...newJob,
      applicants: 0,
      status: "Draft",
      postedDate: new Date().toISOString().split('T')[0],
      requirements: newJob.requirements.split(',').map(r => r.trim()),
      benefits: newJob.benefits.split(',').map(b => b.trim())
    };
    setJobs([...jobs, job]);
    setNewJob({
      title: "",
      department: "",
      location: "",
      type: "",
      salary: "",
      description: "",
      requirements: "",
      benefits: ""
    });
  };

  const JobCard = ({ job }: { job: any }) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="mt-1">
              {job.department} • Posted on {new Date(job.postedDate).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge variant={job.status === "Active" ? "default" : "secondary"}>
            {job.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-gray-500" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{job.applicants} applicants</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

        <div className="space-y-2">
          <p className="text-sm font-medium">Key Requirements:</p>
          <div className="flex flex-wrap gap-1">
            {job.requirements.slice(0, 3).map((req: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {req}
              </Badge>
            ))}
            {job.requirements.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{job.requirements.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button size="sm" variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
          <Button size="sm" variant={job.status === "Active" ? "secondary" : "default"}>
            {job.status === "Active" ? "Pause" : "Publish"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Job Postings</CardTitle>
              <CardDescription>
                Manage your job openings and track applications
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Job Posting
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Job Posting</DialogTitle>
                  <DialogDescription>
                    Fill in the details for your new job opening
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={newJob.title}
                        onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                        placeholder="e.g., Senior Frontend Developer"
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select value={newJob.department} onValueChange={(value) => setNewJob({...newJob, department: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newJob.location}
                        onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                        placeholder="e.g., San Francisco, CA or Remote"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Employment Type</Label>
                      <Select value={newJob.type} onValueChange={(value) => setNewJob({...newJob, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input
                      id="salary"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                      placeholder="e.g., $120,000 - $140,000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea
                      id="description"
                      value={newJob.description}
                      onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                      placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                    <Textarea
                      id="requirements"
                      value={newJob.requirements}
                      onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                      placeholder="e.g., 5+ years React experience, TypeScript proficiency, Team leadership"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="benefits">Benefits (comma-separated)</Label>
                    <Textarea
                      id="benefits"
                      value={newJob.benefits}
                      onChange={(e) => setNewJob({...newJob, benefits: e.target.value})}
                      placeholder="e.g., Health insurance, 401k matching, Flexible PTO"
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Save as Draft</Button>
                    <Button onClick={handleCreateJob}>Create & Publish</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold">{jobs.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold">{jobs.filter(j => j.status === 'Active').length}</p>
              </div>
              <Building className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                <p className="text-2xl font-bold">{jobs.reduce((sum, job) => sum + job.applicants, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Applications</p>
                <p className="text-2xl font-bold">{Math.round(jobs.reduce((sum, job) => sum + job.applicants, 0) / jobs.length)}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};
