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
            <div className="hidden sm:flex sm:items-center sm:ml-6 sm:space-x-8">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/${category}`}
                >
                  <span
                    className={`nav-item inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(category)
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {getCategoryDisplayName(category)}
                  </span>
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
        <div className="pt-2 pb-3 space-y-1 px-2">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/${category}`}
            >
              <span
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-center ${
                  isActive(category)
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {getCategoryDisplayName(category)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
