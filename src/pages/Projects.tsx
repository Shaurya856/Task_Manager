
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlusCircle, 
  Briefcase, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowUpRight,
  Search,
  FilterX,
  SlidersHorizontal
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

type Project = {
  id: string;
  name: string;
  description: string;
  progress: number;
  dueDate: string;
  status: 'active' | 'completed' | 'on-hold';
  teamSize: number;
  tasksCompleted: number;
  totalTasks: number;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Marketing Campaign',
      description: 'Q4 social media and content marketing campaign',
      progress: 75,
      dueDate: '2023-12-15',
      status: 'active',
      teamSize: 4,
      tasksCompleted: 15,
      totalTasks: 20,
    },
    {
      id: '2',
      name: 'Product Launch',
      description: 'New product line launch and marketing materials',
      progress: 40,
      dueDate: '2024-01-30',
      status: 'active',
      teamSize: 6,
      tasksCompleted: 8,
      totalTasks: 20,
    },
    {
      id: '3',
      name: 'Website Redesign',
      description: 'Complete overhaul of company website and brand refresh',
      progress: 100,
      dueDate: '2023-09-10',
      status: 'completed',
      teamSize: 3,
      tasksCompleted: 12,
      totalTasks: 12,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddProject = () => {
    setCurrentProject({
      id: '',
      name: '',
      description: '',
      progress: 0,
      dueDate: '',
      status: 'active',
      teamSize: 1,
      tasksCompleted: 0,
      totalTasks: 0,
    });
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setIsDialogOpen(true);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
    toast({
      title: "Project deleted",
      description: "The project has been deleted successfully",
      variant: "destructive",
    });
  };

  const handleSaveProject = () => {
    if (currentProject) {
      if (currentProject.id) {
        // Edit existing project
        setProjects(projects.map(project => 
          project.id === currentProject.id ? currentProject : project
        ));
        toast({
          title: "Project updated",
          description: "The project has been updated successfully",
        });
      } else {
        // Add new project
        const newProjectWithId = {
          ...currentProject,
          id: Date.now().toString(),
        };
        setProjects([...projects, newProjectWithId]);
        toast({
          title: "Project created",
          description: "New project has been created successfully",
        });
      }
      setIsDialogOpen(false);
      setCurrentProject(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Projects</h1>
          <p className="text-muted-foreground">Manage your projects and track progress</p>
        </div>
        <Button onClick={handleAddProject} className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchTerm('')}
            >
              <FilterX className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <span>
                  {statusFilter === 'all'
                    ? 'All Projects'
                    : statusFilter === 'active'
                    ? 'Active Projects'
                    : statusFilter === 'completed'
                    ? 'Completed Projects'
                    : 'On Hold Projects'}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active Projects</SelectItem>
              <SelectItem value="completed">Completed Projects</SelectItem>
              <SelectItem value="on-hold">On Hold Projects</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Project Tabs */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid" className="mt-0">
          {filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center text-center p-10">
                <Briefcase className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No projects found</h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? "Try adjusting your search or filters" 
                    : "Get started by creating your first project"}
                </p>
                <Button onClick={handleAddProject}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Project
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </div>
                      <div>
                        {project.status === 'active' && (
                          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-500">
                            Active
                          </span>
                        )}
                        {project.status === 'completed' && (
                          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-500">
                            Completed
                          </span>
                        )}
                        {project.status === 'on-hold' && (
                          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-500">
                            On Hold
                          </span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>
                            {new Date(project.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{project.teamSize} members</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {project.tasksCompleted} of {project.totalTasks} tasks completed
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditProject(project)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-accent"
                    >
                      View Details <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <Card>
            <CardContent className="p-0">
              {filteredProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-10">
                  <Briefcase className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No projects found</h3>
                  <p className="text-muted-foreground mt-2 mb-4">
                    {searchTerm || statusFilter !== 'all' 
                      ? "Try adjusting your search or filters" 
                      : "Get started by creating your first project"}
                  </p>
                  <Button onClick={handleAddProject}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Project
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4">Project</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Progress</th>
                        <th className="text-left p-4">Due Date</th>
                        <th className="text-left p-4">Team</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project) => (
                        <tr key={project.id} className="border-b border-border hover:bg-muted/20">
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{project.name}</div>
                              <div className="text-sm text-muted-foreground line-clamp-1">
                                {project.description}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            {project.status === 'active' && (
                              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-500">
                                Active
                              </span>
                            )}
                            {project.status === 'completed' && (
                              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-500">
                                Completed
                              </span>
                            )}
                            {project.status === 'on-hold' && (
                              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-500">
                                On Hold
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="w-32">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{project.teamSize} members</span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditProject(project)}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive"
                                onClick={() => handleDeleteProject(project.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{currentProject?.id ? 'Edit Project' : 'Create New Project'}</DialogTitle>
            <DialogDescription>
              {currentProject?.id 
                ? 'Update the project details below.' 
                : 'Fill in the information below to create a new project.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={currentProject?.name || ''}
                onChange={(e) => setCurrentProject(prev => prev ? { ...prev, name: e.target.value } : null)}
                placeholder="Enter project name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={currentProject?.description || ''}
                onChange={(e) => setCurrentProject(prev => prev ? { ...prev, description: e.target.value } : null)}
                placeholder="Enter project description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={currentProject?.status}
                  onValueChange={(value: 'active' | 'completed' | 'on-hold') => 
                    setCurrentProject(prev => prev ? { ...prev, status: value } : null)
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={currentProject?.dueDate || ''}
                  onChange={(e) => setCurrentProject(prev => prev ? { ...prev, dueDate: e.target.value } : null)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Input
                  id="teamSize"
                  type="number"
                  min="1"
                  value={currentProject?.teamSize || 1}
                  onChange={(e) => setCurrentProject(prev => prev ? { ...prev, teamSize: Number(e.target.value) } : null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="progress">Progress (%)</Label>
                <Input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  value={currentProject?.progress || 0}
                  onChange={(e) => setCurrentProject(prev => prev ? { ...prev, progress: Number(e.target.value) } : null)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tasksCompleted">Tasks Completed</Label>
                <Input
                  id="tasksCompleted"
                  type="number"
                  min="0"
                  value={currentProject?.tasksCompleted || 0}
                  onChange={(e) => setCurrentProject(prev => prev ? { ...prev, tasksCompleted: Number(e.target.value) } : null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalTasks">Total Tasks</Label>
                <Input
                  id="totalTasks"
                  type="number"
                  min="0"
                  value={currentProject?.totalTasks || 0}
                  onChange={(e) => setCurrentProject(prev => prev ? { ...prev, totalTasks: Number(e.target.value) } : null)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveProject} 
              disabled={!currentProject?.name || !currentProject?.dueDate}
            >
              {currentProject?.id ? 'Update Project' : 'Create Project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
