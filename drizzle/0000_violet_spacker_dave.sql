CREATE TYPE "public"."category_slug" AS ENUM('medical', 'lab', 'industrial', 'parts', 'imported', 'consumables');--> statement-breakpoint
CREATE TYPE "public"."customer_type" AS ENUM('individual', 'company', 'hospital', 'clinic', 'lab');--> statement-breakpoint
CREATE TYPE "public"."inquiry_status" AS ENUM('pending', 'in_review', 'answered', 'closed');--> statement-breakpoint
CREATE TYPE "public"."inquiry_type" AS ENUM('quote', 'consultation', 'support', 'other');--> statement-breakpoint
CREATE TYPE "public"."product_badge" AS ENUM('new', 'bestseller', 'discount');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('customer', 'admin');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'pending', 'blocked');--> statement-breakpoint
CREATE TABLE "inquiries" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" "inquiry_type" NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"product_id" integer,
	"product_name" text,
	"status" "inquiry_status" DEFAULT 'pending' NOT NULL,
	"admin_reply" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"category" "category_slug" NOT NULL,
	"code" text NOT NULL,
	"brand" text NOT NULL,
	"short_desc" text NOT NULL,
	"description" text NOT NULL,
	"features" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"specs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"applications" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"image" text,
	"badge" "product_badge",
	"featured" boolean DEFAULT false NOT NULL,
	"is_custom" boolean DEFAULT false NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"token" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"name" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "user_role" DEFAULT 'customer' NOT NULL,
	"status" "user_status" DEFAULT 'active' NOT NULL,
	"customer_type" "customer_type",
	"organization_name" text,
	"national_id" text,
	"company_reg_number" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
