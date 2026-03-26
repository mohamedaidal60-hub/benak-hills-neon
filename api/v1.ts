import { pool, initDb } from './db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_123';

export default async function handler(req: any, res: any) {
  try {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: { message: "Neon DATABASE_URL is not configured." } });
    }
    
    await initDb(); // Fast if already created
    
    const { action, table, payload, match, orderBy } = req.body;
    
    // Auth actions
    if (action === 'session') {
       const token = req.headers.authorization?.split(' ')[1];
       if (!token) return res.json({ session: null });
       try {
         const decoded = jwt.verify(token, JWT_SECRET);
         return res.json({ session: { user: decoded }});
       } catch(e) {
         return res.json({ session: null });
       }
    }
    
    if (action === 'signInWithPassword') {
       const { email, password } = payload;
       const { rows } = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
       if (!rows.length) return res.status(401).json({ error: { message: "Invalid login credentials" } });
       
       const valid = await bcrypt.compare(password, rows[0].password);
       if (!valid) return res.status(401).json({ error: { message: "Invalid login credentials" } });
       
       const token = jwt.sign({ id: rows[0].id, email }, JWT_SECRET, { expiresIn: '7d' });
       return res.json({ session: { access_token: token, user: { email } }, user: { email } });
    }
    
    if (action === 'signUp') {
       const { email, password } = payload;
       const hashed = await bcrypt.hash(password, 10);
       try {
         await pool.query('INSERT INTO admins (email, password) VALUES ($1, $2)', [email, hashed]);
         return res.json({ user: { email } });
       } catch (err: any) {
         return res.status(400).json({ error: { message: err.message } });
       }
    }
    
    if (action === 'updateUser') {
       const token = req.headers.authorization?.split(' ')[1];
       if (!token) return res.status(401).json({ error: { message: "Unauthorized" } });
       const decoded: any = jwt.verify(token, JWT_SECRET);
       const { password } = payload;
       const hashed = await bcrypt.hash(password, 10);
       await pool.query('UPDATE admins SET password = $1 WHERE email = $2', [hashed, decoded.email]);
       return res.json({ success: true });
    }

    // Data Actions
    if (action === 'select') {
       let q = `SELECT * FROM ${table}`;
       if (orderBy) {
         q += ` ORDER BY ${orderBy.col} ${orderBy.ascending ? 'ASC' : 'DESC'}`;
       }
       const { rows } = await pool.query(q);
       return res.json({ data: rows });
    }
    
    if (action === 'insert') {
       const keys = Object.keys(payload);
       const vals = Object.values(payload).map(v => typeof v === 'object' ? JSON.stringify(v) : v);
       const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
       const q = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
       const { rows } = await pool.query(q, vals);
       return res.json({ data: rows });
    }
    
    if (action === 'update') {
       const keys = Object.keys(payload);
       const vals = Object.values(payload).map(v => typeof v === 'object' ? JSON.stringify(v) : v);
       const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
       const q = `UPDATE ${table} SET ${setClause} WHERE ${match.col} = $${keys.length + 1} RETURNING *`;
       const { rows } = await pool.query(q, [...vals, match.val]);
       return res.json({ data: rows });
    }
    
    if (action === 'delete') {
       const q = `DELETE FROM ${table} WHERE ${match.col} = $1`;
       await pool.query(q, [match.val]);
       return res.json({ data: null });
    }

    return res.status(400).json({ error: { message: "Unknown action" } });
  } catch(err: any) {
    console.error(err);
    return res.status(500).json({ error: { message: err.message } });
  }
}
