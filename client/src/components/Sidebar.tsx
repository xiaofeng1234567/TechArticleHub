import { X } from 'lucide-react';
import { Article } from '../types/article';
import SearchBar from './SearchBar';
import ArticleList from './ArticleList';
import { useState } from 'react';

interface SidebarProps {
  category: string;
  articles: Article[];
  isLoading: boolean;
  activeArticleId: number | null;
  isOpen: boolean;
  onToggle: () => void;
  onArticleClick: (article: Article) => void;
}

export default function Sidebar({
  category,
  articles,
  isLoading,
  activeArticleId,
  isOpen,
  onToggle,
  onArticleClick
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Format the category name for display
  const categoryDisplayName = `${category.toUpperCase()} Articles`;

  return (
    <aside className={`sidebar bg-white w-64 shadow-lg fixed h-full z-10 overflow-y-auto transition-transform border-r border-slate-200 md:transform-none ${
      isOpen ? 'transform-none' : '-translate-x-full'
    }`}>
      <div className="py-4 px-3">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg font-semibold text-slate-700">{categoryDisplayName}</h2>
          <button 
            className="md:hidden text-slate-500 hover:text-slate-700"
            onClick={onToggle}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
        />
        
        <div className="mt-4">
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              <div className="h-6 bg-slate-200 rounded w-4/5"></div>
              <div className="h-6 bg-slate-200 rounded w-2/3"></div>
            </div>
          ) : (
            <ArticleList 
              articles={articles}
              activeArticleId={activeArticleId}
              onArticleClick={onArticleClick}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </div>
    </aside>
  );
}
