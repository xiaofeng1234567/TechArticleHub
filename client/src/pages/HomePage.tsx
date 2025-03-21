import { useCategories } from '../hooks/useArticles';
import { Category } from '../types/article';
import { Link } from 'wouter';
import Layout from '../components/Layout';
import { Book, Network, Code, ArrowRight, Cpu } from 'lucide-react';

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

  const getCategoryIcon = (category: string) => {
    const categoryAsType = category as Category;
    switch (categoryAsType) {
      case 'os': return <Cpu className="h-8 w-8 text-primary" />;
      case 'network': return <Network className="h-8 w-8 text-primary" />;
      case 'c': return <Code className="h-8 w-8 text-primary" />;
      default: return <Book className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <Layout categories={categories || []}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Hero section with decorative elements */}
        <div className="relative mb-16 pt-12 pb-10 overflow-hidden">
          {/* Decorative background shapes */}
          <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-primary/5"></div>
          <div className="absolute right-10 top-20 w-16 h-16 rounded-full bg-primary/10"></div>
          <div className="absolute left-1/4 bottom-5 w-24 h-24 rounded-full bg-primary/5"></div>
          <div className="absolute right-1/3 bottom-20 w-10 h-10 rounded-full bg-primary/10"></div>
          
          <div className="relative text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              TechDocs
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-blue-600 mx-auto mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-8">
              A comprehensive collection of technical articles spanning various domains of computer science.
              Find well-structured documentation on operating systems, networking, and programming.
            </p>
            
            <div className="flex justify-center gap-3 flex-wrap">
              {categories?.map((category) => (
                <Link key={category} href={`/${category}`}>
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors duration-200">
                    {getCategoryDisplayName(category)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Category cards with icons and better styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {categories?.map((category) => (
            <Link key={category} href={`/${category}`}>
              <div className="group cursor-pointer h-full">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full border border-slate-200 group-hover:border-primary relative overflow-hidden">
                  {/* Decorative background element */}
                  <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-300"></div>
                  <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-300"></div>
                  
                  <div className="relative mb-4">
                    {getCategoryIcon(category)}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-800 mb-3 relative group-hover:text-primary transition-colors duration-200">
                    {getCategoryDisplayName(category)}
                  </h2>
                  
                  <p className="text-slate-600 mb-5 relative">
                    {getCategoryDescription(category)}
                  </p>
                  
                  <div className="flex items-center text-primary font-medium relative mt-auto">
                    Browse articles
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* About section with more visual appeal */}
        <div className="mb-16">
          <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/5"></div>
            
            <h2 className="text-2xl font-bold text-primary mb-6 relative">About TechDocs</h2>
            
            <div className="grid md:grid-cols-2 gap-8 relative">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Clear Technical Documentation</h3>
                <p className="text-slate-600 mb-4">
                  TechDocs provides clear and concise explanations of complex technical topics.
                  Our articles are written in Markdown format and cover fundamental concepts
                  that are essential for understanding computer science.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Comprehensive Learning</h3>
                <p className="text-slate-600 mb-4">
                  Whether you're a student, a professional, or someone looking to expand your knowledge,
                  TechDocs offers structured and detailed information to help you understand these topics better.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <Link href="/os">
                <span className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors duration-200">
                  Start Reading <ArrowRight className="h-4 w-4 ml-2" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}