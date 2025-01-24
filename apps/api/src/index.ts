import { createServer } from "./server";
import { log } from "@repo/logger";
import routes from "./routes";
import express, { Request, Response } from "express";
import { join } from "path";


const port = process.env.PORT || 3001;
const server = createServer();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'root',        
  host: process.env.POSTGRES_HOST || 'postgres',   
  database: process.env.POSTGRES_DB || 'dropbox_db',
  password: process.env.POSTGRES_PASSWORD || 'root',
  port: process.env.POSTGRES_PORT || 5432,      
});

(async () => {
  try {
    const result = await pool.query("SELECT version();");
    log(`Database Connected: ${result.rows[0].version}`);
  } catch (err) {
    log(`Error connecting to the database:${err}`);
  }
})();

module.exports = pool;
server.use("/api", routes);
server.use(express.static(join(__dirname, "../..", "client", "dist"))); 
server.listen(port, () => {
  log(`API running on http://localhost:${port}`);
});
