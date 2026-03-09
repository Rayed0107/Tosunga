import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, 'tosunga.db'));

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    display_name TEXT,
    email TEXT UNIQUE,
    role TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS associations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT,
    mission TEXT,
    description TEXT,
    logo_url TEXT,
    verified INTEGER DEFAULT 0,
    children_aided INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    target_amount REAL,
    collected_amount REAL DEFAULT 0,
    association_id INTEGER,
    image_url TEXT,
    status TEXT DEFAULT 'active',
    deadline DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (association_id) REFERENCES associations (id)
  );

  CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    description TEXT,
    lat REAL,
    lng REAL,
    address TEXT,
    photo_url TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed initial data if empty
const assocCount = db.prepare('SELECT count(*) as count FROM associations').get() as { count: number };
if (assocCount.count === 0) {
  const insertAssoc = db.prepare('INSERT INTO associations (name, location, mission, children_aided, verified) VALUES (?, ?, ?, ?, ?)');
  insertAssoc.run("Bana Congo", "Brazzaville, Congo", "Protection et réinsertion des enfants vulnérables du centre-ville.", 150, 1);
  insertAssoc.run("Mwinda Foundation", "Kinshasa, RDC", "Éducation numérique et accès aux livres pour les zones rurales.", 320, 1);
  insertAssoc.run("Sourire d'Abidjan", "Abidjan, Côte d'Ivoire", "Accueil d'urgence et soins médicaux pour les enfants des rues.", 210, 1);
  insertAssoc.run("Main Tendue", "Dakar, Sénégal", "Nutrition infantile et soutien aux mères isolées.", 180, 1);
  
  const insertProject = db.prepare('INSERT INTO projects (title, description, category, target_amount, collected_amount, association_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)');
  insertProject.run(
    "Centre d'Accueil Bana", 
    "Rénovation complète du dortoir principal pour accueillir 30 enfants supplémentaires.", 
    "Infrastructure", 
    12000, 
    4500, 
    1, 
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
  );
  insertProject.run(
    "Tablettes pour Tous", 
    "Achat de 50 tablettes éducatives pour l'école de la brousse à Maluku.", 
    "Éducation", 
    8000, 
    2100, 
    2, 
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800"
  );
  insertProject.run(
    "Clinique Mobile Sourire", 
    "Équipement d'un van médical pour les tournées nocturnes dans Abidjan.", 
    "Santé", 
    25000, 
    15600, 
    3, 
    "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&q=80&w=800"
  );
}

export default db;
