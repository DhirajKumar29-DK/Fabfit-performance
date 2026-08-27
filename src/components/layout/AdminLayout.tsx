"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Image as ImageIcon, 
  Menu,
  X,
  Dumbbell,
  ClipboardList,
  Star,
  Settings,
  Bell,
  Search,
  LogOut,
  TrendingUp,
  ChevronDown
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Assessments', href: '/admin/assessments', icon: ClipboardList },
    { name: 'Stats', href: '/admin/counters', icon: TrendingUp },
    { name: 'Coaches', href: '/admin/coaches', icon: Users },
    { name: 'Hero Section', href: '/admin/hero', icon: Star },
    { 
      name: 'Gallery', 
      href: '/admin/gallery', 
      icon: ImageIcon,
      subItems: [
        { name: 'Image Gallery', href: '/admin/gallery/images' },
        { name: 'Video Gallery', href: '/admin/gallery/videos' },
      ]
    },
    { name: 'Programs', href: '/admin/programs', icon: Dumbbell },
  ];

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'Gallery': pathname?.includes('/admin/gallery') || false
  });

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile sidebar backdrop */}
      {!sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col ${sidebarOpen ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <span className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
            FabFit Admin
          </span>
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-500 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 py-6 px-4 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Menu</div>
          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              
              if (item.subItems) {
                const isExpanded = expandedMenus[item.name];
                return (
                  <div key={item.name} className="space-y-1">
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                        (isActive || isExpanded)
                          ? 'bg-violet-50 text-violet-700 hover:bg-violet-100' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className={isActive ? 'text-violet-600' : 'text-slate-400'} />
                        {item.name}
                      </div>
                      <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isExpanded && (
                      <div className="pl-10 pr-3 space-y-1 mt-1">
                        {item.subItems.map(subItem => {
                          const isSubActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isSubActive
                                  ? 'bg-violet-50 text-violet-700'
                                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setExpandedMenus({})}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    isActive 
                      ? 'bg-violet-50 text-violet-700 hover:bg-violet-100' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon size={18} className={isActive ? 'text-violet-600' : 'text-slate-400'} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-slate-600 hover:bg-slate-50 transition-colors w-full">
            <LogOut size={18} className="text-slate-400" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
            >
              <Menu size={20} />
            </button>
            
            {/* Search */}
            <div className="hidden sm:flex items-center relative">
              <Search size={16} className="absolute left-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
              <Settings size={20} />
            </button>
            <div className="h-8 w-8 bg-violet-100 text-violet-700 rounded-full flex items-center justify-center font-bold text-sm border border-violet-200 ml-2">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 flex flex-col overflow-x-hidden overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {children}
        </main>
      </div>
    </div>
  );
}
