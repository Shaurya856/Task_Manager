
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Transaction, Category, FinancialGoal } from "@/types/finance";
import FinancialSummary from "@/components/finance/FinancialSummary";
import TransactionsList from "@/components/finance/TransactionsList";
import BudgetOverview from "@/components/finance/BudgetOverview";
import SpendingAnalysis from "@/components/finance/SpendingAnalysis";
import FinancialGoals from "@/components/finance/FinancialGoals";
import TransactionDialog from "@/components/finance/TransactionDialog";
import SplitTransactionDialog from "@/components/finance/SplitTransactionDialog";
import GoalDialog from "@/components/finance/GoalDialog";

const Finance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', description: 'Salary', amount: 3500, type: 'income', category: 'Salary', date: '2023-10-01' },
    { id: '2', description: 'Rent', amount: 1200, type: 'expense', category: 'Housing', date: '2023-10-03' },
    { id: '3', description: 'Groceries', amount: 150, type: 'expense', category: 'Food', date: '2023-10-05' },
    { id: '4', description: 'Freelance Work', amount: 800, type: 'income', category: 'Freelance', date: '2023-10-10' },
    { id: '5', description: 'Utilities', amount: 200, type: 'expense', category: 'Utilities', date: '2023-10-15' },
    { id: '6', description: 'Dining Out', amount: 75, type: 'expense', category: 'Food', date: '2023-10-18' },
    { id: '7', description: 'Transportation', amount: 120, type: 'expense', category: 'Transport', date: '2023-10-20' },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { name: 'Housing', budget: 1500, spent: 1200, color: 'bg-blue-500' },
    { name: 'Food', budget: 500, spent: 225, color: 'bg-green-500' },
    { name: 'Transport', budget: 300, spent: 120, color: 'bg-purple-500' },
    { name: 'Utilities', budget: 250, spent: 200, color: 'bg-yellow-500' },
    { name: 'Entertainment', budget: 200, spent: 0, color: 'bg-red-500' },
  ]);

  const [goals, setGoals] = useState<FinancialGoal[]>([
    { id: '1', name: 'Emergency Fund', targetAmount: 10000, currentAmount: 5000, deadline: '2024-06-30' },
    { id: '2', name: 'Vacation', targetAmount: 3000, currentAmount: 1200, deadline: '2024-03-15' },
  ]);

  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<FinancialGoal | null>(null);
  const [isSplitDialogOpen, setIsSplitDialogOpen] = useState(false);
  const [splitAmount, setSplitAmount] = useState<number>(0);
  const [splitWith, setSplitWith] = useState<string>('');

  // Calculate summary data
  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const totalExpense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const balance = totalIncome - totalExpense;

  // Update category spent amounts based on transactions
  const updatedCategories = [...categories];
  categories.forEach((category, index) => {
    const spent = transactions
      .filter(t => t.type === 'expense' && t.category === category.name)
      .reduce((sum, t) => sum + t.amount, 0);
    
    updatedCategories[index] = { ...category, spent };
  });

  const handleAddTransaction = () => {
    setCurrentTransaction({
      id: '',
      description: '',
      amount: 0,
      type: 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
    setIsTransactionDialogOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setIsTransactionDialogOpen(true);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setTransactions(transactions.filter(t => t.id !== transactionId));
    toast({
      title: "Transaction deleted",
      description: "The transaction has been removed from your records",
      variant: "destructive",
    });
  };

  const handleSplitTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setSplitAmount(transaction.amount / 2);
    setIsSplitDialogOpen(true);
  };

  const handleAddGoal = () => {
    setCurrentGoal({
      id: '',
      name: '',
      targetAmount: 0,
      currentAmount: 0,
      deadline: '',
    });
    setIsGoalDialogOpen(true);
  };

  const handleSaveTransaction = () => {
    if (currentTransaction) {
      if (currentTransaction.id) {
        // Edit existing transaction
        setTransactions(transactions.map(transaction => 
          transaction.id === currentTransaction.id ? currentTransaction : transaction
        ));
        toast({
          title: "Transaction updated",
          description: "Your transaction has been updated successfully",
        });
      } else {
        // Add new transaction
        const newTransactionWithId = {
          ...currentTransaction,
          id: Date.now().toString(),
        };
        setTransactions([...transactions, newTransactionWithId]);
        toast({
          title: "Transaction added",
          description: "Your transaction has been added successfully",
        });
      }
      setIsTransactionDialogOpen(false);
      setCurrentTransaction(null);
    }
  };

  const handleSplitTransactionSubmit = () => {
    if (currentTransaction && splitWith.trim() && splitAmount > 0) {
      // Create a new income transaction for the split amount
      const newIncomeTransaction = {
        id: Date.now().toString(),
        description: `Split from ${currentTransaction.description} (${splitWith})`,
        amount: splitAmount,
        type: 'income' as const,
        category: 'Other',
        date: new Date().toISOString().split('T')[0],
        splitWith: [splitWith]
      };
      
      setTransactions([...transactions, newIncomeTransaction]);
      
      toast({
        title: "Split created",
        description: `Split created with ${splitWith} for $${splitAmount}`,
      });
      
      setIsSplitDialogOpen(false);
      setSplitAmount(0);
      setSplitWith('');
    }
  };

  const handleSaveGoal = () => {
    if (currentGoal) {
      if (currentGoal.id) {
        // Edit existing goal
        setGoals(goals.map(goal => 
          goal.id === currentGoal.id ? currentGoal : goal
        ));
        toast({
          title: "Goal updated",
          description: "Your financial goal has been updated successfully",
        });
      } else {
        // Add new goal
        const newGoalWithId = {
          ...currentGoal,
          id: Date.now().toString(),
        };
        setGoals([...goals, newGoalWithId]);
        toast({
          title: "Goal added",
          description: "Your financial goal has been added successfully",
        });
      }
      setIsGoalDialogOpen(false);
      setCurrentGoal(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Finance Manager</h1>
          <p className="text-muted-foreground">Track your income, expenses, and financial goals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddGoal} className="flex items-center">
            <Target className="mr-2 h-4 w-4" /> Add Goal
          </Button>
          <Button onClick={handleAddTransaction} className="flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Add Transaction
          </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <FinancialSummary 
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
      />

      {/* Main Content */}
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        
        {/* Transactions Tab */}
        <TabsContent value="transactions" className="mt-0 space-y-4">
          <TransactionsList 
            transactions={transactions}
            onEditTransaction={handleEditTransaction}
            onDeleteTransaction={handleDeleteTransaction}
            onSplitTransaction={handleSplitTransaction}
          />
        </TabsContent>
        
        {/* Budget Tab */}
        <TabsContent value="budget" className="mt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BudgetOverview categories={updatedCategories} />
            <SpendingAnalysis 
              categories={updatedCategories}
              transactions={transactions}
              totalExpense={totalExpense}
            />
          </div>
        </TabsContent>
        
        {/* Goals Tab */}
        <TabsContent value="goals" className="mt-0 space-y-4">
          <FinancialGoals 
            goals={goals}
            onAddGoal={handleAddGoal}
            onEditGoal={(goal) => {
              setCurrentGoal(goal);
              setIsGoalDialogOpen(true);
            }}
            setGoals={setGoals}
          />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <TransactionDialog 
        isOpen={isTransactionDialogOpen}
        onOpenChange={setIsTransactionDialogOpen}
        currentTransaction={currentTransaction}
        setCurrentTransaction={setCurrentTransaction}
        onSave={handleSaveTransaction}
      />

      <SplitTransactionDialog 
        isOpen={isSplitDialogOpen}
        onOpenChange={setIsSplitDialogOpen}
        currentTransaction={currentTransaction}
        splitAmount={splitAmount}
        setSplitAmount={setSplitAmount}
        splitWith={splitWith}
        setSplitWith={setSplitWith}
        onSplit={handleSplitTransactionSubmit}
      />

      <GoalDialog 
        isOpen={isGoalDialogOpen}
        onOpenChange={setIsGoalDialogOpen}
        currentGoal={currentGoal}
        setCurrentGoal={setCurrentGoal}
        onSave={handleSaveGoal}
      />
    </div>
  );
};

export default Finance;
