import pg from 'pg';
import bcrypt from 'bcryptjs';
const { Client } = pg;

const connectionString = "postgresql://neondb_owner:npg_zQo7JWKAgrq3@ep-flat-lab-amf2vdvx-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require";

async function run() {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    // 1. S'assurer que la table admins existe
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Injecter le compte admin
    const email = "bena@hills.com";
    const password = "Azerty2026";
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await client.query("DELETE FROM admins");
    await client.query(
      "INSERT INTO admins (email, password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    console.log("Compte Admin injecté avec succès !");
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
