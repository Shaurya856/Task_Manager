
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  CheckSquare,
  Briefcase,
  DollarSign,
  Calendar as CalendarIcon,
  Settings,
  User,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

type SidebarProps = {
  closeMobile: () => void;
};

const Sidebar = ({ closeMobile }: SidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const navItems = [
    { path: "/", name: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { path: "/tasks", name: "Tasks", icon: <CheckSquare className="h-5 w-5" /> },
    { path: "/projects", name: "Projects", icon: <Briefcase className="h-5 w-5" /> },
    { path: "/finance", name: "Finance", icon: <DollarSign className="h-5 w-5" /> },
    { path: "/calendar", name: "Calendar", icon: <CalendarIcon className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="h-full flex flex-col py-6 bg-sidebar">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-xl font-bold text-accent">TaskFin Manager</h1>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
            onClick={() => closeMobile()}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-3 mt-auto pt-4 border-t border-sidebar-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="sidebar-item w-full">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Application</DropdownMenuLabel>
            <DropdownMenuItem>App Settings</DropdownMenuItem>
            <DropdownMenuItem>Appearance</DropdownMenuItem>
            <DropdownMenuItem>Notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>Security</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="sidebar-item w-full mt-2">
              <Avatar className="h-5 w-5 mr-2">
                <AvatarFallback className="text-xs">
                  {user ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <span>Profile</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email || "user@example.com"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
