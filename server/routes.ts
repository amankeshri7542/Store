import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { contactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);

  return httpServer;
}
