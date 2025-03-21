import { useState } from 'react';
import Navbar from './Navbar';
import { Menu } from 'lucide-react';

interface LayoutProps {
  categories: string[];
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export default function Layout({ categories, children, sidebar }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar categories={categories} />

      <div className="flex pt-16 min-h-screen">
        {sidebar}

        <div className={`flex-1 ml-0 md:ml-64 bg-slate-50 transition-all duration-300`}>
          <button 
            className="md:hidden fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg z-20 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
