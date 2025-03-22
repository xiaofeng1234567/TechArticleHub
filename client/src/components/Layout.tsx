import { useState } from 'react';
import Navbar from './Navbar';
import { Menu, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'wouter';

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
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar categories={categories} />

      <div className="flex pt-16 flex-1">
        {sidebar}

        <div className={`flex-1 ml-0 ${sidebar ? 'md:ml-64' : ''} bg-slate-50 transition-all duration-300 flex flex-col`}>
          <button 
            className="md:hidden fixed bottom-20 right-4 bg-primary text-white p-3 rounded-full shadow-lg z-20 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <main className={`${sidebar ? 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8' : 'w-full py-4'} flex-1`}>
            <div className={`${sidebar ? 'bg-white p-6 rounded-lg shadow-md' : ''}`}>
              {children}
            </div>
          </main>
          
          {/* Footer */}
          <footer className="mt-auto bg-white shadow-md border-t border-slate-200">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <span className="font-bold text-xl text-primary mr-2">TechDocs</span>
                    <span className="text-slate-500 text-sm">© {new Date().getFullYear()} All rights reserved</span>
                  </div>
                  <p className="text-slate-500 text-sm mt-1">A comprehensive technical documentation platform</p>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0">
                  <div className="flex space-x-4 sm:mr-8">
                    <Link href="/">
                      <span className="text-slate-500 hover:text-primary">Home</span>
                    </Link>
                    {categories.map((category) => (
                      <Link key={category} href={`/${category}`}>
                        <span className="text-slate-500 hover:text-primary">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a href="#" className="text-slate-500 hover:text-primary">
                      <Github size={20} />
                    </a>
                    <a href="#" className="text-slate-500 hover:text-primary">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="text-slate-500 hover:text-primary">
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
