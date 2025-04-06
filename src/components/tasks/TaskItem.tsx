
import { useState, useRef } from 'react';
import { Task } from '@/pages/Tasks';
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Clock, AlertCircle, MoreVertical } from "lucide-react";
import { useDrag } from 'react-dnd';
import { Card } from "@/components/ui/card";

type TaskItemProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: 'todo' | 'in-progress' | 'completed') => void;
};

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }: TaskItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Get priority color
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return 'border-red-500';
      case 'medium':
        return 'border-yellow-500';
      case 'low':
        return 'border-green-500';
      default:
        return '';
    }
  };

  return (
    <Card
      ref={drag}
      className={`p-3 my-2 cursor-move border-l-4 ${getPriorityColor()} hover:shadow-md transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="space-y-2">
        <div className="font-medium">{task.title}</div>
        
        {task.description && (
          <div className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </div>
        )}
        
        {task.dueDate && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2">
          <div>
            {task.priority === 'high' && (
              <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded-full">
                High
              </span>
            )}
            {task.priority === 'medium' && (
              <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full">
                Medium
              </span>
            )}
            {task.priority === 'low' && (
              <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">
                Low
              </span>
            )}
          </div>
          
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              className="h-7 w-7"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              className="h-7 w-7 text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;
