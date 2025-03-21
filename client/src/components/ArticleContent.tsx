import { Article } from '../types/article';
import { parseMarkdown, useSyntaxHighlighting } from '../lib/utils/markdown';

interface ArticleContentProps {
  article: Article | null;
  isLoading: boolean;
  error: Error | null;
}

export default function ArticleContent({ article, isLoading, error }: ArticleContentProps) {
  // Apply syntax highlighting when content changes
  useSyntaxHighlighting();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-4/5 mb-4"></div>
        <div className="h-6 bg-slate-200 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-medium">Error loading article</div>
        <p className="mt-2 text-slate-500">{error.message}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-slate-600">Select an article from the sidebar</h3>
        <p className="mt-2 text-slate-500">Choose a topic to start reading</p>
      </div>
    );
  }

  return (
    <div 
      className="article-content"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(article.content) }}
    />
  );
}
