// src/lib/db/index.ts
// کلاینت Drizzle برای اتصال به Neon — با Lazy Initialization
// (تا موقع build روی سرور، خطا نده)

import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

type Database = NeonHttpDatabase<typeof schema>;

let _db: Database | null = null;

/**
 * دریافت کلاینت دیتابیس (Lazy)
 * اتصال فقط بار اول برقرار می‌شه.
 */
export function getDb(): Database {
  if (_db) return _db;

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL تعریف نشده است. متغیرهای محیطی را بررسی کنید."
    );
  }

  const sql = neon(connectionString);
  _db = drizzle(sql, { schema });
  return _db;
}

/**
 * Proxy برای سازگاری با کدهای موجود.
 * `db.select()` و سایر متدها همچنان کار می‌کنند.
 */
export const db: Database = new Proxy({} as Database, {
  get(_target, prop) {
    const realDb = getDb();
    const value = (realDb as unknown as Record<string | symbol, unknown>)[
      prop
    ];
    if (typeof value === "function") {
      return value.bind(realDb);
    }
    return value;
  },
});

export * from "./schema";
