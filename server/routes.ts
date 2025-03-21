import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { CATEGORIES } from "@shared/schema";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize the storage by loading articles from the file system
  await storage.loadArticlesFromDisk();

  // API route to get all categories
  app.get("/api/categories", (_req, res) => {
    res.json(CATEGORIES);
  });

  // API route to get articles by category
  app.get("/api/categories/:category/articles", async (req, res) => {
    const { category } = req.params;
    
    if (!CATEGORIES.includes(category as any)) {
      return res.status(400).json({ message: `Invalid category: ${category}` });
    }
    
    try {
      const articles = await storage.getArticlesByCategory(category as any);
      res.json(articles);
    } catch (error) {
      console.error(`Error fetching articles for category ${category}:`, error);
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  // API route to get a specific article by slug
  app.get("/api/categories/:category/articles/:slug", async (req, res) => {
    const { category, slug } = req.params;
    
    if (!CATEGORIES.includes(category as any)) {
      return res.status(400).json({ message: `Invalid category: ${category}` });
    }
    
    try {
      const article = await storage.getArticleBySlug(category as any, slug);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      console.error(`Error fetching article ${slug} from category ${category}:`, error);
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
