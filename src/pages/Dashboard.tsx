
import { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle, Clock, AlertCircle, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useIntersectionObserver } from "@/utils/animations";

const Dashboard = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const tasksRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const financeRef = useRef<HTMLDivElement>(null);
  
  const statsInView = useIntersectionObserver(statsRef, 0.1);
  const tasksInView = useIntersectionObserver(tasksRef, 0.1);
  const projectsInView = useIntersectionObserver(projectsRef, 0.1);
  const financeInView = useIntersectionObserver(financeRef, 0.1);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">Here's an overview of your progress today</p>
      </div>

      {/* Stats Section */}
      <div 
        ref={statsRef} 
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 transform ${
          statsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <div className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                <span>5 completed</span>
              </div>
              <Link to="/tasks?filter=pending" className="flex items-center ml-3 hover:text-primary transition-colors">
                <Circle className="w-3 h-3 mr-1 text-accent" />
                <span>7 pending</span>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Clock className="w-3 h-3 mr-1 text-yellow-500" />
              <span>1 due this week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Budget Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250</div>
            <div className="w-full mt-2">
              <Progress value={65} className="h-2" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">65% of monthly budget</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <AlertCircle className="w-3 h-3 mr-1 text-red-500" />
              <span>2 meetings today</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Section */}
      <div 
        ref={tasksRef}
        className={`transition-all duration-700 delay-100 transform ${
          tasksInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Tasks</h2>
          <Link to="/tasks">
            <Button variant="ghost" className="text-sm flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="space-y-2">
          <div className="task-item priority-high">
            <div className="flex items-center">
              <Circle className="h-5 w-5 text-muted-foreground mr-3" />
              <span>Complete project proposal</span>
            </div>
            <span className="text-xs text-muted-foreground">Due today</span>
          </div>
          <div className="task-item priority-medium">
            <div className="flex items-center">
              <Circle className="h-5 w-5 text-muted-foreground mr-3" />
              <span>Review budget report</span>
            </div>
            <span className="text-xs text-muted-foreground">Due tomorrow</span>
          </div>
          <div className="task-item priority-low">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <span className="line-through text-muted-foreground">Team meeting notes</span>
            </div>
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div 
        ref={projectsRef}
        className={`transition-all duration-700 delay-200 transform ${
          projectsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Active Projects</h2>
          <Link to="/projects">
            <Button variant="ghost" className="text-sm flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Marketing Campaign</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>8 tasks completed</span>
                  <span>Due in 5 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Product Launch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>40%</span>
                </div>
                <Progress value={40} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>4 tasks completed</span>
                  <span>Due in 2 weeks</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Finance Section */}
      <div 
        ref={financeRef}
        className={`transition-all duration-700 delay-300 transform ${
          financeInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Financial Overview</h2>
          <Link to="/finance">
            <Button variant="ghost" className="text-sm flex items-center">
              View details <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,580</div>
              <div className="flex items-center text-xs text-red-500 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,250</div>
              <div className="flex items-center text-xs text-green-500 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+5% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Budget Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$750</div>
              <div className="w-full mt-2">
                <Progress value={35} className="h-2" />
              </div>
              <div className="text-xs text-muted-foreground mt-1">35% remaining this month</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
