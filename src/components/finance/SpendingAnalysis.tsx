
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";
import { Category, Transaction } from "@/types/finance";

interface SpendingAnalysisProps {
  categories: Category[];
  transactions: Transaction[];
  totalExpense: number;
}

const SpendingAnalysis = ({ categories, transactions, totalExpense }: SpendingAnalysisProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Analysis</CardTitle>
        <CardDescription>How your money is distributed</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {totalExpense > 0 ? (
          <>
            <div className="w-40 h-40 relative rounded-full border-8 border-secondary mb-8 flex items-center justify-center">
              {categories.map((category, index) => {
                const categorySpent = transactions
                  .filter(t => t.type === 'expense' && t.category === category.name)
                  .reduce((sum, t) => sum + t.amount, 0);
                  
                const percentage = totalExpense > 0 ? (categorySpent / totalExpense) * 100 : 0;
                
                if (percentage <= 0) return null;
                
                const previousCategories = categories.slice(0, index);
                const previousPercentage = previousCategories.reduce((sum, cat) => {
                  const catSpent = transactions
                    .filter(t => t.type === 'expense' && t.category === cat.name)
                    .reduce((sum, t) => sum + t.amount, 0);
                  return sum + (catSpent / totalExpense) * 100;
                }, 0);
                
                const rotation = previousPercentage * 3.6; // 3.6 = 360 / 100
                const degrees = percentage * 3.6;
                
                return (
                  <div 
                    key={category.name}
                    className={`absolute inset-0 ${category.color}`}
                    style={{ 
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((rotation) * Math.PI / 180)}% ${50 - 50 * Math.sin((rotation) * Math.PI / 180)}%, ${50 + 50 * Math.cos((rotation + degrees) * Math.PI / 180)}% ${50 - 50 * Math.sin((rotation + degrees) * Math.PI / 180)}%)` 
                    }}
                  />
                );
              })}
            </div>
            <div className="w-full grid grid-cols-2 gap-2">
              {categories.filter(category => {
                const spent = transactions
                  .filter(t => t.type === 'expense' && t.category === category.name)
                  .reduce((sum, t) => sum + t.amount, 0);
                return spent > 0;
              }).map((category) => {
                const spent = transactions
                  .filter(t => t.type === 'expense' && t.category === category.name)
                  .reduce((sum, t) => sum + t.amount, 0);
                const percentage = totalExpense > 0 ? Math.round((spent / totalExpense) * 100) : 0;
                
                return (
                  <div key={category.name} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${category.color}`} />
                    <div className="text-sm">{category.name} ({percentage}%)</div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <PieChart className="h-10 w-10 mx-auto mb-4 opacity-50" />
            <p>No expense data to display.</p>
            <p className="text-sm mt-2">Add expenses to see your spending distribution.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpendingAnalysis;
