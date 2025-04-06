
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FinancialGoal } from "@/types/finance";

interface GoalDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentGoal: FinancialGoal | null;
  setCurrentGoal: React.Dispatch<React.SetStateAction<FinancialGoal | null>>;
  onSave: () => void;
}

const GoalDialog = ({
  isOpen,
  onOpenChange,
  currentGoal,
  setCurrentGoal,
  onSave,
}: GoalDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{currentGoal?.id ? 'Edit Goal' : 'Add New Goal'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="goalName">Goal Name</Label>
            <Input
              id="goalName"
              value={currentGoal?.name || ''}
              onChange={(e) => setCurrentGoal(prev => prev ? { ...prev, name: e.target.value } : null)}
              placeholder="Enter goal name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount</Label>
            <Input
              id="targetAmount"
              type="number"
              min="0"
              step="0.01"
              value={currentGoal?.targetAmount || ''}
              onChange={(e) => setCurrentGoal(prev => prev ? { ...prev, targetAmount: Number(e.target.value) } : null)}
              placeholder="Enter target amount"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentAmount">Current Amount</Label>
            <Input
              id="currentAmount"
              type="number"
              min="0"
              step="0.01"
              value={currentGoal?.currentAmount || ''}
              onChange={(e) => setCurrentGoal(prev => prev ? { ...prev, currentAmount: Number(e.target.value) } : null)}
              placeholder="Enter current amount saved"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Target Date</Label>
            <Input
              id="deadline"
              type="date"
              value={currentGoal?.deadline || ''}
              onChange={(e) => setCurrentGoal(prev => prev ? { ...prev, deadline: e.target.value } : null)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={onSave} 
            disabled={!currentGoal?.name || !currentGoal?.targetAmount || !currentGoal?.deadline}
          >
            {currentGoal?.id ? 'Update Goal' : 'Add Goal'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GoalDialog;
