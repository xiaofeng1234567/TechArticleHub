import { Article, InsertArticle, type Category } from "@shared/schema";
import fs from "fs/promises";
import path from "path";

export interface IStorage {
  getArticlesByCategory(category: Category): Promise<Article[]>;
  getArticleBySlug(category: Category, slug: string): Promise<Article | undefined>;
  getAllArticles(): Promise<Article[]>;
}

export class MemStorage implements IStorage {
  private articles: Map<string, Article>;
  currentId: number;

  constructor() {
    this.articles = new Map();
    this.currentId = 1;
  }

  async loadArticlesFromDisk() {
    try {
      // Read categories
      const categories: Category[] = ['os', 'network', 'c'];
      
      for (const category of categories) {
        const categoryDir = path.join(process.cwd(), 'public', category);
        
        try {
          const files = await fs.readdir(categoryDir);
          
          for (const file of files) {
            if (file.endsWith('.md')) {
              const filePath = path.join(categoryDir, file);
              const content = await fs.readFile(filePath, 'utf-8');
              
              // Extract title from the first line of the markdown file
              const titleMatch = content.match(/^#\s+(.*)$/m);
              const title = titleMatch ? titleMatch[1] : path.basename(file, '.md');
              
              // Create a slug from the filename
              const slug = path.basename(file, '.md');
              
              const article: Article = {
                id: this.currentId++,
                title,
                content,
                category,
                slug,
                createdAt: new Date()
              };
              
              this.articles.set(`${category}/${slug}`, article);
            }
          }
        } catch (err) {
          console.error(`Error reading category directory ${category}:`, err);
        }
      }
    } catch (err) {
      console.error('Error loading articles from disk:', err);
    }
  }

  async getArticlesByCategory(category: Category): Promise<Article[]> {
    const categoryArticles: Article[] = [];
    
    for (const [key, article] of this.articles.entries()) {
      if (key.startsWith(`${category}/`)) {
        categoryArticles.push(article);
      }
    }
    
    return categoryArticles;
  }

  async getArticleBySlug(category: Category, slug: string): Promise<Article | undefined> {
    return this.articles.get(`${category}/${slug}`);
  }

  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }
}

export const storage = new MemStorage();
