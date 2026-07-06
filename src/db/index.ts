import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const pool = mysql.createPool(
  process.env.DATABASE_URL ?? "mysql://user:password@localhost:3306/portfolio"
);

export const db = drizzle(pool, { schema, mode: "default" });
