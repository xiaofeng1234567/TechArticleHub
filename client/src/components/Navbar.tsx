import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  categories: string[];
}

export default function Navbar({ categories = [] }: NavbarProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getCategoryDisplayName = (category: string) => {
    return category.toUpperCase();
  };

  const isActive = (category: string) => {
    return location.startsWith(`/${category}`);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="font-bold text-xl text-primary cursor-pointer">TechDocs</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/${category}`}
                >
                  <a
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive(category)
                        ? 'border-primary text-slate-900'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {getCategoryDisplayName(category)}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={`sm:hidden ${mobileMenuOpen ? '' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/${category}`}
            >
              <a
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(category)
                    ? 'border-primary text-slate-700 bg-slate-50'
                    : 'border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {getCategoryDisplayName(category)}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
