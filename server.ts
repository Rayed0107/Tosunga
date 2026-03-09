import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Ubuntu Help API (SQLite) is running" });
  });

  app.get("/api/associations", (req, res) => {
    const associations = db.prepare('SELECT * FROM associations').all();
    res.json(associations);
  });

  app.get("/api/projects", (req, res) => {
    const projects = db.prepare(`
      SELECT p.*, a.name as association_name 
      FROM projects p 
      JOIN associations a ON p.association_id = a.id
    `).all();
    res.json(projects);
  });

  app.post("/api/alerts", (req, res) => {
    const { type, description, lat, lng, address } = req.body;
    const info = db.prepare('INSERT INTO alerts (type, description, lat, lng, address) VALUES (?, ?, ?, ?, ?)').run(
      type, description, lat, lng, address
    );
    res.status(201).json({ id: info.lastInsertRowid });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
