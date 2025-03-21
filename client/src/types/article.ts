export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  slug: string;
  createdAt: string | Date;
}

export type Category = 'os' | 'network' | 'c';
