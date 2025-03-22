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

  // Calculate estimated reading time
  const wordCount = article.content.split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200)); // Average reading speed

  return (
    <div className="article-container pt-3">
      <div className="article-header mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-3">{article.title}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(article.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            {wordCount} words
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readingTimeMinutes} min read
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {article.category}
          </div>
        </div>
        <div className="h-px bg-slate-200 w-full mb-6"></div>
      </div>
      
      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(article.content) }}
      />
      
      <div className="article-actions mt-10 border-t border-slate-200 pt-6 pb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            className="flex items-center px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
            onClick={() => {
              if (article) {
                fetch(`http://127.0.0.1:8080/api/agree/${article.id}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                .then(response => {
                  if (response.ok) {
                    alert('Thanks for liking this article!');
                  } else {
                    throw new Error('Failed to like article');
                  }
                })
                .catch(error => {
                  console.error('Error liking article:', error);
                  alert('Unable to like this article. Please try again later.');
                });
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            Like
          </button>
          <button 
            className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            onClick={() => {
              // Generate a link to this page and share it
              const articleLink = window.location.href;
              navigator.clipboard.writeText(articleLink);
              
              // Also make the API call for the share action
              if (article) {
                fetch(`http://127.0.0.1:8080/api/agree/${article.id}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                .then(response => {
                  // We don't need to alert the user about the API response for sharing
                  if (!response.ok) {
                    console.error('Failed to share article');
                  }
                })
                .catch(error => {
                  console.error('Error sharing article:', error);
                });
              }
              
              alert('Link copied to clipboard!');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
