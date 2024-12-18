import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connection = mysql2.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  port: process.env.DBPORT ? parseInt(process.env.DBPORT) : undefined,
  database: process.env.DBNAME,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000
})