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

  const getCategoryDisplayName = (category: string) => {
    const categoryAsType = category as Category;
    switch (categoryAsType) {
      case 'os': return 'Operating Systems';
      case 'network': return 'Networking';
      case 'c': return 'C Programming';
      default: return category.toUpperCase();
    }
  };

  const getCategoryDescription = (category: string) => {
    const categoryAsType = category as Category;
    switch (categoryAsType) {
      case 'os': return 'Explore fundamentals of operating systems, process management, memory management, and more.';
      case 'network': return 'Learn about TCP/IP, protocols, IP addressing, routing, and other networking concepts.';
      case 'c': return 'Dive into C programming language basics, memory management, data structures, and advanced topics.';
      default: return 'Browse articles in this category';
    }
  };

  return (
    <Layout categories={categories || []}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
          Technical Knowledge Base
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Welcome to TechDocs - a comprehensive collection of technical articles spanning various domains of computer science.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories?.map((category) => (
          <div key={category} className="relative overflow-hidden group cursor-pointer h-full" onClick={() => window.location.href = `/${category}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 h-full border border-slate-200 group-hover:border-primary">
              <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300"></div>
              
              <h2 className="text-2xl font-bold text-slate-800 mb-3 relative">
                {getCategoryDisplayName(category)}
              </h2>
              
              <p className="text-slate-600 mb-4 relative">
                {getCategoryDescription(category)}
              </p>
              
              <div className="flex items-center text-primary font-medium relative">
                Browse articles
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 p-6 bg-slate-50 rounded-xl border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">About TechDocs</h2>
        <p className="text-slate-600 mb-4">
          TechDocs is designed to provide clear and concise explanations of complex technical topics.
          Our articles are written in Markdown format and cover fundamental concepts in operating systems,
          networking, and C programming.
        </p>
        <p className="text-slate-600">
          Whether you're a student, a professional, or someone looking to expand their knowledge in computer science,
          TechDocs offers structured and detailed information to help you understand these topics better.
        </p>
      </div>
    </Layout>
  );
}
