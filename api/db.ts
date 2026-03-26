import { Pool } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.warn("Neon DATABASE_URL is not set.");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      budget VARCHAR(50),
      configuration VARCHAR(100),
      message TEXT,
      status VARCHAR(20) DEFAULT 'nouveau',
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS offers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      description text,
      price varchar(20) NOT NULL,
      surface varchar(20),
      rooms varchar(20),
      type varchar(20),
      features text,
      images jsonb DEFAULT '[]'::jsonb,
      active boolean DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admins (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
