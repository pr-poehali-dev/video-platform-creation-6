import { useState } from 'react';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'videos', label: 'Видео', icon: 'Video' },
    { id: 'categories', label: 'Категории', icon: 'Grid3x3' },
    { id: 'recommendations', label: 'Рекомендации', icon: 'TrendingUp' },
    { id: 'favorites', label: 'Избранное', icon: 'Heart' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
  ];

  const categories = [
    { id: 'gaming', label: 'Игры', icon: 'Gamepad2' },
    { id: 'music', label: 'Музыка', icon: 'Music' },
    { id: 'tech', label: 'Технологии', icon: 'Laptop' },
    { id: 'education', label: 'Образование', icon: 'GraduationCap' },
    { id: 'sport', label: 'Спорт', icon: 'Trophy' },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Play" size={20} className="text-white" />
            </div>
            <span className="font-heading font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              VideoHub
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-2">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed && "justify-center px-0"
                )}
                onClick={() => onNavigate(item.id)}
              >
                <Icon name={item.icon as any} size={20} className={!isCollapsed ? "mr-3" : ""} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>

          {!isCollapsed && (
            <>
              <Separator className="my-4" />
              <div className="px-2 mb-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Категории
                </h3>
              </div>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => onNavigate('categories')}
                  >
                    <Icon name={category.icon as any} size={18} className="mr-3" />
                    <span>{category.label}</span>
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
