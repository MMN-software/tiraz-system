// src/lib/db/schema.ts
// تعریف جدول‌های دیتابیس با Drizzle ORM (PostgreSQL / Neon)

import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
  serial,
} from "drizzle-orm/pg-core";

// ===== ENUM ها =====

export const userRoleEnum = pgEnum("user_role", ["customer", "admin"]);
export const userStatusEnum = pgEnum("user_status", [
  "active",
  "pending",
  "blocked",
]);
export const customerTypeEnum = pgEnum("customer_type", [
  "individual",
  "company",
  "hospital",
  "clinic",
  "lab",
]);

export const categorySlugEnum = pgEnum("category_slug", [
  "medical",
  "lab",
  "industrial",
  "parts",
  "imported",
  "consumables",
]);

export const productBadgeEnum = pgEnum("product_badge", [
  "new",
  "bestseller",
  "discount",
]);

export const inquiryTypeEnum = pgEnum("inquiry_type", [
  "quote",
  "consultation",
  "support",
  "other",
]);

export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "pending",
  "in_review",
  "answered",
  "closed",
]);

// ===== جدول کاربران =====

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: userRoleEnum("role").notNull().default("customer"),
  status: userStatusEnum("status").notNull().default("active"),
  customerType: customerTypeEnum("customer_type"),
  organizationName: text("organization_name"),
  nationalId: text("national_id"),
  companyRegNumber: text("company_reg_number"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ===== جدول محصولات =====

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: categorySlugEnum("category").notNull(),
  code: text("code").notNull(),
  brand: text("brand").notNull(),
  shortDesc: text("short_desc").notNull(),
  description: text("description").notNull(),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  specs: jsonb("specs")
    .$type<{ label: string; value: string }[]>()
    .notNull()
    .default([]),
  applications: jsonb("applications")
    .$type<string[]>()
    .notNull()
    .default([]),
  image: text("image"),
  badge: productBadgeEnum("badge"),
  featured: boolean("featured").notNull().default(false),
  isCustom: boolean("is_custom").notNull().default(false),
  isDeleted: boolean("is_deleted").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ===== جدول درخواست‌ها =====

export const inquiries = pgTable("inquiries", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  type: inquiryTypeEnum("type").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  productId: integer("product_id"),
  productName: text("product_name"),
  status: inquiryStatusEnum("status").notNull().default("pending"),
  adminReply: text("admin_reply"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ===== جدول نشست‌ها (Session) =====

export const sessions = pgTable("sessions", {
  token: text("token").primaryKey(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

// ===== نوع‌های استخراج‌شده (TypeScript) =====

export type DbUser = typeof users.$inferSelect;
export type NewDbUser = typeof users.$inferInsert;

export type DbProduct = typeof products.$inferSelect;
export type NewDbProduct = typeof products.$inferInsert;

export type DbInquiry = typeof inquiries.$inferSelect;
export type NewDbInquiry = typeof inquiries.$inferInsert;

export type DbSession = typeof sessions.$inferSelect;
export type NewDbSession = typeof sessions.$inferInsert;
