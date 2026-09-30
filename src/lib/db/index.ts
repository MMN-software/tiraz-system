// src/lib/db/index.ts
// کلاینت Drizzle برای اتصال به Neon از داخل Next.js

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Connection String رو از متغیر محیطی می‌خونیم
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL تعریف نشده است. فایل .env.local را بررسی کنید."
  );
}

// کلاینت HTTP Neon (مناسب برای serverless / Next.js)
const sql = neon(connectionString);

export const db = drizzle(sql, { schema });

// export همه‌چیز برای دسترسی راحت
export * from "./schema";
