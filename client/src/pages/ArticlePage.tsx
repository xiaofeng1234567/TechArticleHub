import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { useArticlesByCategory, useArticle, useCategories } from '../hooks/useArticles';
import { Article } from '../types/article';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import ArticleContent from '../components/ArticleContent';

export default function ArticlePage() {
  const params = useParams<{ category: string; slug?: string }>();
  const category = params.category;
  const slug = params.slug;
  
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  const { data: categories } = useCategories();
  const { data: articles, isLoading: isLoadingArticles } = useArticlesByCategory(category as any);
  const { data: article, isLoading: isLoadingArticle, error } = useArticle(category as any, slug as string);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle article click in the sidebar
  const handleArticleClick = (article: Article) => {
    setLocation(`/${category}/${article.slug}`);
    setSidebarOpen(false); // Close sidebar on mobile when article is selected
  };

  // Set default article when articles load (if none selected)
  useEffect(() => {
    if (articles && articles.length > 0 && !slug) {
      setLocation(`/${category}/${articles[0].slug}`);
    }
  }, [articles, category, slug, setLocation]);

  // Update selected article when article data changes
  useEffect(() => {
    if (article) {
      setSelectedArticle(article);
    }
  }, [article]);

  return (
    <Layout 
      categories={categories || []}
      sidebar={
        <Sidebar 
          category={category}
          articles={articles || []}
          isLoading={isLoadingArticles}
          activeArticleId={selectedArticle?.id || null}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          onArticleClick={handleArticleClick}
        />
      }
    >
      <ArticleContent 
        article={selectedArticle}
        isLoading={isLoadingArticle}
        error={error as Error}
      />
    </Layout>
  );
}
