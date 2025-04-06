
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { FinancialGoal } from "@/types/finance";
import { CalendarClock, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FinancialGoalsProps {
  goals: FinancialGoal[];
  onAddGoal: () => void;
  onEditGoal: (goal: FinancialGoal) => void;
  setGoals: React.Dispatch<React.SetStateAction<FinancialGoal[]>>;
}

const FinancialGoals = ({ goals, onAddGoal, onEditGoal, setGoals }: FinancialGoalsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3 flex-row flex justify-between items-center">
        <div>
          <CardTitle>Financial Goals</CardTitle>
          <CardDescription>Track progress toward your financial targets</CardDescription>
        </div>
        <Button onClick={onAddGoal} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" /> New Goal
        </Button>
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No goals set. Add a new financial goal to get started.
          </div>
        ) : (
          <div className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.id} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-lg">{goal.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                      <CalendarClock className="h-3 w-3 mr-1" />
                      Target Date: {new Date(goal.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">
                      ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((goal.currentAmount / goal.targetAmount) * 100)}% complete
                    </div>
                  </div>
                </div>
                <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="h-2" />
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEditGoal(goal)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setGoals(goals.filter(g => g.id !== goal.id));
                      toast({
                        title: "Goal deleted",
                        description: "The financial goal has been deleted",
                        variant: "destructive",
                      });
                    }}
                  >
                    Delete
                  </Button>
                </div>
                {goal !== goals[goals.length - 1] && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialGoals;
