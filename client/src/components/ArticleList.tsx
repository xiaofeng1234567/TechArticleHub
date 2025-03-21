import { Article } from '../types/article';

interface ArticleListProps {
  articles: Article[];
  activeArticleId: number | null;
  onArticleClick: (article: Article) => void;
  searchQuery: string;
}

export default function ArticleList({
  articles,
  activeArticleId,
  onArticleClick,
  searchQuery
}: ArticleListProps) {
  // Filter articles based on search query
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredArticles.length === 0) {
    return (
      <div className="py-4 text-center text-slate-500">
        No articles found matching "{searchQuery}"
      </div>
    );
  }

  return (
    <ul className="space-y-1">
      {filteredArticles.map((article) => (
        <li
          key={article.id}
          className={`py-2 px-3 cursor-pointer hover:bg-slate-100 rounded-md text-slate-700 ${
            article.id === activeArticleId
              ? 'active bg-primary/10 font-medium text-primary'
              : ''
          }`}
          onClick={() => onArticleClick(article)}
        >
          {article.title}
        </li>
      ))}
    </ul>
  );
}
