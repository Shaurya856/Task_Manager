
import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Check, 
  Trash2, 
  Edit, 
  AlertCircle, 
  Clock, 
  CheckCircle,
  Circle 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskItem from "@/components/tasks/TaskItem";
import TaskColumn from "@/components/tasks/TaskColumn";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "@/hooks/use-toast";

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate?: string;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete project proposal', description: 'Finish the proposal for the new client project', priority: 'high', status: 'todo', dueDate: '2023-10-15' },
    { id: '2', title: 'Review budget report', description: 'Review monthly budget and expenses', priority: 'medium', status: 'todo', dueDate: '2023-10-16' },
    { id: '3', title: 'Team meeting notes', description: 'Write up the notes from the weekly team meeting', priority: 'low', status: 'completed', dueDate: '2023-10-12' },
    { id: '4', title: 'Update website content', description: 'Update the company website with new information', priority: 'medium', status: 'in-progress', dueDate: '2023-10-18' },
  ]);
  
  const [newTask, setNewTask] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddQuickTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        priority: 'medium',
        status: 'todo',
      };
      setTasks([...tasks, task]);
      setNewTask('');
      toast({
        title: "Task added",
        description: "Your task was added successfully",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleAddQuickTask(e as unknown as React.FormEvent);
    }
  };

  const handleStatusChange = (taskId: string, newStatus: 'todo' | 'in-progress' | 'completed') => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    toast({
      title: "Task updated",
      description: `Task moved to ${newStatus.replace('-', ' ')}`,
    });
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsDialogOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully",
      variant: "destructive",
    });
  };

  const handleSaveTask = () => {
    if (currentTask) {
      if (currentTask.id) {
        // Edit existing task
        setTasks(tasks.map(task => 
          task.id === currentTask.id ? currentTask : task
        ));
        toast({
          title: "Task updated",
          description: "Your task was updated successfully",
        });
      } else {
        // Add new task
        const newTaskWithId = {
          ...currentTask,
          id: Date.now().toString(),
        };
        setTasks([...tasks, newTaskWithId]);
        toast({
          title: "Task added",
          description: "Your task was added successfully",
        });
      }
      setIsDialogOpen(false);
      setCurrentTask(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Tasks</h1>
          <p className="text-muted-foreground">Manage your tasks and track your progress</p>
        </div>
        <Button 
          onClick={() => {
            setCurrentTask({
              id: '',
              title: '',
              description: '',
              priority: 'medium',
              status: 'todo',
            });
            setIsDialogOpen(true);
          }}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Task
        </Button>
      </div>

      {/* Quick Add Task */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Quick Add</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddQuickTask} className="flex gap-2">
            <Input
              ref={inputRef}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a new task and press Enter..."
              className="flex-1"
            />
            <Button type="submit" disabled={!newTask.trim()}>
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Task Lists */}
      <Tabs defaultValue="board" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="board">Board View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="board" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TaskColumn 
              title="To Do" 
              tasks={tasks.filter(task => task.status === 'todo')}
              status="todo"
              onStatusChange={handleStatusChange}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
            
            <TaskColumn 
              title="In Progress" 
              tasks={tasks.filter(task => task.status === 'in-progress')}
              status="in-progress"
              onStatusChange={handleStatusChange}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
            
            <TaskColumn 
              title="Completed" 
              tasks={tasks.filter(task => task.status === 'completed')}
              status="completed"
              onStatusChange={handleStatusChange}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                {tasks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No tasks found. Add a new task to get started.
                  </div>
                ) : (
                  tasks.map(task => (
                    <div key={task.id} className={`task-item priority-${task.priority}`}>
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            if (task.status !== 'completed') {
                              handleStatusChange(task.id, 'completed');
                            } else {
                              handleStatusChange(task.id, 'todo');
                            }
                          }}
                          className="mr-3"
                        >
                          {task.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
                          )}
                        </button>
                        <div>
                          <div className={`${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </div>
                          {task.dueDate && (
                            <div className="text-xs flex items-center mt-1 text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        {task.priority === 'high' && (
                          <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded-full mr-2">
                            High
                          </span>
                        )}
                        {task.priority === 'medium' && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full mr-2">
                            Medium
                          </span>
                        )}
                        {task.priority === 'low' && (
                          <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full mr-2">
                            Low
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditTask(task)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteTask(task.id)}
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Task Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentTask?.id ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={currentTask?.title || ''}
                onChange={(e) => setCurrentTask(prev => prev ? { ...prev, title: e.target.value } : null)}
                placeholder="Enter task title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={currentTask?.description || ''}
                onChange={(e) => setCurrentTask(prev => prev ? { ...prev, description: e.target.value } : null)}
                placeholder="Enter task description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={currentTask?.priority}
                  onValueChange={(value: 'low' | 'medium' | 'high') => 
                    setCurrentTask(prev => prev ? { ...prev, priority: value } : null)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={currentTask?.status}
                  onValueChange={(value: 'todo' | 'in-progress' | 'completed') => 
                    setCurrentTask(prev => prev ? { ...prev, status: value } : null)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date (Optional)</Label>
              <Input
                id="dueDate"
                type="date"
                value={currentTask?.dueDate || ''}
                onChange={(e) => setCurrentTask(prev => prev ? { ...prev, dueDate: e.target.value } : null)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTask} disabled={!currentTask?.title}>
              {currentTask?.id ? 'Update Task' : 'Add Task'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tasks;
