
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Wallet } from "lucide-react";

interface FinancialSummaryProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const FinancialSummary = ({ totalIncome, totalExpense, balance }: FinancialSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-green-500/10 border-green-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-green-500 font-medium">Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <ArrowUp className="h-5 w-5 text-green-500" />
            <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-red-500/10 border-red-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-red-500 font-medium">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <ArrowDown className="h-5 w-5 text-red-500" />
            <div className="text-2xl font-bold">${totalExpense.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card className={`${balance >= 0 ? 'bg-blue-500/10 border-blue-500/20' : 'bg-yellow-500/10 border-yellow-500/20'}`}>
        <CardHeader className="pb-2">
          <CardTitle className={`text-sm font-medium ${balance >= 0 ? 'text-blue-500' : 'text-yellow-500'}`}>
            Net Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Wallet className={`h-5 w-5 ${balance >= 0 ? 'text-blue-500' : 'text-yellow-500'}`} />
            <div className="text-2xl font-bold">${balance.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSummary;
