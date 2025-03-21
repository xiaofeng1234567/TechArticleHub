import { useCategories } from '../hooks/useArticles';
import { Category } from '../types/article';
import { Link } from 'wouter';
import Layout from '../components/Layout';

export default function HomePage() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <Layout categories={[]}>
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/2 mb-8"></div>
          <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-8"></div>
          <div className="h-32 bg-slate-200 rounded mb-4"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout categories={[]}>
        <div className="text-center py-10">
          <div className="text-red-500 text-lg font-medium">Error loading categories</div>
          <p className="mt-2 text-slate-500">Please try again later</p>
        </div>
      </Layout>
    );
  }

  const getCategoryDisplayName = (category: Category) => {
    switch (category) {
      case 'os': return 'Operating Systems';
      case 'network': return 'Networking';
      case 'c': return 'C Programming';
      default: return category.toUpperCase();
    }
  };

  const getCategoryDescription = (category: Category) => {
    switch (category) {
      case 'os': return 'Explore fundamentals of operating systems, process management, memory management, and more.';
      case 'network': return 'Learn about TCP/IP, protocols, IP addressing, routing, and other networking concepts.';
      case 'c': return 'Dive into C programming language basics, memory management, data structures, and advanced topics.';
      default: return 'Browse articles in this category';
    }
  };

  return (
    <Layout categories={categories || []}>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Technical Knowledge Base</h1>
      <p className="text-slate-600 mb-8">
        Welcome to TechDocs - a comprehensive collection of technical articles spanning various domains of computer science.
        Select a category below to explore the articles.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <Link key={category} href={`/${category}`}>
            <a className="block group">
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 h-full">
                <h2 className="text-xl font-semibold text-primary group-hover:text-blue-700 mb-2">
                  {getCategoryDisplayName(category as Category)}
                </h2>
                <p className="text-slate-600">
                  {getCategoryDescription(category as Category)}
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
