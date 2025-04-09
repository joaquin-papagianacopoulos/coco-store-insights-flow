
import React from 'react';
import { Bell, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-between items-center py-4 px-6 border-b border-border bg-background">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-64 pl-8"
          />
        </div>
        
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
