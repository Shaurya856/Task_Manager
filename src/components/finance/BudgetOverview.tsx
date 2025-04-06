
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Category } from "@/types/finance";

interface BudgetOverviewProps {
  categories: Category[];
}

const BudgetOverview = ({ categories }: BudgetOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
        <CardDescription>Track your spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="font-medium">{category.name}</div>
                <div className="text-sm">
                  ${category.spent.toLocaleString()} / ${category.budget.toLocaleString()}
                </div>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full ${category.color}`} 
                  style={{ width: `${Math.min(100, (category.spent / category.budget) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <div>
                  {Math.round((category.spent / category.budget) * 100)}% of budget
                </div>
                <div>
                  ${(category.budget - category.spent).toLocaleString()} remaining
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
