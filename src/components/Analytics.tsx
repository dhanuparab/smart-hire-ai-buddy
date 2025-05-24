
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { Download, Filter, TrendingUp, Users, Clock, DollarSign } from "lucide-react";

export const Analytics = () => {
  const hiringFunnelData = [
    { stage: "Applications", count: 1247, conversion: 100 },
    { stage: "Screening", count: 498, conversion: 40 },
    { stage: "Phone Interview", count: 199, conversion: 16 },
    { stage: "Technical", count: 89, conversion: 7 },
    { stage: "Final Round", count: 45, conversion: 4 },
    { stage: "Offers", count: 23, conversion: 2 },
    { stage: "Hires", count: 18, conversion: 1.4 }
  ];

  const timeToHireData = [
    { month: "Jan", avgDays: 28, target: 25 },
    { month: "Feb", avgDays: 25, target: 25 },
    { month: "Mar", avgDays: 22, target: 25 },
    { month: "Apr", avgDays: 24, target: 25 },
    { month: "May", avgDays: 20, target: 25 },
    { month: "Jun", avgDays: 18, target: 25 }
  ];

  const sourceData = [
    { name: "LinkedIn", value: 35, color: "#0077B5" },
    { name: "Indeed", value: 28, color: "#2557A7" },
    { name: "Company Website", value: 20, color: "#7C3AED" },
    { name: "Referrals", value: 12, color: "#059669" },
    { name: "Other", value: 5, color: "#6B7280" }
  ];

  const departmentHiringData = [
    { department: "Engineering", hired: 45, target: 50, budget: 2500000 },
    { department: "Product", hired: 12, target: 15, budget: 800000 },
    { department: "Design", hired: 8, target: 10, budget: 600000 },
    { department: "Marketing", hired: 15, target: 12, budget: 700000 },
    { department: "Sales", hired: 23, target: 25, budget: 1200000 }
  ];

  const diversityData = [
    { category: "Gender", male: 58, female: 40, nonBinary: 2 },
    { category: "Ethnicity", white: 45, asian: 25, hispanic: 15, black: 10, other: 5 }
  ];

  const costPerHireData = [
    { month: "Jan", cost: 8500 },
    { month: "Feb", cost: 7800 },
    { month: "Mar", cost: 7200 },
    { month: "Apr", cost: 6900 },
    { month: "May", cost: 6500 },
    { month: "Jun", cost: 6200 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recruitment Analytics</CardTitle>
              <CardDescription>
                Comprehensive insights into your hiring performance and trends
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="last-6-months">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hires</p>
                <p className="text-3xl font-bold">123</p>
                <p className="text-sm text-green-600 font-medium">+15% from last period</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Time to Hire</p>
                <p className="text-3xl font-bold">21 days</p>
                <p className="text-sm text-green-600 font-medium">-3 days improvement</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cost per Hire</p>
                <p className="text-3xl font-bold">$6,200</p>
                <p className="text-sm text-green-600 font-medium">-8% reduction</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Offer Acceptance</p>
                <p className="text-3xl font-bold">78%</p>
                <p className="text-sm text-green-600 font-medium">+5% increase</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Funnel Analysis</CardTitle>
            <CardDescription>
              Conversion rates through your recruitment process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hiringFunnelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Time to Hire Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Time to Hire Trend</CardTitle>
            <CardDescription>
              Average days to complete hiring process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeToHireData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgDays" stroke="#10B981" strokeWidth={3} />
                <Line type="monotone" dataKey="target" stroke="#EF4444" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Source Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Source Performance</CardTitle>
            <CardDescription>
              Where your best candidates are coming from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {sourceData.map((source, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm">{source.name}: {source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cost per Hire Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Cost per Hire Optimization</CardTitle>
            <CardDescription>
              Monthly cost per hire trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={costPerHireData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Cost per Hire"]} />
                <Area 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Hiring Performance</CardTitle>
          <CardDescription>
            Progress against hiring targets by department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentHiringData.map((dept, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{dept.department}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant={dept.hired >= dept.target ? "default" : "secondary"}>
                      {dept.hired}/{dept.target} hired
                    </Badge>
                    <span className="text-sm text-gray-600">
                      Budget: ${(dept.budget / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${Math.min((dept.hired / dept.target) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{Math.round((dept.hired / dept.target) * 100)}% of target</span>
                  <span>{dept.target - dept.hired} remaining</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
