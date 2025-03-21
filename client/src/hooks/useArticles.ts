import { useQuery } from '@tanstack/react-query';
import { Article, Category } from '../types/article';

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['/api/categories']
  });
}

export function useArticlesByCategory(category: Category) {
  return useQuery<Article[]>({
    queryKey: [`/api/categories/${category}/articles`],
    enabled: !!category,
  });
}

export function useArticle(category: Category, slug: string) {
  return useQuery<Article>({
    queryKey: [`/api/categories/${category}/articles/${slug}`],
    enabled: !!category && !!slug
  });
}
