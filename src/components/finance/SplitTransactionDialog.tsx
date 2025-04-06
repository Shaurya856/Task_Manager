
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Transaction } from "@/types/finance";

interface SplitTransactionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentTransaction: Transaction | null;
  splitAmount: number;
  setSplitAmount: React.Dispatch<React.SetStateAction<number>>;
  splitWith: string;
  setSplitWith: React.Dispatch<React.SetStateAction<string>>;
  onSplit: () => void;
}

const SplitTransactionDialog = ({
  isOpen,
  onOpenChange,
  currentTransaction,
  splitAmount,
  setSplitAmount,
  splitWith,
  setSplitWith,
  onSplit,
}: SplitTransactionDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Split Expense</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="font-medium">{currentTransaction?.description}</div>
            <div className="text-sm text-muted-foreground mt-1">
              Total amount: ${currentTransaction?.amount.toLocaleString()}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="splitWith">Split With</Label>
            <Input
              id="splitWith"
              value={splitWith}
              onChange={(e) => setSplitWith(e.target.value)}
              placeholder="Enter person's name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="splitAmount">Amount to Receive</Label>
            <Input
              id="splitAmount"
              type="number"
              min="0"
              step="0.01"
              max={currentTransaction?.amount || 0}
              value={splitAmount}
              onChange={(e) => setSplitAmount(Number(e.target.value))}
              placeholder="Enter split amount"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={onSplit} 
            disabled={!splitWith || splitAmount <= 0 || (currentTransaction && splitAmount > currentTransaction.amount)}
          >
            Create Split
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SplitTransactionDialog;
