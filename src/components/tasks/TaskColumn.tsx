
import { useDrop } from 'react-dnd';
import { Task } from '@/pages/Tasks';
import TaskItem from './TaskItem';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from 'lucide-react';

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  status: 'todo' | 'in-progress' | 'completed';
  onStatusChange: (id: string, status: 'todo' | 'in-progress' | 'completed') => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

const TaskColumn = ({ 
  title, 
  tasks, 
  status, 
  onStatusChange,
  onEdit,
  onDelete 
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: string }) => {
      onStatusChange(item.id, status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`h-full`}>
      <Card className={`h-full ${isOver ? 'ring-2 ring-accent' : ''}`}>
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center text-lg">
            <span>{title}</span>
            <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
              {tasks.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px]">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center h-32 text-muted-foreground border border-dashed border-muted rounded-md">
                <p>Drop tasks here</p>
                <p className="text-xs mt-1">No tasks yet</p>
              </div>
            ) : (
              tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskColumn;
