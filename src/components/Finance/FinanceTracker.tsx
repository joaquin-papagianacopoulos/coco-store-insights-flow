
import React, { useState } from 'react';
import { 
  Wallet, 
  Plus, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Trash, 
  Calendar 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FinanceEntry } from '@/types';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

interface FinanceTrackerProps {
  entries: FinanceEntry[];
  onAddEntry?: (entry: FinanceEntry) => void;
  onRemoveEntry?: (entryId: string) => void;
}

const FinanceTracker: React.FC<FinanceTrackerProps> = ({ 
  entries, 
  onAddEntry, 
  onRemoveEntry 
}) => {
  const [newAmount, setNewAmount] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newType, setNewType] = useState<'income' | 'expense'>('expense');
  const [dialogOpen, setDialogOpen] = useState(false);

  const calculateTotal = (type: 'income' | 'expense') => {
    return entries
      .filter(entry => entry.type === type)
      .reduce((sum, entry) => sum + entry.amount, 0);
  };

  const totalIncome = calculateTotal('income');
  const totalExpense = calculateTotal('expense');
  const balance = totalIncome - totalExpense;

  const handleAddEntry = () => {
    const amount = parseFloat(newAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (!newCategory) {
      toast.error('Please select a category');
      return;
    }
    
    const newEntry: FinanceEntry = {
      id: `finance-${Date.now()}`,
      date: new Date().toISOString(),
      amount,
      category: newCategory,
      description: newDescription,
      type: newType
    };
    
    if (onAddEntry) {
      onAddEntry(newEntry);
    }
    
    toast.success('Finance entry added successfully');
    
    // Reset form
    setNewAmount('');
    setNewCategory('');
    setNewDescription('');
    setNewType('expense');
    setDialogOpen(false);
  };

  const handleRemoveEntry = (entryId: string) => {
    if (onRemoveEntry) {
      onRemoveEntry(entryId);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            <span>Finance Tracker</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No finance entries yet.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add withdrawals or investments to track your business finances.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 rounded-md border"
                >
                  <div className="flex items-center gap-3">
                    {entry.type === 'income' ? (
                      <div className="rounded-full bg-coco-green/10 p-2">
                        <ArrowUpCircle className="h-5 w-5 text-coco-green" />
                      </div>
                    ) : (
                      <div className="rounded-full bg-destructive/10 p-2">
                        <ArrowDownCircle className="h-5 w-5 text-destructive" />
                      </div>
                    )}
                    
                    <div>
                      <div className="font-medium">{entry.category}</div>
                      <div className="text-sm text-muted-foreground">{entry.description}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div>
                      <div className={`text-right font-medium ${entry.type === 'income' ? 'text-coco-green' : 'text-destructive'}`}>
                        {entry.type === 'income' ? '+' : '-'}${entry.amount.toFixed(2)}
                      </div>
                      <div className="text-xs text-right text-muted-foreground flex items-center justify-end gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{format(new Date(entry.date), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveEntry(entry.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} />
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Finance Entry</DialogTitle>
                <DialogDescription>
                  Record money withdrawn from or invested into your business.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="amount" className="text-sm font-medium mb-1 block">
                      Amount
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      min="0.01"
                      step="0.01"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="text-sm font-medium mb-1 block">
                      Type
                    </label>
                    <Select 
                      value={newType} 
                      onValueChange={(value: any) => setNewType(value)}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="income">Income (Investment)</SelectItem>
                          <SelectItem value="expense">Expense (Withdrawal)</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="category" className="text-sm font-medium mb-1 block">
                    Category
                  </label>
                  <Select 
                    value={newCategory} 
                    onValueChange={setNewCategory}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Salary">Salary</SelectItem>
                        <SelectItem value="Rent">Rent</SelectItem>
                        <SelectItem value="Utilities">Utilities</SelectItem>
                        <SelectItem value="Supplies">Supplies</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Investment">Investment</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="description" className="text-sm font-medium mb-1 block">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Add details about this entry"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddEntry}>Add Entry</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      
      <div className="space-y-4">
        <Card className="bg-coco-brown text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-coco-green text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-destructive text-destructive-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpense.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinanceTracker;
