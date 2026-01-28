import React, { ReactNode, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { 
  LayoutDashboard, 
  Files, 
  Search, 
  GitPullRequest, 
  Archive, 
  ShieldCheck, 
  BarChart3, 
  Link as LinkIcon, 
  Settings, 
  LogOut, 
  Globe,
  Bell,
  Menu,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Users
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '../ui/tooltip';

import emblemLogo from "../../../assets/5b9ebfc82c947c159744d1e40ff5b7769b38796b.png";
import textLogo from "../../../assets/ffce49a3778661691b976dfec1fcd3d73874a085.png";

// Simple Avatar replacement 
const UserAvatar = ({ name, collapsed }: { name: string, collapsed?: boolean }) => (
    <div className={cn(
        "rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold border border-blue-200 transition-all duration-300",
        collapsed ? "h-8 w-8 text-xs" : "h-9 w-9 text-sm"
    )}>
        {name.substring(0, 2).toUpperCase()}
    </div>
);

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick?: () => void;
    collapsed?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }: SidebarItemProps) => {
    const content = (
        <button 
            onClick={onClick}
            className={cn(
                "flex items-center transition-all duration-200 rounded-lg group",
                collapsed 
                    ? "justify-center w-10 h-10 p-0" 
                    : "w-full gap-3 px-3 py-2.5",
                active 
                    ? "bg-blue-50/80 text-blue-700 shadow-sm ring-1 ring-blue-100" 
                    : "text-slate-500 hover:bg-slate-100/60 hover:text-slate-900"
            )}
        >
            <Icon className={cn(
                "transition-colors", 
                collapsed ? "h-5 w-5" : "h-[18px] w-[18px]",
                active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
            )} />
            {!collapsed && <span className="text-sm font-medium tracking-tight">{label}</span>}
        </button>
    );

    if (collapsed) {
        return (
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    {content}
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium ml-2">
                    {label}
                </TooltipContent>
            </Tooltip>
        );
    }

    return content;
};

export const MainLayout = ({ children, currentView, onViewChange }: { children: ReactNode, currentView: string, onViewChange: (view: string) => void }) => {
    const { t, user, logout, toggleLanguage, language, direction } = useApp();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Auto-collapse on smaller screens if needed, or handle responsive
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsCollapsed(true);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sidebarWidth = isCollapsed ? "w-[72px]" : "w-[280px]";

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-[#F5F5F7] flex transition-all duration-300 ease-in-out" dir={direction}>
                {/* Sidebar */}
                <aside 
                    className={cn(
                        "bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex-shrink-0 hidden md:flex flex-col z-30 h-screen sticky top-0 transition-all duration-300 ease-spring",
                        sidebarWidth
                    )}
                >
                    <div className={cn(
                        "flex items-center h-20 transition-all duration-300 border-b border-slate-200/60",
                        isCollapsed ? "justify-center px-0" : "px-5 justify-between"
                    )}>
                        <div className={cn("flex items-center gap-4 overflow-hidden transition-all duration-300", isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100")}>
                            <img src={emblemLogo} alt="Emblem" className="h-12 w-auto object-contain drop-shadow-sm" />
                            <img src={textLogo} alt="Dubai Finance" className="h-10 w-auto object-contain" />
                        </div>

                        {/* Collapsed Logo - Centered perfectly matching sidebar items */}
                        {isCollapsed && (
                             <div 
                                className="h-10 w-10 flex items-center justify-center mx-auto cursor-pointer group" 
                                onClick={() => setIsCollapsed(false)}
                             >
                                <img src={emblemLogo} alt="Emblem" className="h-8 w-auto object-contain transition-transform group-hover:scale-110" />
                             </div>
                        )}
                        
                        {!isCollapsed && (
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => setIsCollapsed(true)}
                                className="h-6 w-6 text-slate-400 hover:text-slate-700 hover:bg-slate-100 ml-auto"
                            >
                                <PanelLeftClose className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    <ScrollArea className="flex-1 py-6">
                        <nav className={cn("space-y-1", isCollapsed ? "flex flex-col items-center w-full" : "px-3")}>
                            <SidebarItem collapsed={isCollapsed} icon={LayoutDashboard} label={t('nav.dashboard')} active={currentView === 'dashboard'} onClick={() => onViewChange('dashboard')} />
                            <SidebarItem collapsed={isCollapsed} icon={Files} label={t('nav.documents')} active={currentView === 'documents'} onClick={() => onViewChange('documents')} />
                            <SidebarItem collapsed={isCollapsed} icon={Search} label={t('nav.search')} active={currentView === 'search'} onClick={() => onViewChange('search')} />
                            
                            <div className={cn(
                                "pt-6 pb-2 text-[11px] font-bold text-slate-400/80 uppercase tracking-widest transition-opacity duration-300",
                                isCollapsed ? "opacity-0 h-0 p-0 overflow-hidden" : "px-3 opacity-100"
                            )}>
                                Workspace
                            </div>
                            {isCollapsed && <div className="h-4" />} {/* Spacer for collapsed mode */}
                            
                            <SidebarItem collapsed={isCollapsed} icon={GitPullRequest} label={t('nav.workflows')} active={currentView === 'workflows'} onClick={() => onViewChange('workflows')} />
                            <SidebarItem collapsed={isCollapsed} icon={Archive} label={t('nav.archive')} active={currentView === 'archive'} onClick={() => onViewChange('archive')} />
                            
                            <div className={cn(
                                "pt-6 pb-2 text-[11px] font-bold text-slate-400/80 uppercase tracking-widest transition-opacity duration-300",
                                isCollapsed ? "opacity-0 h-0 p-0 overflow-hidden" : "px-3 opacity-100"
                            )}>
                                Governance
                            </div>
                            {isCollapsed && <div className="h-4" />} 
                            
                            <SidebarItem collapsed={isCollapsed} icon={ShieldCheck} label={t('nav.compliance')} active={currentView === 'compliance'} onClick={() => onViewChange('compliance')} />
                            <SidebarItem collapsed={isCollapsed} icon={Users} label="User Management" active={currentView === 'users'} onClick={() => onViewChange('users')} />
                            <SidebarItem collapsed={isCollapsed} icon={BarChart3} label={t('nav.reports')} active={currentView === 'reports'} onClick={() => onViewChange('reports')} />
                            <SidebarItem collapsed={isCollapsed} icon={LinkIcon} label={t('nav.integrations')} active={currentView === 'integrations'} onClick={() => onViewChange('integrations')} />
                            <SidebarItem collapsed={isCollapsed} icon={Settings} label={t('nav.settings')} active={currentView === 'settings'} onClick={() => onViewChange('settings')} />
                        </nav>
                    </ScrollArea>

                    <div className={cn("p-4 border-t border-slate-200/60 bg-slate-50/50 backdrop-blur-sm", isCollapsed && "items-center flex flex-col p-2")}>
                         <div className={cn("flex items-center gap-3 mb-3", isCollapsed && "justify-center mb-2")}>
                            <UserAvatar name={user?.name || "User"} collapsed={isCollapsed} />
                            {!isCollapsed && (
                                <div className="overflow-hidden">
                                    <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                                    <p className="text-xs text-slate-500 truncate">{user?.department}</p>
                                </div>
                            )}
                         </div>
                         
                         {isCollapsed ? (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50" onClick={logout}>
                                        <LogOut className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">Log Out</TooltipContent>
                            </Tooltip>
                         ) : (
                            <Button variant="outline" size="sm" className="w-full text-slate-600 justify-start hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors" onClick={logout}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Log Out
                            </Button>
                         )}
                         
                         {isCollapsed && (
                             <Button 
                                variant="ghost" 
                                size="icon" 
                                className="mt-2 h-6 w-6 text-slate-400"
                                onClick={() => setIsCollapsed(false)}
                             >
                                 <PanelLeftOpen className="h-4 w-4" />
                             </Button>
                         )}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                    {/* Topbar - Glassmorphism */}
                    <header className="h-16 bg-white/70 backdrop-blur-md border-b border-slate-200/60 px-6 flex items-center justify-between sticky top-0 z-20 transition-all duration-300">
                       <div className="flex items-center md:hidden">
                           <Button variant="ghost" size="icon">
                               <Menu className="h-5 w-5" />
                           </Button>
                       </div>
                       
                       <div className="hidden md:flex text-sm font-medium text-slate-500 gap-3 items-center">
                            <span className="px-2 py-1 rounded bg-slate-100 text-xs font-semibold tracking-wide text-slate-600">{user?.role.toUpperCase()} VIEW</span>
                            <span className="text-slate-300">|</span>
                            <span className="tracking-tight">{new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'ar-AE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                       </div>

                       <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:bg-slate-100 rounded-full h-9 w-9">
                                 <Bell className="h-5 w-5" />
                                 <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
                            </Button>
                            <div className="h-4 w-px bg-slate-200 mx-1"></div>
                            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2 text-slate-600 font-medium hover:bg-slate-100 rounded-full px-3">
                                <Globe className="h-4 w-4" />
                                {language === 'en' ? 'العربية' : 'English'}
                            </Button>
                       </div>
                    </header>

                    {/* Standard page wrapper */}
                    <div className="min-h-screen bg-white pb-[64px] pt-[32px] px-[32px]">
                        {/* Page content container */}
                        <div className="max-w-7xl mx-auto space-y-16">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </TooltipProvider>
    );
};