
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  BarChart2, 
  Package, 
  Wallet,
  ChevronLeft, 
  ChevronRight,
  ChevronsLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, label, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={to} className="w-full">
            <Button
              variant="ghost"
              size={isCollapsed ? "icon" : "default"}
              className={cn(
                "flex items-center justify-start w-full gap-3 font-medium transition-all",
                isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                isCollapsed && "justify-center"
              )}
            >
              <Icon size={20} />
              {!isCollapsed && <span>{label}</span>}
            </Button>
          </Link>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right">
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={cn(
      "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <h1 className="text-sidebar-foreground font-bold text-xl">CocoStore</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleCollapse}
          className="text-sidebar-foreground hover:bg-sidebar-accent/50"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <div className="flex flex-col gap-2 p-3 flex-1">
        <SidebarLink to="/" icon={LayoutDashboard} label="Dashboard" isCollapsed={isCollapsed} />
        <SidebarLink to="/sales" icon={ShoppingCart} label="Sales" isCollapsed={isCollapsed} />
        <SidebarLink to="/analytics" icon={BarChart2} label="Analytics" isCollapsed={isCollapsed} />
        <SidebarLink to="/inventory" icon={Package} label="Inventory" isCollapsed={isCollapsed} />
        <SidebarLink to="/finance" icon={Wallet} label="Finance" isCollapsed={isCollapsed} />
      </div>
      
      <div className="p-3 border-t border-sidebar-border mt-auto">
        <div className="flex items-center gap-3">
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">Admin</p>
              <p className="text-xs text-sidebar-foreground/70">CocoStore Owner</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
