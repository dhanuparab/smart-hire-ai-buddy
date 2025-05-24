
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, Users, Target, AlertTriangle, CheckCircle, Lightbulb, BarChart3 } from "lucide-react";

export const AIInsights = () => {
  const insights = [
    {
      type: "recommendation",
      title: "Optimize Job Descriptions",
      description: "AI analysis suggests your Frontend Developer posting could attract 35% more qualified candidates with slight modifications.",
      impact: "High",
      action: "Review suggested changes",
      icon: Lightbulb,
      color: "text-yellow-600"
    },
    {
      type: "trend",
      title: "Market Salary Trends",
      description: "Data Scientist salaries in your area have increased by 12% in the last quarter. Consider adjusting your offer.",
      impact: "Medium",
      action: "View market data",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      type: "prediction",
      title: "Candidate Availability",
      description: "AI predicts a 20% increase in React developer applications next month based on market patterns.",
      impact: "Medium",
      action: "Plan hiring timeline",
      icon: Users,
      color: "text-blue-600"
    },
    {
      type: "alert",
      title: "Interview Bottleneck",
      description: "Your interview scheduling is creating delays. AI suggests optimizing your process to reduce time-to-hire.",
      impact: "High",
      action: "Optimize process",
      icon: AlertTriangle,
      color: "text-red-600"
    }
  ];

  const performanceMetrics = [
    { metric: "Candidate Matching Accuracy", value: 94, target: 95, trend: "+2%" },
    { metric: "Interview-to-Hire Ratio", value: 78, target: 80, trend: "+5%" },
    { metric: "Time to Fill (days)", value: 23, target: 20, trend: "-8%" },
    { metric: "Candidate Satisfaction", value: 91, target: 90, trend: "+3%" }
  ];

  const candidateAnalysis = [
    {
      skill: "React Development",
      demand: 95,
      supply: 45,
      trend: "High demand, limited supply",
      recommendation: "Consider remote candidates or upskilling programs"
    },
    {
      skill: "Data Science",
      demand: 88,
      supply: 62,
      trend: "Growing demand, moderate supply",
      recommendation: "Focus on competitive compensation packages"
    },
    {
      skill: "UX Design",
      demand: 76,
      supply: 71,
      trend: "Balanced market",
      recommendation: "Emphasize company culture and growth opportunities"
    },
    {
      skill: "DevOps Engineering",
      demand: 91,
      supply: 38,
      trend: "Very high demand, low supply",
      recommendation: "Consider contract-to-hire arrangements"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI-Powered Recruitment Insights
          </CardTitle>
          <CardDescription>
            Leverage artificial intelligence to optimize your recruitment strategy and make data-driven decisions
          </CardDescription>
        </CardHeader>
      </Card>

      {/* AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>
              Personalized suggestions to improve your hiring process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full bg-gray-100 ${insight.color}`}>
                    <insight.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <Badge variant={insight.impact === "High" ? "destructive" : insight.impact === "Medium" ? "default" : "secondary"}>
                        {insight.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      {insight.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              AI-tracked KPIs for your recruitment process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{metric.metric}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Target: {metric.target}</span>
                    <Badge variant={metric.trend.startsWith('+') ? "default" : "secondary"} className="text-xs">
                      {metric.trend}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress value={metric.value} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Current: {metric.value}</span>
                    <span>{metric.value >= metric.target ? "Target Met" : "Below Target"}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Market Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Skill Market Analysis
          </CardTitle>
          <CardDescription>
            AI analysis of talent supply and demand for key skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {candidateAnalysis.map((analysis, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{analysis.skill}</h4>
                  <Badge variant="outline">{analysis.trend}</Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Market Demand</span>
                      <span>{analysis.demand}%</span>
                    </div>
                    <Progress value={analysis.demand} className="h-2 bg-red-100">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${analysis.demand}%` }} />
                    </Progress>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Talent Supply</span>
                      <span>{analysis.supply}%</span>
                    </div>
                    <Progress value={analysis.supply} className="h-2 bg-blue-100">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${analysis.supply}%` }} />
                    </Progress>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs font-medium text-blue-800 mb-1">AI Recommendation</p>
                  <p className="text-xs text-blue-700">{analysis.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Success Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
              <p className="text-sm text-green-700">
                Predicted success rate for candidates in your pipeline based on historical data
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Hiring Velocity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">18 days</div>
              <p className="text-sm text-blue-700">
                AI-predicted average time to hire for your current open positions
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Match Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">94%</div>
              <p className="text-sm text-purple-700">
                Average AI matching accuracy for candidates progressing to final rounds
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
