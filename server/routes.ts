import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { contactSchema } from "@shared/schema";
import * as path from 'path';
import * as fs from 'fs';

export async function registerRoutes(app: Express): Promise<Server> {
  // Get products endpoint
  app.get("/api/admin/products", async (req: Request, res: Response) => {
    try {
      const productsFilePath = path.join(process.cwd(), '/public/admin/products.json');
      const productsData = fs.readFileSync(productsFilePath, 'utf-8');
      res.json(JSON.parse(productsData));
    } catch (error) {
      console.error('Error reading products:', error);
      res.status(500).json({ error: "Failed to load products" });
    }
  });
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body against the schema
      const contactData = contactSchema.parse(req.body);
      
      // Save the contact form submission with current timestamp
      const contact = await storage.createContact({
        ...contactData,
        createdAt: new Date().toISOString()
      });
      
      res.status(201).json({
        message: "Contact form submitted successfully",
        contact
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("Error submitting contact form:", error);
        res.status(500).json({
          message: "An error occurred while submitting the contact form"
        });
      }
    }
  });

  // Handle image upload
  app.post("/api/admin/upload-image", async (req: Request, res: Response) => {
    try {
      // Here you would handle the image upload and store it
      // For now, we'll just return a mock URL
      const imageUrl = `/client/public/${Date.now()}.jpg`;
      res.json({ imageUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  });

  // Add new product
  app.post("/api/admin/add-product", async (req: Request, res: Response) => {
    try {
      const { username, password, product } = req.body;
      
      if (username !== "Manoj Kumar" || password !== "amankumar") {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const productsFilePath = path.join(process.cwd(), '/public/admin/products.json');
      const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
      
      const newProduct = {
        id: productsData.products.length + 1,
        name: product.name,
        image: product.image,
        description: `${product.name} - Quality construction material`,
        price: product.price,
        rating: 4.0,
        category: product.category,
        inStock: product.inStock
      };
      
      productsData.products.push(newProduct);
      
      fs.writeFileSync(productsFilePath, JSON.stringify(productsData, null, 2));
      
      res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: "Failed to add product" });
    }
  });

  // Delete product endpoint
  app.post("/api/admin/delete-product", async (req: Request, res: Response) => {
    try {
      const { username, password, productId } = req.body;
      
      if (username !== "Manoj Kumar" || password !== "amankumar") {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const productsFilePath = path.join(process.cwd(), '/public/admin/products.json');
      const productsData = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
      
      productsData.products = productsData.products.filter((product: any) => product.id !== productId);
      
      fs.writeFileSync(productsFilePath, JSON.stringify(productsData, null, 2));
      
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Admin API to update products
  app.post("/api/admin/update-products", async (req: Request, res: Response) => {
    try {
      const { username, password, products } = req.body;
      
      // Validate admin credentials
      if (username !== "Manoj Kumar" || password !== "amankumar") {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      // In a real app, you would save to a database here
      // For this example, we'll save to the JSON file
      const productsFilePath = path.join(process.cwd(), '/public/admin/products.json');
      
      // Write the updated products to the file
      fs.writeFileSync(
        productsFilePath,
        JSON.stringify({ products }, null, 2)
      );
      
      res.status(200).json({ success: true, message: "Prices updated successfully" });
    } catch (error) {
      console.error('Error updating prices:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
